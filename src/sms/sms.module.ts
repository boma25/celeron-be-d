import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SmsController } from './sms.controller';
import { TermiiMessaging } from 'src/utils/helpers/sms.helpers';

@Module({
  controllers: [SmsController],
  providers: [SmsService, TermiiMessaging],
})
export class SmsModule {}
