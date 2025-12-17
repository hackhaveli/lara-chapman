# Deploying to Render.com - Complete Guide

## Overview

This guide will help you deploy both the frontend and backend to Render.com using the `render.yaml` configuration file.

## Prerequisites

1. GitHub account with your code pushed
2. Render.com account (sign up at https://render.com)
3. MongoDB Atlas account with connection string

## Step 1: Prepare Your Code

### 1.1 Commit All Changes
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 1.2 Verify .gitignore
Make sure these are in your `.gitignore`:
```
node_modules/
.env
dist/
.vercel/
```

## Step 2: Set Up Render.com

### 2.1 Create Render Account
1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub
4. Authorize Render to access your repositories

### 2.2 Connect Your Repository
1. Click "New +" in the top right
2. Select "Blueprint"
3. Connect your GitHub repository: `hackhaveli/lara-chapman`
4. Render will detect the `render.yaml` file

## Step 3: Configure Environment Variables

### 3.1 Backend Environment Variables
When prompted, add these environment variables for the **backend service**:

```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/lara-chapman?retryWrites=true&w=majority
ADMIN_USERNAME = your-admin-username
ADMIN_PASSWORD = your-admin-password
FRONTEND_URL = https://lara-chapman-frontend.onrender.com
```

**Important:** 
- Get your MongoDB URI from MongoDB Atlas dashboard
- Replace `username`, `password`, and `cluster` with your actual values
- The `FRONTEND_URL` will be your Render frontend URL (you'll update this after deployment)

### 3.2 Frontend Environment Variables
For the **frontend service**, add:

```
VITE_API_URL = https://lara-chapman-api.onrender.com/api
```

**Note:** This URL will be your backend service URL (you'll get it after backend deploys)

## Step 4: Deploy Services

### 4.1 Deploy Backend First
1. Render will create two services from your `render.yaml`
2. The backend service (`lara-chapman-api`) will deploy first
3. Wait for it to complete (5-10 minutes)
4. Note the URL: `https://lara-chapman-api.onrender.com`

### 4.2 Update Frontend Environment Variable
1. Go to the frontend service settings
2. Update `VITE_API_URL` to: `https://lara-chapman-api.onrender.com/api`
3. Save and trigger a redeploy

### 4.3 Update Backend FRONTEND_URL
1. Go to the backend service settings
2. Update `FRONTEND_URL` to: `https://lara-chapman-frontend.onrender.com`
3. Save and trigger a redeploy

## Step 5: Verify Deployment

### 5.1 Test Backend API
Open in browser:
```
https://lara-chapman-api.onrender.com/api/health
```

Should return:
```json
{
  "status": "ok",
  "timestamp": "...",
  "message": "Lara Chapman Admin API is running"
}
```

### 5.2 Test Blog API
```
https://lara-chapman-api.onrender.com/api/blog?status=published
```

Should return JSON with your blog posts.

### 5.3 Test Frontend
```
https://lara-chapman-frontend.onrender.com
```

Your website should load with all features working!

### 5.4 Test Blog Page
```
https://lara-chapman-frontend.onrender.com/blog
```

All 5 blog posts should be visible!

## Step 6: Configure Custom Domain (Optional)

### 6.1 Add Custom Domain to Frontend
1. Go to frontend service → Settings → Custom Domains
2. Add your domain (e.g., `larachapman.com`)
3. Follow DNS configuration instructions
4. Update backend `FRONTEND_URL` to your custom domain

### 6.2 Add Custom Domain to Backend (Optional)
1. Go to backend service → Settings → Custom Domains
2. Add subdomain (e.g., `api.larachapman.com`)
3. Update frontend `VITE_API_URL` to your custom API domain

## Troubleshooting

### Issue: Backend fails to start
**Solution:**
- Check Render logs for errors
- Verify MongoDB URI is correct
- Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

### Issue: Frontend shows 404 for API calls
**Solution:**
- Verify `VITE_API_URL` is set correctly
- Redeploy frontend after changing environment variables
- Check backend is running and accessible

### Issue: CORS errors
**Solution:**
- Verify `FRONTEND_URL` in backend matches your frontend URL
- Check backend CORS configuration in `server/server.js`

### Issue: Blog posts not showing
**Solution:**
- Verify posts are published in database
- Check API endpoint: `/api/blog?status=published`
- Check browser console for errors

## Important Notes

### Free Tier Limitations
- **Backend**: Spins down after 15 minutes of inactivity
- **Frontend**: Always available (static site)
- First request after spin-down takes 30-60 seconds
- Consider upgrading to paid tier ($7/month per service) for production

### MongoDB Atlas
- Whitelist Render's IP addresses or allow all (0.0.0.0/0)
- Use a strong password
- Enable monitoring and backups

### Environment Variables
- Never commit `.env` files
- Use Render's environment variable settings
- Changes require redeployment

## Deployment Commands

### Manual Redeploy
From Render dashboard:
1. Go to service
2. Click "Manual Deploy"
3. Select branch (main)
4. Click "Deploy"

### Auto-Deploy
Render automatically deploys when you push to GitHub:
```bash
git add .
git commit -m "Update"
git push origin main
```

## URLs After Deployment

Your services will be available at:
- **Frontend**: `https://lara-chapman-frontend.onrender.com`
- **Backend API**: `https://lara-chapman-api.onrender.com/api`
- **Admin Panel**: `https://lara-chapman-frontend.onrender.com/admin`
- **Blog**: `https://lara-chapman-frontend.onrender.com/blog`

## Cost Estimate

### Free Tier (Both Services)
- Backend: Free (with spin-down)
- Frontend: Free
- **Total: $0/month**

### Paid Tier (Recommended for Production)
- Backend: $7/month (always-on)
- Frontend: Free
- **Total: $7/month**

## Next Steps After Deployment

1. ✅ Test all pages and features
2. ✅ Verify admin panel works
3. ✅ Test blog post creation/editing
4. ✅ Check neighborhoods pages
5. ✅ Test contact forms
6. ✅ Configure custom domain
7. ✅ Set up monitoring and alerts
8. ✅ Enable automatic backups

## Support

- Render Documentation: https://render.com/docs
- Render Community: https://community.render.com
- MongoDB Atlas Support: https://www.mongodb.com/cloud/atlas

---

**Ready to deploy?** Push your code to GitHub and follow the steps above!
