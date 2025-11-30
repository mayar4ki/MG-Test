
## Full-stack application built with a modern monorepo architecture.

## 📸 Screenshots

<table>
  <tr>
    <td align="center">
      <img src="docs/screenshots/dashboard.png" alt="Dashboard" width="400"/>
      <br/>
      <em>Main Dashboard</em>
    </td>
    <td align="center">
      <img src="docs/screenshots/home.png" alt="Home" width="400"/>
      <br/>
      <em>Home Page</em>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="docs/screenshots/dashboard2.png" alt="Dashboard 2" width="400"/>
      <br/>
      <em>Dashboard View</em>
    </td>
    <td align="center">
      <img src="docs/screenshots/login.png" alt="Login" width="400"/>
      <br/>
      <em>Login Page</em>
    </td>
  </tr>
</table>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client (Browser)                        │
└─────────────────────────┬───────────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
    ┌───────────┐   ┌───────────┐   ┌───────────┐
    │  Web App  │   │    API    │   │  Socket   │
    │  Next.js  │──▶│  NestJS  |◀──│  Gateway  |
    │   :3000   │   │   :3002   │   │   :3003   │
    └───────────┘   └───────────┘   └─────┬─────┘
                                          │
                                    ┌─────▼─────┐
                                    │   Redis   │
                                    │   :6379   │
                                    └───────────┘
```

---

## 📁 Monorepo Structure

This project uses **pnpm workspaces** and **Turborepo** for monorepo management.

```
mg-test/
├── apps/                    # Deployable applications
│   ├── web-app/            # Next.js 16 frontend (Socket.io)
│   ├── back-end/           # NestJS REST API (JWT auth, request validation)
│   └── socket-gateway/     # NestJS WebSocket server (Socket.io, Redis adapter for scaling)
│
├── packages/                # Shared libraries
│   ├── ui/                 # React component library (shadcn/ui)
│   └── white-label/        # Branding
│
├── tooling/                 # Build configuration
│   └── tsconfig/           # Shared TypeScript configs
│
├── k8s/                     # Kubernetes manifests
├── scripts/                 # Deployment scripts
└── turbo.json              # Turborepo config
```
---
## 🚀 Getting Started

### Prerequisites

**Node.js:** 24.11.1+ / **pnpm:** 10.19.0+ / **Docker:** (for containerized deployment)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd mg-test

# Install dependencies
pnpm install

# Copy environment file
cp .env.example .env
# Edit .env with your values
```

### Development

```bash
# Start all apps in development mode
pnpm dev
```

### Build

```bash
# Build all apps
pnpm build
```
### Build with Docker compose, No auto-scaling. 

```bash
# Build all apps
docker compose up -d
```
---

## ☸️ Deployment: Kubernetes
For production deployments with auto-scaling and high availability.

### Quick Start

```bash
# set the context
kubectl config use-context docker-desktop

# Deploy
./scripts/k8s-deploy.sh

# Useful commands:
kubectl -n mg-test get pods          # List pods"
kubectl -n mg-test get services      # List services"
kubectl -n mg-test logs -f <pod>     # View logs"
kubectl -n mg-test get hpa           # View auto-scaling status"
kubectl delete -k k8s/               # Delete all resources"
kubectl apply -k k8s/                # Apply all resources"
```

### Secrets Configuration

Before deploying, update the secrets in `k8s/secrets.yaml`:

```yaml
# k8s/secrets.yaml
apiVersion: v1
kind: Secret
metadata:
  name: mg-test-secrets
  namespace: mg-test
type: Opaque
stringData:
  JWT_SECRET: "your-production-jwt-secret"
  REDIS_PASSWORD: "your-redis-password"
```

After updating secrets, apply and restart:
```bash
kubectl apply -k k8s/
kubectl -n mg-test rollout restart deployment/api deployment/socket deployment/web
```
### Scaling

Auto-scaling is configured for all services:

| Service | Min | Max | Scale Trigger |
|---------|-----|-----|---------------|
| api | 1 | 5 | CPU > 70% or Memory > 80% |
| socket | 1 | 5 | CPU > 70% or Memory > 80% |
| web | 1 | 3 | CPU > 70% or Memory > 80% |

## ⚙️ Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | API port | `3002` |
| `JWT_SECRET` | JWT signing secret | `your-secret` |
| `GATEWAY_PORT` | Socket gateway port | `3003` |
| `AUTH_INTROSPECT_URL` | Auth endpoint for socket | `http://api:3002/auth/introspect` |
| `AUTH_INTROSPECT_CACHE_TTL_MS` | Auth cache TTL | `30000` |
| `REDIS_URL` | Redis connection URL | `redis://:pass@redis:6379` |
| `REDIS_PASSWORD` | Redis password | `your-password` |
| `WEB_PORT` | Web app port | `3000` |
| `NEXT_PUBLIC_BACKEND_URL` | API URL for browser | `http://localhost:3002` |
| `NEXT_PUBLIC_SOKCET_GETWAY_URL` | Socket URL for browser | `http://localhost:3003` |


##  ⚡Enable Turborepo Remote Cache (Optional)
If you want remote Turbo caching (useful in CI/servers), set these before building images:

| Variable | Description |
|----------|-------------|
| `TURBO_TOKEN` | Auth token for the Turbo remote cache |
| `TURBO_TEAM` | Team/namespace for the cache |
| `TURBO_API` | Turbo API endpoint (only if using a custom endpoint) |

---

## 📄 License

MIT
