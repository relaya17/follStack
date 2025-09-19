#!/bin/bash

# Railway Deployment Script
# Make sure to install railway CLI globally: npm install -g @railway/cli

echo "Building project..."
npm run build:web

echo "Deploying to Railway..."
railway up

echo "Deployment complete!"