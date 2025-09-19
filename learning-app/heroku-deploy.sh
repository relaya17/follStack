#!/bin/bash

# Heroku Deployment Script
# Make sure to install heroku CLI globally: npm install -g heroku

echo "Building project..."
npm run build:web

echo "Deploying to Heroku..."
git add .
git commit -m "Deploy to Heroku"
git push heroku main

echo "Deployment complete!"