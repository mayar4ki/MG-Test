import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import type { Socket } from 'socket.io';

import { AuthIntrospectionService } from './auth-introspection.service';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private readonly authIntrospection: AuthIntrospectionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket & { data: Record<string, any> } = context.switchToWs().getClient();
    const token = extractToken(client);

    if (!token) {
      throw new WsException('Unauthorized');
    }

    try {
      const payload = await this.authIntrospection.introspect(token);
      client.data.user = payload;
      return true;
    } catch {
      throw new WsException('Unauthorized');
    }
  }
}

const extractToken = (client: Socket): string | null => {
  const headerToken = typeof client.handshake.headers?.authorization === 'string' ? client.handshake.headers.authorization : null;
  const authToken = typeof client.handshake.auth?.token === 'string' ? client.handshake.auth.token : null;

  if (authToken) return authToken;
  if (headerToken?.toLowerCase().startsWith('bearer ')) return headerToken.slice('bearer '.length).trim();

  return null;
};
