# Railway Deployment Steps

## 1. Prepare Backend for Railway

1. **Visit**: https://railway.app
2. **Sign up** with GitHub account
3. **Click "New Project"** → "Deploy from GitHub repo"
4. **Select**: `Sai6522/job-scheduler`
5. **Choose**: `backend` folder as root directory

## 2. Configure Environment Variables

In Railway dashboard:
- Add `DATABASE_URL`: `file:./prod.db`
- Add `WEBHOOK_URL`: `https://webhook.site/your-unique-id`
- Add `PORT`: `3001`

## 3. Add Railway Configuration

Create `railway.toml` in backend folder:

```toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "npm run build && npm start"
```

## 4. Update package.json

Add to backend/package.json:
```json
{
  "scripts": {
    "build": "tsc && npx prisma generate && npx prisma db push",
    "start": "node dist/server.js"
  }
}
```

## 5. Deploy
- Railway will auto-deploy
- Get your backend URL: `https://your-app.railway.app`
