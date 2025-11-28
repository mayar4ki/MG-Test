import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Env } from './config/env-validation.schema';
import { RedisIoAdapter } from './redis-io-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });

  const logger = new Logger('SocketGatewayBootstrap');
  const configService = app.get(ConfigService<Env>);

  const port = configService.get('GATEWAY_PORT', { infer: true }) ?? 3001;
  const redisUrl = configService.get('REDIS_URL', { infer: true });

  if (redisUrl) {
    try {
      const redisAdapter = new RedisIoAdapter(redisUrl);
      await redisAdapter.connect();
      app.useWebSocketAdapter(redisAdapter);
      logger.log(`Using Redis adapter for Socket.IO @ ${redisUrl}`);
    } catch (error) {
      logger.error(`Failed to connect Redis adapter (${redisUrl}); falling back to in-memory`, error as Error);
    }
  } else {
    logger.warn('REDIS_URL not set; gateway will not scale horizontally');
  }

  await app.listen(port);
  logger.log(`Socket gateway listening on port ${port} (namespace: /ws/tickers)`);
}

bootstrap();
