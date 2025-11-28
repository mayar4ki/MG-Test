import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

import type { Env } from '../config/env-validation.schema';

type IntrospectionResponse = {
  active: boolean;
  payload?: Record<string, any>;
};

type CacheEntry = {
  payload: Record<string, any>;
  expiresAt: number;
};

@Injectable()
export class AuthIntrospectionService {
  constructor(private readonly configService: ConfigService<Env>) {}


  private readonly logger = new Logger(AuthIntrospectionService.name);
  
  
  private cache = new Map<string, CacheEntry>();


  async introspect(token: string): Promise<Record<string, any>> {
    const cached = this.cache.get(token);
    const now = Date.now();
    if (cached && cached.expiresAt > now) {
      return cached.payload;
    }

    try {

      const url = this.configService.get('AUTH_INTROSPECT_URL', { infer: true })??'';
      const response = await axios.post<IntrospectionResponse>(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 5000,
        },
      );

      if (!response.data?.active || !response.data.payload) {
        throw new UnauthorizedException('Inactive token');
      }
      
      const ttlMs = this.configService .get('AUTH_INTROSPECT_CACHE_TTL_MS', { infer: true }) ?? 30000;

      this.cache.set(token, { payload: response.data.payload, expiresAt: now + ttlMs });
      return response.data.payload;
    } catch (error) {
      this.cache.delete(token);

      if (axios.isAxiosError(error)) {
        const status = error.response?.status ?? 'no-status';
        const msg = error.response?.data?.message ?? error.message;
        this.logger.warn(`Introspection call failed (${status}): ${msg}`);
      } else if (error instanceof Error) {
        this.logger.warn(`Introspection call failed: ${error.message}`);
      }

      throw new UnauthorizedException('Invalid token');
    }
  }
}
