# Render Environment Variables Fix

## Problem
The DATABASE_URL environment variable in Render doesn't have the `file:` protocol prefix.

## Solution
Update the DATABASE_URL in your Render dashboard:

**Current (Wrong):**
```
DATABASE_URL=./prod.db
```

**Correct:**
```
DATABASE_URL=file:./prod.db
```

## Steps to Fix:

1. Go to: https://dashboard.render.com
2. Find your backend service: `job-scheduler-backend`
3. Click on "Environment" tab
4. Edit the `DATABASE_URL` variable
5. Change value to: `file:./prod.db`
6. Click "Save Changes"
7. Service will automatically redeploy

## Alternative: Remove DATABASE_URL
You can also remove the DATABASE_URL environment variable entirely, and the build script will set the default value.
