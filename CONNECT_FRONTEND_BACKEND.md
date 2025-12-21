# 🔌 Connecting Frontend to Backend

You are almost there! Follow these exact steps to link them.

## Step 1: Tell Frontend where the Backend is

1. Open your **Frontend Service** (`lara-chapman-frontend`) on Render.
2. Go to **Environment**.
3. Add Variable:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://lara-chapman-api.onrender.com/api`
   *(Note: Must include `/api` at the end)*
4. **Save** and **Redeploy** (Manual Deploy > Deploy latest commit).

## Step 2: Tell Backend to trust the Frontend (CORS)

1. Copy your **Frontend URL** (e.g., `https://lara-chapman-frontend.onrender.com`).
2. Open your **Backend Service** (`lara-chapman-api`) on Render.
3. Go to **Environment**.
4. Add Variable:
   - **Key:** `FRONTEND_URL`
   - **Value:** `https://lara-chapman-frontend.onrender.com`
   *(Note: No trailing slash)*
5. **Save** (Service will auto-restart).

## 📊 Verification

After both services update (give it 5 minutes):

1. Open your Frontend URL (`https://lara-chapman-frontend.onrender.com`).
2. Go to the **Blog** page.
3. If you see posts, **IT WORKS!** 🎉
