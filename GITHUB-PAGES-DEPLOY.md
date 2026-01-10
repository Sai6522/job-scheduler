# GitHub Pages Frontend Deployment

## Step 1: Enable GitHub Pages
1. Go to: https://github.com/Sai6522/job-scheduler
2. Click **Settings** tab
3. Scroll to **Pages** section
4. **Source**: Deploy from a branch
5. **Branch**: `gh-pages` (will be created automatically)
6. **Folder**: `/ (root)`
7. Click **Save**

## Step 2: Update API URL in Workflow
1. Edit `.github/workflows/deploy.yml`
2. Update `NEXT_PUBLIC_API_URL` with your Render backend URL:
   ```yaml
   env:
     NEXT_PUBLIC_API_URL: https://your-render-app.onrender.com
   ```

## Step 3: Deploy
1. Push changes to main branch
2. GitHub Actions will automatically:
   - Build the Next.js app
   - Export static files
   - Deploy to GitHub Pages
3. Check **Actions** tab for build progress

## Step 4: Access Your Site
- URL: `https://sai6522.github.io/job-scheduler/`
- Build time: ~2-3 minutes
- Updates automatically on push to main

## Manual Build (Alternative)
If you prefer manual deployment:

```bash
cd frontend
npm install
NEXT_PUBLIC_API_URL=https://your-render-app.onrender.com npm run build
```

Then upload the `out/` folder to GitHub Pages manually.

## Troubleshooting
- **404 Error**: Check basePath in next.config.js
- **API Errors**: Verify NEXT_PUBLIC_API_URL is correct
- **Build Failed**: Check Actions tab for error logs
- **CORS Issues**: Update backend CORS settings
