#!/bin/bash

# Setup script for Job Scheduler project

echo "🚀 Setting up Job Scheduler project..."

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
npx prisma generate
npx prisma db push
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "✅ Setup complete!"
echo ""
echo "To run the project:"
echo "1. Terminal 1: cd backend && npm run dev"
echo "2. Terminal 2: cd frontend && npm run dev"
echo "3. Open http://localhost:3000"
echo ""
echo "Don't forget to update WEBHOOK_URL in backend/.env with your webhook.site URL!"
