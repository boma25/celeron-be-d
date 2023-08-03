export class welcomeEmailEvent {
  email: string;
  firstName: string;
  constructor(email: string, firstName: string) {
    this.email = email;
    this.firstName = firstName;
  }
}

export class otpEmailEvent {
  email: string;
  otp: number;
  constructor(email: string, otp: number) {
    this.email = email;
    this.otp = otp;
  }
}
