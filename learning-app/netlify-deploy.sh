#!/bin/bash

# Netlify Deployment Script
# Make sure to install netlify CLI globally: npm install -g netlify-cli

echo "Building project..."
npm run build:web

echo "Deploying to Netlify..."
netlify deploy --prod --dir=dist

echo "Deployment complete!"