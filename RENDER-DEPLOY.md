# Render Backend Deployment

## 1. Create Render Account
1. Go to: https://render.com
2. Sign up with GitHub account
3. Click "New" → "Web Service"

## 2. Connect Repository
1. Click "Connect account" for GitHub
2. Select repository: `Sai6522/job-scheduler`
3. Click "Connect"

## 3. Configure Service
- **Name**: `job-scheduler-backend`
- **Root Directory**: `backend`
- **Environment**: `Node`
- **Region**: `Oregon (US West)` or closest to you
- **Branch**: `main`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

## 4. Environment Variables
Click "Advanced" and add:
```
DATABASE_URL=file:./prod.db
WEBHOOK_URL=https://webhook.site/your-unique-id
NODE_ENV=production
PORT=10000
```

## 5. Deploy
1. Click "Create Web Service"
2. Wait for build to complete (5-10 minutes)
3. Your backend URL: `https://job-scheduler-backend.onrender.com`

## 6. Test Backend
Visit: `https://your-app.onrender.com/api/jobs`
Should return: `[]` (empty array)
