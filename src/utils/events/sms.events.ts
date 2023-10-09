export class otpSmsEvent {
  to: string;
  sms: string;
  constructor(sms: string, to: string) {
    this.sms = sms;
    this.to = to;
  }
}
