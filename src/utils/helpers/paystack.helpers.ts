import { BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { TPaystackApiResponse } from 'src/@types/paystack.types';

export class PayStackService {
  private readonly axiosInstance: AxiosInstance;
  private readonly logger = new Logger(PayStackService.name);
  private readonly configService = new ConfigService();

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.configService.get<string>('PAYSTACK_API_URL'),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.configService.get<string>(
          'PAYSTACK_SECRET_KEY',
        )}`,
      },
    });
  }

  async verifyTransaction(reference: string): Promise<any> {
    try {
      const { data } = await this.axiosInstance.get<TPaystackApiResponse>(
        `/verify/${reference}`,
      );
      return data;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(
        error?.response?.data?.message || error?.message,
      );
    }
  }
}
