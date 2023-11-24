import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { createHmac } from 'crypto';
import { Request } from 'express';

@Injectable()
export class PaystackWebhookGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const hash = createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
      .update(JSON.stringify(request.body))
      .digest('hex');
    return hash === this.extractSignatureFromHeader(request);
  }

  private extractSignatureFromHeader(request: Request): string | undefined {
    const signature = request.headers['x-paystack-signature'] as string;
    return signature || undefined;
  }
}
