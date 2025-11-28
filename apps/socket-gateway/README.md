# Socket Gateway

Lightweight NestJS service that only hosts the ticker WebSocket gateway (`/ws/tickers`). Use this app to scale socket fan-out independently of the API service.

## Run

- Dev/watch: `pnpm --filter socket-gateway dev` (defaults to `GATEWAY_PORT=3001`).
- Prod: `pnpm --filter socket-gateway build && pnpm --filter socket-gateway start:prod`.

## Scaling

- Set `REDIS_URL` (e.g., `redis://user:pass@host:6379`) to enable the Socket.IO Redis adapter for cross-replica broadcasts. Without it, the gateway is single-node only.
- Route `/ws/tickers` to this service; keep `/api/**` routed to your API service.
