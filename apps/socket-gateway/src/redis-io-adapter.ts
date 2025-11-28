import { Logger } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import type { ServerOptions } from 'socket.io';
import type { RedisClientType } from 'redis';
import { createClient } from 'redis';

/**
 * Socket.IO adapter backed by Redis for cross-instance pub/sub.
 */
export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter> | null = null;
  private pubClient: RedisClientType | null = null;
  private subClient: RedisClientType | null = null;
  private readonly logger = new Logger(RedisIoAdapter.name);

  constructor(private readonly redisUrl: string) {
    super();
  }

  async connect(): Promise<void> {
    this.pubClient = createClient({ url: this.redisUrl });
    this.subClient = this.pubClient.duplicate();

    await this.pubClient.connect();
    await this.subClient.connect();

    this.adapterConstructor = createAdapter(this.pubClient, this.subClient);
    this.logger.log(`Redis adapter connected at ${this.redisUrl}`);
  }

  override createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, {
      ...options,
    });

    if (this.adapterConstructor) {
      server.adapter(this.adapterConstructor);
      this.logger.log('Redis adapter registered for Socket.IO');
    } else {
      this.logger.warn('Redis adapter not initialized; using in-memory adapter');
    }

    return server;
  }

  async disconnect(): Promise<void> {
    if (this.pubClient) {
      await this.pubClient.quit();
      this.pubClient = null;
    }
    if (this.subClient) {
      await this.subClient.quit();
      this.subClient = null;
    }
  }
}
