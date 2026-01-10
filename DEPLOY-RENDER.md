# Render Deployment Steps

## 1. Prepare Backend for Render

1. **Visit**: https://render.com
2. **Sign up** with GitHub account
3. **Click "New"** → "Web Service"
4. **Connect**: `Sai6522/job-scheduler` repository
5. **Configure**:
   - Name: `job-scheduler-backend`
   - Root Directory: `backend`
   - Runtime: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

## 2. Environment Variables

In Render dashboard, add:
- `DATABASE_URL`: `file:./prod.db`
- `WEBHOOK_URL`: `https://webhook.site/your-unique-id`
- `NODE_ENV`: `production`

## 3. Update Backend Scripts

Ensure backend/package.json has:
```json
{
  "scripts": {
    "build": "tsc && npx prisma generate && npx prisma db push",
    "start": "node dist/server.js"
  }
}
```

## 4. Deploy
- Click "Create Web Service"
- Get your backend URL: `https://job-scheduler-backend.onrender.com`
