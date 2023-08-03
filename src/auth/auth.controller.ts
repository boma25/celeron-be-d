import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorators';
import { TApiResponse, TLoginResponse } from 'src/@types/app.types';
import { LoginDto } from './Dto/login.dto';
import { SignUpDto } from './Dto/signup.dto';
import { SendOtpDto } from './Dto/sendOtp.dto';
import { ResetPasswordDto } from './Dto/resetPassword.dto';
import { VerifyOtpDto } from './Dto/verifyOtp.dto';
import { GoogleAuthDto } from './Dto/googleAuth.dto';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: LoginDto): Promise<TApiResponse<TLoginResponse>> {
    const data = await this.authService.login(body);
    return { data, message: 'login successful' };
  }

  @Post('/google/auth')
  async googleAuth(
    @Body() body: GoogleAuthDto,
  ): Promise<TApiResponse<TLoginResponse>> {
    const data = await this.authService.googleAuth(body);
    return { data, message: 'login successful' };
  }

  @Post('/signup')
  async signup(@Body() body: SignUpDto): Promise<TApiResponse> {
    await this.authService.signUp(body);
    return {
      message: 'signup successful, kindly verify the otp sent to your email',
    };
  }

  @Post('/resend-otp')
  async resendOtp(@Body() body: SendOtpDto): Promise<TApiResponse> {
    await this.authService.sendOtp(body.email);
    return {
      message: 'an otp sent to your email',
    };
  }

  @Post('/request-password-reset')
  async requestPasswordReset(@Body() body: SendOtpDto): Promise<TApiResponse> {
    await this.authService.requestPasswordReset(body.email);
    return {
      message:
        'an otp would be sent to your email, if an account with this email exists',
    };
  }

  @Post('/reset-password')
  async resetPassword(@Body() body: ResetPasswordDto): Promise<TApiResponse> {
    await this.authService.resetPassword(body);
    return {
      message: 'your password reset was successful kindly login',
    };
  }

  @Post('/verify-otp')
  async verifyOtp(@Body() body: VerifyOtpDto): Promise<TApiResponse> {
    await this.authService.verifyOtp(body);
    return {
      message: 'otp verified successfully',
    };
  }

  @Post('/verify-account')
  async verifyEmailAndPhoneNumber(
    @Body() body: VerifyOtpDto,
  ): Promise<TApiResponse> {
    await this.authService.verifyAccount(body);
    return {
      message: 'verification successful',
    };
  }
}
