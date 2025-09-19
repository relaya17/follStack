#!/bin/bash

# DigitalOcean App Platform Deployment Script
# Make sure to install doctl CLI globally: npm install -g doctl

echo "Building project..."
npm run build:web

echo "Deploying to DigitalOcean App Platform..."
doctl apps create --spec .do/app.yaml

echo "Deployment complete!"