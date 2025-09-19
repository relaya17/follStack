#!/bin/bash

# Azure Static Web Apps Deployment Script
# Make sure to install azure CLI globally: npm install -g @azure/static-web-apps-cli

echo "Building project..."
npm run build:web

echo "Deploying to Azure Static Web Apps..."
swa deploy dist

echo "Deployment complete!"