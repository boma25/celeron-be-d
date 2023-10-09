import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ESmsEvents } from './@types/enums';
import { otpSmsEvent } from './utils/events/sms.events';

@Injectable()
export class AppService {
  constructor(private eventEmitter: EventEmitter2) {}
  getHello(): string {
    this.eventEmitter.emit(
      ESmsEvents.OTP_SMS,
      new otpSmsEvent('123456', '+2348127871871'),
    );
    return 'Hello World!';
  }
}
