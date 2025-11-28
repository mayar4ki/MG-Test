## MG 宝宝

### Web App

- Dashboard
- Support
- Settings

### Docker

- Copy `.env.example` to `.env` and set any secrets (e.g. `JWT_SECRET`); defaults in `docker-compose.yml` cover local use.
- Build and start everything: `docker compose build` then `docker compose up`.
- Services:
  - Frontend: http://localhost:3000
  - API: http://localhost:3002/api
  - Socket gateway: ws://localhost:3003/ws/tickers
  - Redis (for socket scaling): redis://localhost:6379 (password `redispass`)
- Override envs via `docker compose` CLI (e.g. `PORT=4000 docker compose up`); Next build args use `NEXT_PUBLIC_BACKEND_URL` and `NEXT_PUBLIC_SOKCET_GETWAY_URL`.
