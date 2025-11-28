# syntax=docker/dockerfile:1
FROM node:22-alpine AS base
WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apk add --no-cache libc6-compat \
  && corepack enable \
  && corepack prepare pnpm@10.19.0 --activate

FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json .npmrc ./
COPY apps/web-app/package.json apps/web-app/package.json
COPY packages/ui/package.json packages/ui/package.json
COPY packages/white-label/package.json packages/white-label/package.json
COPY tooling/tsconfig/package.json tooling/tsconfig/package.json
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --filter web-app... --frozen-lockfile

FROM base AS builder
ARG NEXT_PUBLIC_BACKEND_URL=http://localhost:3002
ARG NEXT_PUBLIC_SOKCET_GETWAY_URL=http://localhost:3003
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
ENV NEXT_PUBLIC_SOKCET_GETWAY_URL=${NEXT_PUBLIC_SOKCET_GETWAY_URL}

# Copy all node_modules (root + local packages)
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web-app/node_modules ./apps/web-app/node_modules
COPY --from=deps /app/packages/ui/node_modules ./packages/ui/node_modules
COPY --from=deps /app/packages/white-label/node_modules ./packages/white-label/node_modules
COPY . .

# Write env file for Next.js build
RUN printf "NEXT_PUBLIC_BACKEND_URL=%s\nNEXT_PUBLIC_SOKCET_GETWAY_URL=%s\n" \
    "$NEXT_PUBLIC_BACKEND_URL" "$NEXT_PUBLIC_SOKCET_GETWAY_URL" > /app/.env

RUN pnpm --filter web-app... build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Next.js standalone output includes all necessary dependencies
COPY --from=builder /app/apps/web-app/public ./apps/web-app/public
COPY --from=builder /app/apps/web-app/.next/standalone ./
COPY --from=builder /app/apps/web-app/.next/static ./apps/web-app/.next/static

EXPOSE 3000

CMD ["node", "apps/web-app/server.js"]
