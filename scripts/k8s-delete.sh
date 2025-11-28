#!/bin/bash
# Delete all Kubernetes resources for MG-Test
# Usage: ./scripts/k8s-delete.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "🗑️  Deleting MG-Test Kubernetes resources..."
echo ""

kubectl delete -k "$PROJECT_ROOT/k8s/" --ignore-not-found

echo ""
echo "✅ All resources deleted!"

