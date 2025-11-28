#!/bin/bash
# Kubernetes deployment script for MG-Test
# Usage: ./scripts/k8s-deploy.sh [minikube|kind|docker-desktop]

set -e

CLUSTER_TYPE="${1:-minikube}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "🚀 MG-Test Kubernetes Deployment"
echo "================================="
echo "Cluster type: $CLUSTER_TYPE"
echo ""

# Step 1: Build Docker images
echo "📦 Building Docker images..."

case $CLUSTER_TYPE in
  minikube)
    echo "Using Minikube's Docker daemon..."
    eval $(minikube docker-env)
    ;;
  kind)
    echo "Will load images into Kind after building..."
    ;;
  docker-desktop)
    echo "Using Docker Desktop's daemon..."
    ;;
  *)
    echo "Unknown cluster type: $CLUSTER_TYPE"
    echo "Usage: $0 [minikube|kind|docker-desktop]"
    exit 1
    ;;
esac

# Build images
cd "$PROJECT_ROOT"
docker build -f apps/back-end/Dockerfile -t mg-test-api:latest .
docker build -f apps/socket-gateway/Dockerfile -t mg-test-socket:latest .
docker build -f apps/web-app/Dockerfile \
  --build-arg NEXT_PUBLIC_BACKEND_URL=http://localhost:30002 \
  --build-arg NEXT_PUBLIC_SOKCET_GETWAY_URL=http://localhost:30003 \
  -t mg-test-web:latest .

echo "✅ Images built successfully"

# For Kind, load images into the cluster
if [ "$CLUSTER_TYPE" = "kind" ]; then
  echo "📤 Loading images into Kind cluster..."
  kind load docker-image mg-test-api:latest
  kind load docker-image mg-test-socket:latest
  kind load docker-image mg-test-web:latest
  echo "✅ Images loaded into Kind"
fi

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

case $CLUSTER_TYPE in
  minikube)
    MINIKUBE_IP=$(minikube ip)
    echo "Web App:        http://$MINIKUBE_IP:30000"
    echo "API:            http://$MINIKUBE_IP:30002"
    echo "Socket Gateway: http://$MINIKUBE_IP:30003"
    ;;
  *)
    echo "Web App:        http://localhost:30000"
    echo "API:            http://localhost:30002"
    echo "Socket Gateway: http://localhost:30003"
    ;;
esac

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Useful commands:"
echo "  kubectl -n mg-test get pods          # List pods"
echo "  kubectl -n mg-test logs -f <pod>     # View logs"
echo "  kubectl -n mg-test get hpa           # View auto-scaling status"
echo "  kubectl delete -k k8s/               # Delete all resources"

