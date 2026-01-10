#!/bin/bash

# Set default DATABASE_URL if not provided
export DATABASE_URL=${DATABASE_URL:-"file:./prod.db"}

echo "Building with DATABASE_URL: $DATABASE_URL"

# Build TypeScript
echo "Compiling TypeScript..."
npx tsc

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Push database schema
echo "Pushing database schema..."
npx prisma db push

echo "Build completed successfully!"
