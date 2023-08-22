import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EEmailEvents } from 'src/@types/enums';
import {
  newAdminAddedEmailEvent,
  otpEmailEvent,
  welcomeEmailEvent,
} from 'src/utils/events';
import { sendMail } from 'src/utils/helpers/mail.helpers';

@Injectable()
export class EmailService {
  @OnEvent(EEmailEvents.WELCOME_EMAIL)
  async sendWelcomeMail(payload: welcomeEmailEvent) {
    await sendMail({
      to: [payload.email],
      subject: 'Account Creation',
      html: `<h1>Dear ${payload.firstName} Welcome to Celeron</h1>`,
    });
  }

  @OnEvent(EEmailEvents.OTP_EMAIL)
  async sendOtpMail(payload: otpEmailEvent) {
    await sendMail({
      to: [payload.email],
      subject: 'Hear Is Your Otp',
      html: `<h1>Otp: ${payload.otp}</h1>`,
    });
  }

  @OnEvent(EEmailEvents.RESET_PASSWORD)
  async sendResetPasswordMail(payload: otpEmailEvent) {
    await sendMail({
      to: [payload.email],
      subject: 'Reset Password',
      html: `<h1>Otp: ${payload.otp}</h1>`,
    });
  }

  @OnEvent(EEmailEvents.ADMIN_ADDED)
  async sendAddAdminMail(payload: newAdminAddedEmailEvent) {
    await sendMail({
      to: [payload.email],
      subject: 'Celeron Admin Invitation',
      html: `<main> <h1>Dear ${payload.firstName},</h1> 

      you have been invited to celeron as an admin, kindly find your details below
      <p>email: ${payload.email}</p>
      <p>password: ${payload.password}</p>

      kindly login to you account and change your password
      </main>`,
    });
  }
}
