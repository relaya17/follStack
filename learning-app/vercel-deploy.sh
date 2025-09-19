#!/bin/bash

# Vercel Deployment Script
# Make sure to install vercel CLI globally: npm install -g vercel

echo "Building project..."
npm run build:web

echo "Deploying to Vercel..."
vercel --prod

echo "Deployment complete!"