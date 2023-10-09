import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ESmsEvents } from 'src/@types/enums';
import { otpSmsEvent } from 'src/utils/events/sms.events';
import { TermiiMessaging } from 'src/utils/helpers/sms.helpers';

@Injectable()
export class SmsService {
  constructor(private readonly termiiMessaging: TermiiMessaging) {}
  @OnEvent(ESmsEvents.OTP_SMS)
  async sendOtpSms(payload: otpSmsEvent) {
    await this.termiiMessaging.sendSingleSms(payload);
  }
}
