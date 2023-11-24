import { TMailOptions } from 'src/@types/app.types';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

const configService = new ConfigService();
const logger = new Logger('MailService');

const transporter = nodemailer.createTransport({
  host: configService.get('SEND_IN_BLUE_HOST'),
  port: parseInt(configService.get('SEND_IN_BLUE_PORT')),
  secure: true,
  auth: {
    user: configService.get('SEND_IN_BLUE_USER'),
    pass: configService.get('SEND_IN_BLUE_PASSWORD'),
  },
});

const sendMail = async ({ from, ...options }: TMailOptions) => {
  try {
    const info = await transporter.sendMail({
      from: from || '"Celeron" <info@celeron.com>',
      ...options,
    });
    logger.log('mail sent', info);
  } catch (error) {
    logger.error(error);
  }
};
export { sendMail };
