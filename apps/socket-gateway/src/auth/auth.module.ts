import { Module } from '@nestjs/common';

import { AuthIntrospectionService } from './auth-introspection.service';
import { WsAuthGuard } from './ws-auth.guard';

@Module({
  providers: [WsAuthGuard, AuthIntrospectionService],
  exports: [WsAuthGuard, AuthIntrospectionService],
})
export class AuthModule {}
