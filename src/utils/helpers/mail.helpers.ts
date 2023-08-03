import * as formData from 'form-data';
import Mailgun from 'mailgun.js';
import { TMailOptions } from 'src/@types/app.types';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAIL_GUN_API_KEY,
});

const sendMail = async ({ from, to, subject, html }: TMailOptions) => {
  try {
    await mg.messages.create(process.env.MAIL_GUN_DOMAIN, {
      from: from || 'Celeron <hello@celeron.com>',
      to,
      subject,
      html,
    });
  } catch (error) {
    console.log(error);
  }
};
export { sendMail };
