#!/bin/bash

# Surge Deployment Script
# Make sure to install surge globally: npm install -g surge

echo "Building project..."
npm run build:web

echo "Deploying to Surge..."
cd dist
surge . your-app-name.surge.sh

echo "Deployment complete!"