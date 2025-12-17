# Deployment Checklist - Lara Chapman Website

## ✅ Current Status
- [x] Frontend code ready
- [x] Backend code ready
- [x] Local development working
- [x] Frontend deployed to Vercel
- [ ] Backend deployed to Render.com ⚠️ **THIS IS THE ISSUE**
- [ ] Environment variables configured on Render
- [ ] Frontend pointing to production API

## 🚀 Deployment Steps

### Part 1: Deploy Backend to Render.com

#### 1. Go to Render.com
- URL: https://render.com
- Sign in with GitHub

#### 2. Create New Web Service
- Click "New +" button
- Select "Web Service"
- Connect GitHub repository: `hackhaveli/lara-chapman`

#### 3. Configure Service
```
Name: lara-chapman-api
Root Directory: server
Environment: Node
Branch: main
Build Command: npm install
Start Command: node server.js
```

#### 4. Add Environment Variables
Click "Advanced" → "Add Environment Variable":

```
NODE_ENV = production
MONGODB_URI = mongodb+srv://your-connection-string
ADMIN_USERNAME = your-admin-username
ADMIN_PASSWORD = your-admin-password
FRONTEND_URL = https://lara-chapman-ovhdoa6g7-coderrohit2927s-projects.vercel.app
```

**Important:** Get your MongoDB URI from MongoDB Atlas dashboard

#### 5. Deploy
- Click "Create Web Service"
- Wait 5-10 minutes for deployment
- Note the URL (e.g., `https://lara-chapman-api.onrender.com`)

### Part 2: Update Frontend to Use Production API

#### 1. Go to Vercel Dashboard
- URL: https://vercel.com
- Select your project: `lara-chapman`

#### 2. Update Environment Variable
- Go to Settings → Environment Variables
- Add or update:
  ```
  VITE_API_URL = https://lara-chapman-api.onrender.com/api
  ```
- Select all environments (Production, Preview, Development)

#### 3. Redeploy Frontend
- Go to Deployments tab
- Click "..." on latest deployment
- Click "Redeploy"
- OR push a new commit to trigger auto-deployment

### Part 3: Verify Deployment

#### 1. Test Backend API
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

#### 2. Test Blog API
Open in browser:
```
https://lara-chapman-api.onrender.com/api/blog?status=published
```
Should return JSON with blog posts

#### 3. Test Frontend
Open your production site:
```
https://lara-chapman-ovhdoa6g7-coderrohit2927s-projects.vercel.app/blog
```
Blog posts should now appear!

## 🔧 Troubleshooting

### Issue: Backend shows "Application Error"
**Solution:** Check Render logs for errors
- Go to Render dashboard → Your service → Logs
- Look for MongoDB connection errors
- Verify MONGODB_URI is correct

### Issue: Frontend still shows 404
**Solution:** 
1. Verify VITE_API_URL is set correctly in Vercel
2. Redeploy frontend after changing env vars
3. Clear browser cache (Ctrl+Shift+R)

### Issue: CORS errors
**Solution:** 
- Verify FRONTEND_URL in Render matches your Vercel URL
- Backend CORS is already configured to accept it

### Issue: Blog posts not showing
**Solution:**
- Check if posts are published (run `node check-published-posts.js` locally)
- Verify MongoDB has data
- Check backend logs on Render

## 📝 Important Notes

### Free Tier Limitations
- **Render Free Tier**: Server spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- Consider upgrading to paid tier ($7/month) for always-on service

### MongoDB Atlas
- Make sure your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0)
- Or add Render's IP addresses to whitelist

### Environment Variables
- Never commit `.env` files to GitHub
- Always use environment variables for secrets
- Render and Vercel have separate environment variable settings

## 🎯 Quick Commands

### Local Development
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend  
npm run dev
```

### Build for Production
```bash
# Frontend
npm run build

# Test production build locally
npx serve dist
```

### Deploy to Production
```bash
# Frontend (auto-deploys on git push)
git add .
git commit -m "Update"
git push origin main

# Backend (auto-deploys on git push if connected to Render)
# Or manually redeploy from Render dashboard
```

## ✨ After Successful Deployment

Your site will be live at:
- **Frontend**: https://lara-chapman-ovhdoa6g7-coderrohit2927s-projects.vercel.app
- **Backend API**: https://lara-chapman-api.onrender.com/api

All features should work:
- ✅ Blog posts visible
- ✅ Neighborhoods pages
- ✅ Admin panel
- ✅ Contact forms
- ✅ All dynamic content

## 🔗 Useful Links

- Render Dashboard: https://dashboard.render.com
- Vercel Dashboard: https://vercel.com/dashboard
- MongoDB Atlas: https://cloud.mongodb.com
- GitHub Repo: https://github.com/hackhaveli/lara-chapman

---

**Current Issue**: Backend is not deployed to Render.com. Follow Part 1 above to deploy it.
