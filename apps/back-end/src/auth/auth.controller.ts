import { Body, Controller, Get, Headers, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import type { Request } from 'express';

import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { AuthenticatedUser } from './auth.types';

type RequestWithUser = Request & { user: AuthenticatedUser };

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  profile(@Req() req: RequestWithUser) {
    return { user: req.user };
  }

  @Post('introspect')
  introspect(@Headers('authorization') authHeader?: string, @Body('token') tokenFromBody?: string) {
    const token = extractBearerToken(authHeader) ?? tokenFromBody;
    if (!token) {
      throw new UnauthorizedException('Missing bearer token');
    }

    const payload = this.authService.verifyToken(token);
    return { active: true, payload };
  }
}

const extractBearerToken = (authHeader?: string) => {
  if (!authHeader?.toLowerCase().startsWith('bearer ')) return null;
  return authHeader.slice('bearer '.length).trim();
};
