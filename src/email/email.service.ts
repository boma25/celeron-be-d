import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EEmailEvents } from 'src/@types/enums';
import { generateInviteEmail } from 'src/utils/emailTemplates/generateInviteHtml';
import { generateOtpHtml } from 'src/utils/emailTemplates/generateOtpHtml';
import { generateWelcomeHtml } from 'src/utils/emailTemplates/generateWelcomeHtml';
import {
  newAdminAddedEmailEvent,
  otpEmailEvent,
  welcomeEmailEvent,
} from 'src/utils/events/email.events';
import { sendMail } from 'src/utils/helpers/mail.helpers';

@Injectable()
export class EmailService {
  @OnEvent(EEmailEvents.WELCOME_EMAIL)
  async sendWelcomeMail(payload: welcomeEmailEvent) {
    await sendMail({
      to: [payload.email],
      subject: 'Welcome to En1',
      html: generateWelcomeHtml(payload.email),
    });
  }

  @OnEvent(EEmailEvents.OTP_EMAIL)
  async sendOtpMail(payload: otpEmailEvent) {
    await sendMail({
      to: [payload.email],
      subject: 'Hear Is Your Otp',
      html: generateOtpHtml(
        `${payload.otp}`,
        payload.name,
        payload.email,
        'www.google.com',
      ),
    });
  }

  @OnEvent(EEmailEvents.RESET_PASSWORD)
  async sendResetPasswordMail(payload: otpEmailEvent) {
    await sendMail({
      to: [payload.email],
      subject: 'Reset Password',
      html: generateOtpHtml(
        `${payload.otp}`,
        payload.name,
        payload.email,
        'www.google.com',
      ),
    });
  }

  @OnEvent(EEmailEvents.ADMIN_ADDED)
  async sendAddAdminMail(payload: newAdminAddedEmailEvent) {
    await sendMail({
      to: [payload.email],
      subject: 'Celeron Admin Invitation',
      html: generateInviteEmail(
        payload.firstName,
        payload.email,
        payload.adminName,
        'www.google.com',
      ),
    });
  }
}
