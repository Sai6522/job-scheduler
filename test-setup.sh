#!/bin/bash

echo "🧪 Testing Job Scheduler setup..."

# Check if all required files exist
files=(
  "backend/package.json"
  "backend/src/server.ts"
  "backend/prisma/schema.prisma"
  "frontend/package.json"
  "frontend/app/page.tsx"
  "README.md"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file exists"
  else
    echo "❌ $file missing"
    exit 1
  fi
done

echo ""
echo "🎉 All files present! Project structure is correct."
echo ""
echo "Next steps:"
echo "1. Get a webhook URL from https://webhook.site"
echo "2. Update backend/.env with your WEBHOOK_URL"
echo "3. Run: npm run setup"
echo "4. Run: npm run dev"
