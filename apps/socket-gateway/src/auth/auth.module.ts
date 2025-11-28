import { Module } from '@nestjs/common';

import { AuthIntrospectionService } from './auth-introspection.service';
import { WsAuthGuard } from './ws-auth.guard';

@Module({
  providers: [AuthIntrospectionService, WsAuthGuard],
  exports: [WsAuthGuard],
})
export class AuthModule {}
