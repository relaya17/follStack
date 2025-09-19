#!/bin/bash

# Cloudflare Pages Deployment Script
# Make sure to install wrangler CLI globally: npm install -g wrangler

echo "Building project..."
npm run build:web

echo "Deploying to Cloudflare Pages..."
wrangler pages publish dist

echo "Deployment complete!"