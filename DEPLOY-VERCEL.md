# Vercel Frontend Deployment

## 1. Prepare Frontend

1. **Visit**: https://vercel.com
2. **Sign up** with GitHub account
3. **Click "New Project"**
4. **Import**: `Sai6522/job-scheduler`
5. **Configure**:
   - Framework Preset: `Next.js`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`

## 2. Update Frontend Configuration

Update `frontend/next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL + '/api/:path*',
      },
    ]
  },
}

module.exports = nextConfig
```

## 3. Environment Variables

In Vercel dashboard, add:
- `NEXT_PUBLIC_API_URL`: `https://your-backend-url.railway.app`

## 4. Deploy
- Click "Deploy"
- Get your frontend URL: `https://job-scheduler-frontend.vercel.app`

## 5. Update Backend CORS

Add your Vercel URL to backend CORS:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend.vercel.app']
}));
```
