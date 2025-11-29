#!/bin/bash
# Kubernetes deployment script for MG-Test (Docker Desktop)
# Usage: ./scripts/k8s-deploy.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "🚀 MG-Test Kubernetes Deployment"
echo "================================="
echo "Using Docker Desktop's Kubernetes..."
echo ""

# Step 1: Build Docker images
echo "📦 Building Docker images..."

cd "$PROJECT_ROOT"
docker build -f apps/back-end/Dockerfile -t mg-test-api:latest .
docker build -f apps/socket-gateway/Dockerfile -t mg-test-socket:latest .
docker build -f apps/web-app/Dockerfile \
  --build-arg NEXT_PUBLIC_BACKEND_URL=http://localhost:30002 \
  --build-arg NEXT_PUBLIC_SOKCET_GETWAY_URL=http://localhost:30003 \
  -t mg-test-web:latest .

echo "✅ Images built successfully"

# Step 2: Apply Kubernetes manifests
echo ""
echo "☸️  Applying Kubernetes manifests..."
kubectl apply -k "$PROJECT_ROOT/k8s/"

# Step 3: Wait for deployments
echo ""
echo "⏳ Waiting for deployments to be ready..."
kubectl -n mg-test wait --for=condition=available --timeout=120s deployment/api || true
kubectl -n mg-test wait --for=condition=available --timeout=120s deployment/socket || true
kubectl -n mg-test wait --for=condition=available --timeout=180s deployment/web || true

# Step 4: Show status
echo ""
echo "📊 Deployment Status:"
echo "====================="
kubectl -n mg-test get pods
echo ""
kubectl -n mg-test get services
echo ""

# Step 5: Show access URLs
echo "🌐 Access URLs:"
echo "==============="
echo "Web App:        http://localhost:30000"
echo "API:            http://localhost:30002"
echo "Socket Gateway: http://localhost:30003"

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Useful commands:"
echo "  kubectl -n mg-test get pods          # List pods"
echo "  kubectl -n mg-test logs -f <pod>     # View logs"
echo "  kubectl -n mg-test get hpa           # View auto-scaling status"
echo "  kubectl delete -k k8s/               # Delete all resources"
echo "  kubectl apply -k k8s/                # Apply all resources"
