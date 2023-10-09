import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import {
  IBulkTermiiArg,
  TBulkTermiiPayload,
  TSingleTermiiArg,
  TSingleTermiiPayload,
} from 'src/@types/app.types';
import { ETermiiChannel } from 'src/@types/enums';

export class TermiiMessaging {
  private readonly api_key: string;
  private readonly from: string;
  private readonly axiosInstance: AxiosInstance;
  private readonly logger = new Logger(TermiiMessaging.name);
  private readonly configService = new ConfigService();

  constructor() {
    this.api_key = this.configService.get<string>('TERMII_API_KEY');
    this.from = 'Celeron';
    this.axiosInstance = axios.create({
      baseURL: this.configService.get<string>('TERMII_API_URL'),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async sendSingleSms({
    channel = ETermiiChannel.GENERIC,
    ...payloadArgs
  }: TSingleTermiiArg): Promise<void> {
    const payload: TSingleTermiiPayload = {
      ...payloadArgs,
      channel,
      api_key: this.api_key,
      from: this.from,
    };
    try {
      await this.axiosInstance.post('', payload);
    } catch (error) {
      this.logger.error(error?.response?.data?.message, payload);
    }
  }

  async sendBulkSms({
    channel = ETermiiChannel.DND,
    ...payloadArgs
  }: IBulkTermiiArg): Promise<void> {
    try {
      const payload: TBulkTermiiPayload = {
        ...payloadArgs,
        channel,
        api_key: this.api_key,
        from: this.from,
      };
      await this.axiosInstance.post('/bulk', payload);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
