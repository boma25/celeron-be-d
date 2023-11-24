export enum EAdminType {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}
export enum ERole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum EEmailEvents {
  WELCOME_EMAIL = 'WELCOME_EMAIL',
  OTP_EMAIL = 'OTP_EMAIL',
  RESET_PASSWORD = 'RESET_PASSWORD',
  ADMIN_ADDED = 'ADMIN_ADDED',
}

export enum ESmsEvents {
  OTP_SMS = 'OTP_SMS',
}

export enum ETermiiChannel {
  GENERIC = 'generic',
  DND = 'dnd',
  WHATSAPP = 'whatsapp',
}

export enum EPaystackEvents {
  CHARGE_SUCCESS = 'charge.success',
}
