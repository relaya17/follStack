#!/bin/bash

# AWS S3 Deployment Script
# Make sure to configure AWS CLI first: aws configure

# Build the project
echo "Building project..."
npm run build:web

# Sync to S3 bucket
echo "Deploying to S3..."
aws s3 sync dist/ s3://your-bucket-name --delete

# Set cache headers for static assets
echo "Setting cache headers..."
aws s3 cp dist/ s3://your-bucket-name --recursive --metadata-directive REPLACE --cache-control "public, max-age=31536000"

# Set cache headers for HTML files
echo "Setting HTML cache headers..."
aws s3 cp dist/ s3://your-bucket-name --recursive --exclude "*" --include "*.html" --metadata-directive REPLACE --cache-control "public, max-age=0"

echo "Deployment complete!"