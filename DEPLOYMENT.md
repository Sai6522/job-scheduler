# 🚀 Manual Deployment Guide

## Quick Deployment Steps

### Step 1: Deploy Backend (Railway - Free)

1. **Go to**: https://railway.app
2. **Sign up** with GitHub
3. **New Project** → **Deploy from GitHub repo**
4. **Select**: `Sai6522/job-scheduler`
5. **Root Directory**: `backend`
6. **Add Environment Variables**:
   ```
   DATABASE_URL=file:./prod.db
   WEBHOOK_URL=https://webhook.site/your-unique-id
   NODE_ENV=production
   ```
7. **Deploy** - Get URL: `https://your-app.railway.app`

### Step 2: Deploy Frontend (Vercel - Free)

1. **Go to**: https://vercel.com
2. **Sign up** with GitHub
3. **New Project** → **Import** `Sai6522/job-scheduler`
4. **Root Directory**: `frontend`
5. **Framework**: Next.js
6. **Add Environment Variable**:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.railway.app
   ```
7. **Deploy** - Get URL: `https://your-app.vercel.app`

### Step 3: Update Backend CORS

1. **Go to Railway dashboard**
2. **Add Environment Variable**:
   ```
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
3. **Redeploy backend**

## Alternative Platforms

### Backend Options:
- **Railway** (Recommended) - Free tier, easy setup
- **Render** - Free tier, good for Node.js
- **Heroku** - Paid, but reliable

### Frontend Options:
- **Vercel** (Recommended) - Free, optimized for Next.js
- **Netlify** - Free tier, good for static sites
- **GitHub Pages** - Free, but requires static export

## Testing Deployment

1. **Visit your frontend URL**
2. **Create a job** using the form
3. **Run a job** and verify status changes
4. **Check webhook** notifications (if configured)

## Troubleshooting

### Common Issues:
- **CORS Error**: Update FRONTEND_URL in backend env vars
- **API Not Found**: Check NEXT_PUBLIC_API_URL in frontend
- **Database Error**: Ensure DATABASE_URL is set correctly
- **Build Failed**: Check build logs for missing dependencies

### Debug Steps:
1. Check deployment logs in platform dashboard
2. Verify environment variables are set
3. Test API endpoints directly: `https://your-backend.railway.app/api/jobs`
4. Check browser console for frontend errors

## Production URLs

After deployment, you'll have:
- **Frontend**: `https://job-scheduler-frontend.vercel.app`
- **Backend**: `https://job-scheduler-backend.railway.app`
- **API**: `https://job-scheduler-backend.railway.app/api/jobs`

## Security Notes

- Never commit `.env` files
- Use environment variables for all secrets
- Enable HTTPS only in production
- Validate all inputs on backend
