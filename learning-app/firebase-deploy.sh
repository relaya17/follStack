#!/bin/bash

# Firebase Deployment Script
# Make sure to install firebase CLI globally: npm install -g firebase-tools

echo "Building project..."
npm run build:web

echo "Deploying to Firebase..."
firebase deploy

echo "Deployment complete!"