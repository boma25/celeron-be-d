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
  name: string;
  constructor(email: string, otp: number, name: string) {
    this.email = email;
    this.otp = otp;
    this.name = name;
  }
}

export class newAdminAddedEmailEvent {
  email: string;
  firstName: string;
  password: string;
  adminName: string;
  constructor(
    email: string,
    firstName: string,
    password: string,
    adminName: string,
  ) {
    this.email = email;
    this.firstName = firstName;
    this.password = password;
    this.adminName = adminName;
  }
}
