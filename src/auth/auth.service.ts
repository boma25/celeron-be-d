import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { TLoginResponse } from 'src/@types/app.types';
import { LoginDto } from './Dto/login.dto';
import { UserService } from 'src/user/user.service';
import { authHelpers } from 'src/utils/helpers/auth.helpers';
import { SignUpDto } from './Dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EEmailEvents } from 'src/@types/enums';
import {
  otpEmailEvent,
  welcomeEmailEvent,
} from 'src/utils/events/email.events';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ResetPasswordDto } from './Dto/resetPassword.dto';
import { VerifyOtpDto } from './Dto/verifyOtp.dto';
import { GoogleAuthDto } from './Dto/googleAuth.dto';
import { Auth, google } from 'googleapis';
import { ConfigService } from '@nestjs/config';
import { AdminService } from 'src/admin/admin.service';
import { VerifyAccountDto } from './Dto/verifyAccount.dto';
import { Prisma } from '@prisma/client';
import { CartService } from 'src/cart/cart.service';
import { SetPhoneNumberDto } from './Dto/setPhoneNumber.dto';

@Injectable()
export class AuthService {
  private oauthClient: Auth.OAuth2Client;
  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private cartService: CartService,
    private jwtService: JwtService,
    private eventEmitter: EventEmitter2,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
  ) {
    const clientId = this.configService.get('GOOGLE_CLIENT_ID');
    const clientSecret = this.configService.get('GOOGLE_CLIENT_SECRET');
    this.oauthClient = new google.auth.OAuth2(clientId, clientSecret);
  }

  async login({ email, password }: LoginDto): Promise<TLoginResponse> {
    const user = await this.userService.findUser({ email });
    if (!user || !(await authHelpers.verifyPassword(password, user.password))) {
      throw new BadRequestException('invalid credentials');
    }
    if (!user.emailVerified)
      throw new ForbiddenException('kindly verify your email address');

    if (!user.phoneNumberVerified)
      throw new ForbiddenException('kindly verify your phoneNumber');

    const payload = {
      email: user.email,
      id: user.id,
      role: user.role,
    };

    return {
      authToken: await this.jwtService.signAsync(payload),
      user: authHelpers.serializeUser(user),
    };
  }

  async adminLogin({ email, password }: LoginDto): Promise<TLoginResponse> {
    const admin = await this.adminService.findAdmin({ email });
    if (
      !admin ||
      !(await authHelpers.verifyPassword(password, admin.password))
    ) {
      throw new BadRequestException('invalid credentials');
    }

    const payload = {
      email: admin.email,
      id: admin.id,
      role: admin.role,
      adminType: admin.adminType,
    };

    return {
      authToken: await this.jwtService.signAsync(payload),
      user: authHelpers.serializeUser(admin),
    };
  }

  async signUp(data: SignUpDto): Promise<void> {
    const password = await authHelpers.hashPassword(data.password);
    const user = await this.userService.createUser({ ...data, password });

    const { email, firstName } = user;
    this.eventEmitter.emit(
      EEmailEvents.WELCOME_EMAIL,
      new welcomeEmailEvent(email, firstName),
    );

    await this.sendOtp(email);
  }

  async sendOtp(
    email: string,
    eventType = EEmailEvents.OTP_EMAIL,
  ): Promise<void> {
    const user = await this.userService.findUser({ email });

    if (!user) throw new BadRequestException('invalid email address');

    const otp = authHelpers.generateOtp();
    await this.cacheManager.set(`${email}-otp`, otp, 60 * 1000 * 5);
    this.eventEmitter.emit(
      eventType,
      new otpEmailEvent(email, otp, user.firstName),
    );
  }

  async requestPasswordReset(email: string): Promise<void> {
    const user = await this.userService.findUser({ email });

    if (user) await this.sendOtp(user.email, EEmailEvents.RESET_PASSWORD);
  }

  async resetPassword({ email, password }: ResetPasswordDto): Promise<void> {
    const user = await this.userService.findUser({ email });
    if (!user) throw new BadRequestException('invalid email address');

    const otpVerified = await this.cacheManager.get(`${email}-otp`);
    if (otpVerified !== true) throw new BadRequestException('otp not verified');

    if (await authHelpers.verifyPassword(password, user.password)) {
      throw new BadRequestException(
        'your new password cannot be one of your old passwords ',
      );
    }
    await this.userService.updateUser({
      where: { email },
      data: { password: await authHelpers.hashPassword(password) },
    });
    await this.cacheManager.del(`${email}-otp`);
  }

  async verifyOtp({ email, otp }: VerifyOtpDto): Promise<void> {
    const user = await this.userService.findUser({ email });
    if (!user) throw new BadRequestException('invalid email address');

    const storedOtp = await this.cacheManager.get(`${email}-otp`);
    if (!storedOtp || storedOtp !== parseInt(otp))
      throw new BadRequestException('invalid otp');

    await this.cacheManager.set(`${email}-otp`, true, 60 * 1000 * 5);
  }

  async verifyAccount({
    email,
    phoneNumber,
    otp,
  }: VerifyAccountDto): Promise<void> {
    const user = await this.userService.findUser({ email });
    if (!user) throw new BadRequestException('invalid email address');

    await this.verifyOtp({ email, otp });
    const otpVerified = await this.cacheManager.get(`${email}-otp`);
    if (otpVerified !== true) throw new BadRequestException('otp not verified');

    const data: Prisma.UserUpdateInput = { emailVerified: true };

    data['phoneNumberVerified'] = phoneNumber === user.phoneNumber;

    await this.userService.updateUser({
      where: { email },
      data,
    });
    await this.cacheManager.del(`${email}-otp`);
  }

  async googleAuth({
    token,
  }: GoogleAuthDto): Promise<TLoginResponse & { email?: string }> {
    const googleUser = await this.oauthClient.verifyIdToken({
      idToken: token,
    });
    const info = googleUser.getPayload();
    let user = await this.userService.findUser({ email: info.email });

    if (!user) {
      user = await this.userService.createUser({
        email: info.email,
        lastName: info.family_name,
        firstName: info.given_name,
        password: 'password',
        emailVerified: true,
      });
      return { email: user.email } as TLoginResponse & { email?: string };
    }
    const payload = {
      email: user.email,
      id: user.id,
      role: user.role,
    };

    return {
      authToken: await this.jwtService.signAsync(payload),
      user: authHelpers.serializeUser(user),
    };
  }

  async setPhoneNumber({
    phoneNumber,
    countryCode,
    email,
  }: SetPhoneNumberDto): Promise<void> {
    const userExist = await this.userService.findUser({
      AND: [{ phoneNumber }, { email: { not: { equals: email } } }],
    });

    if (userExist) throw new BadRequestException('phone number already exist');

    const user = await this.userService.findUser({
      AND: [
        { email: { equals: email } },
        { emailVerified: true },
        { phoneNumberVerified: false },
      ],
    });
    if (!user) throw new BadRequestException('invalid email address');

    await this.sendOtp(user.email);

    await this.userService.updateUser({
      where: { id: user.id },
      data: { phoneNumber, countryCode },
    });
  }
}
