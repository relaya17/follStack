#!/bin/bash

# Render Deployment Script
# Make sure to install render CLI globally: npm install -g @render/cli

echo "Building project..."
npm run build:web

echo "Deploying to Render..."
render deploy

echo "Deployment complete!"