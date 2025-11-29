# syntax=docker/dockerfile:1
FROM node:24-alpine AS base
WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apk add --no-cache libc6-compat \
  && corepack enable \
  && corepack prepare pnpm@10.19.0 --activate

FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json .npmrc ./
COPY apps/socket-gateway/package.json apps/socket-gateway/package.json
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --filter socket-gateway... --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/socket-gateway/node_modules ./apps/socket-gateway/node_modules
COPY . .
RUN pnpm --filter socket-gateway... build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy build output
COPY --from=builder /app/apps/socket-gateway/dist ./apps/socket-gateway/dist
COPY --from=builder /app/apps/socket-gateway/package.json ./apps/socket-gateway/package.json

# Copy workspace files for pnpm
COPY --from=deps /app/pnpm-lock.yaml ./
COPY --from=deps /app/pnpm-workspace.yaml ./
COPY --from=deps /app/package.json ./
COPY --from=deps /app/.npmrc ./

# Install production dependencies only
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --filter socket-gateway --prod --frozen-lockfile

EXPOSE 3003

CMD ["node", "apps/socket-gateway/dist/main.js"]
