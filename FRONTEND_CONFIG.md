# 🚀 Frontend Deployment Configuration

Great job deploying the backend! Now configure the frontend.

## 1. Configure Frontend Environment

Go to your **`lara-chapman-frontend`** service on Render and add this variable:

| Key | Value |
|-----|-------|
| **`VITE_API_URL`** | `https://lara-chapman-api.onrender.com/api` |

**⚠️ Important:** Do NOT forget the `/api` at the end!

## 2. Final Backend Update (CORS)

Once your frontend is live and you have its URL (e.g., `https://lara-chapman-frontend.onrender.com`):

1. Go back to your **Backend Service**.
2. Update the `FRONTEND_URL` variable:

| Key | Value |
|-----|-------|
| **`FRONTEND_URL`** | `https://lara-chapman-frontend.onrender.com` |

(Replace with your ACTUAL final frontend URL)

This ensures your frontend is allowed to talk to your backend.
