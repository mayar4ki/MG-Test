# Kubernetes Deployment

This directory contains Kubernetes manifests for deploying the MG-Test application.

## Prerequisites

- **Minikube**, **Kind**, or **Docker Desktop** with Kubernetes enabled
- **kubectl** installed and configured
- **Docker** for building images

## Quick Start

### Option 1: Use the deployment script

```bash
# For Minikube
./scripts/k8s-deploy.sh minikube

# For Kind
./scripts/k8s-deploy.sh kind

# For Docker Desktop
./scripts/k8s-deploy.sh docker-desktop
```

### Option 2: Manual deployment

```bash
# 1. Build images (example for Minikube)
eval $(minikube docker-env)
docker build -f apps/back-end/Dockerfile -t mg-test-api:latest .
docker build -f apps/socket-gateway/Dockerfile -t mg-test-socket:latest .
docker build -f apps/web-app/Dockerfile \
  --build-arg NEXT_PUBLIC_BACKEND_URL=http://localhost:30002 \
  --build-arg NEXT_PUBLIC_SOKCET_GETWAY_URL=http://localhost:30003 \
  -t mg-test-web:latest .

# 2. Deploy to Kubernetes
kubectl apply -k k8s/

# 3. Check status
kubectl -n mg-test get pods
```

## Access the Application

| Service | URL |
|---------|-----|
| Web App | http://localhost:30000 |
| API | http://localhost:30002 |
| Socket Gateway | http://localhost:30003 |

> For Minikube, replace `localhost` with `$(minikube ip)`

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Kubernetes Cluster                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                  Namespace: mg-test                  │    │
│  │                                                      │    │
│  │   ┌─────────┐    ┌─────────┐    ┌─────────────┐    │    │
│  │   │   web   │───▶│  socket │───▶│     api     │    │    │
│  │   │ :30000  │    │ :30003  │    │   :30002    │    │    │
│  │   │ 1-3 pods│    │ 1-5 pods│    │  1-5 pods   │    │    │
│  │   └─────────┘    └────┬────┘    └─────────────┘    │    │
│  │                       │                             │    │
│  │                  ┌────▼────┐                        │    │
│  │                  │  redis  │                        │    │
│  │                  │  (PVC)  │                        │    │
│  │                  └─────────┘                        │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Files

| File | Description |
|------|-------------|
| `namespace.yaml` | Creates the `mg-test` namespace |
| `configmap.yaml` | Non-sensitive configuration |
| `secrets.yaml` | Sensitive configuration (JWT, Redis password) |
| `redis.yaml` | Redis StatefulSet with persistent storage |
| `api.yaml` | API Deployment, Service, HPA |
| `socket.yaml` | Socket Gateway Deployment, Service, HPA |
| `web.yaml` | Web App Deployment, Service, HPA |
| `kustomization.yaml` | Kustomize configuration |

## Auto-scaling (HPA)

All services have Horizontal Pod Autoscalers configured:

| Service | Min Pods | Max Pods | Scale on |
|---------|----------|----------|----------|
| api | 1 | 5 | CPU > 70%, Memory > 80% |
| socket | 1 | 5 | CPU > 70%, Memory > 80% |
| web | 1 | 3 | CPU > 70%, Memory > 80% |

Check HPA status:
```bash
kubectl -n mg-test get hpa
```

## Useful Commands

```bash
# View all resources
kubectl -n mg-test get all

# View logs
kubectl -n mg-test logs -f deployment/api
kubectl -n mg-test logs -f deployment/socket
kubectl -n mg-test logs -f deployment/web

# Describe a pod
kubectl -n mg-test describe pod <pod-name>

# Shell into a pod
kubectl -n mg-test exec -it <pod-name> -- sh

# Scale manually
kubectl -n mg-test scale deployment/api --replicas=3

# Delete everything
kubectl delete -k k8s/
# Or use the script:
./scripts/k8s-delete.sh
```

## Configuration

### Update secrets (production)

Edit `k8s/secrets.yaml` and change the values:
```yaml
stringData:
  JWT_SECRET: "your-production-secret"
  REDIS_PASSWORD: "your-redis-password"
```

### Update ConfigMap

Edit `k8s/configmap.yaml` for non-sensitive configuration changes.

After updating, apply changes:
```bash
kubectl apply -k k8s/
kubectl -n mg-test rollout restart deployment/api deployment/socket deployment/web
```

