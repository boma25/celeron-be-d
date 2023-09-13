import { SendOtpDto } from './sendOtp.dto';
import { IsOtp } from 'src/utils/helpers/decorators.helpers';

export class VerifyOtpDto extends SendOtpDto {
  @IsOtp()
  otp: string;
}
