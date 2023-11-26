import { EPaystackChannel, EPaystackEvents } from './enums';

export type TPaystackLogHistory = {
  type: string;
  message: string;
  time: number;
};

export type TPayStackLog = {
  time_spent: number;
  attempts: number;
  authentication: string;
  errors: number;
  success: boolean;
  mobile: boolean;
  input: object[];
  channel: null | string;
  history: TPaystackLogHistory[];
};

export type TPaystackAuthorization = {
  authorization_code: string;
  bin: string;
  last4: string;
  exp_month: string;
  exp_year: string;
  card_type: string;
  bank: string;
  country_code: string;
  brand: string;
  account_name: string | null;
};

type TPayStackCustomer = {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
  customer_code: string;
  phone: string | null;
  metadata: object;
  risk_action: string;
};

export type TPaystackTransaction = {
  id: number;
  domain: string;
  status: string;
  reference: string;
  amount: number;
  message: string | null;
  gateway_response: string;
  paid_at: string;
  created_at: string;
  channel: EPaystackChannel;
  currency: string;
  ip_address: string;
  metadata: object;
  log: TPayStackLog;
  fees: number;
  authorization: TPaystackAuthorization;
  customer: TPayStackCustomer;
  plan: object;
};

export type TPaystackApiResponse = {
  status: boolean;
  message: string;
  data: TPaystackTransaction;
};

export type TPaystackWebhookBody = {
  event: EPaystackEvents;
  data: TPaystackTransaction;
};
