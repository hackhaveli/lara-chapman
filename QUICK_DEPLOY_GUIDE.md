# 🚀 Quick Deployment Reference Card

## 📝 What You Need Before Starting

1. **MongoDB Connection String** (from MongoDB Atlas)
   ```
   mongodb+srv://username:password@cluster.mongodb.net/lara-chapman?retryWrites=true&w=majority
   ```

2. **Admin Credentials** (choose these now)
   - Username: `admin` (or your choice)
   - Password: `YourSecurePassword123!` (choose a strong one)

3. **GitHub Repository**
   - ✅ Already pushed: `hackhaveli/lara-chapman`

---

## 🎯 Deployment Steps (5 Minutes)

### Step 1: Go to Render
→ https://render.com → Sign up with GitHub

### Step 2: Create Blueprint
→ Click "New +" → "Blueprint" → Connect `hackhaveli/lara-chapman`

### Step 3: Add Environment Variables

**Backend (lara-chapman-api):**
```
MONGODB_URI = [paste your MongoDB connection string]
ADMIN_USERNAME = admin
ADMIN_PASSWORD = [your secure password]
FRONTEND_URL = https://lara-chapman-frontend.onrender.com
```

**Frontend (lara-chapman-frontend):**
```
VITE_API_URL = https://lara-chapman-api.onrender.com/api
```

### Step 4: Deploy
→ Click "Apply" → Wait 10 minutes

### Step 5: Update URLs (After Deployment)
1. Update backend `FRONTEND_URL` with actual frontend URL
2. Update frontend `VITE_API_URL` with actual backend URL
3. Redeploy both services

---

## ✅ Verification Checklist

Test these URLs (replace with your actual URLs):

- [ ] Backend Health: `https://lara-chapman-api.onrender.com/api/health`
- [ ] Blog API: `https://lara-chapman-api.onrender.com/api/blog?status=published`
- [ ] Frontend: `https://lara-chapman-frontend.onrender.com`
- [ ] Blog Page: `https://lara-chapman-frontend.onrender.com/blog`
- [ ] Admin Login: `https://lara-chapman-frontend.onrender.com/admin`

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Backend error | Check MongoDB URI, verify MongoDB Atlas network access |
| No blog posts | Check browser console, verify VITE_API_URL |
| CORS error | Update FRONTEND_URL in backend, redeploy |
| Slow first load | Free tier spins down, wait 60 seconds |

---

## 💰 Cost

- **Free**: $0/month (backend spins down after 15 min)
- **Recommended**: $7/month (backend always-on)

---

## 📚 Full Guide

For detailed step-by-step instructions, see:
→ `STEP_BY_STEP_DEPLOYMENT.md`

---

**Ready? Go to https://render.com and start deploying!** 🚀
