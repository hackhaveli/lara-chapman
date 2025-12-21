# 🔐 Where to Find Your Credentials

I found where your credentials are being used. You need to copy the values from your local configuration and paste them into Render's Environment Variables.

## 1. Where to Look

Open the file: **`server/.env`**

You should see lines like this:
```
MONGODB_URI=mongodb+srv://...
ADMIN_USERNAME=...
ADMIN_PASSWORD=...
```

**⚠️ Note:** If direct defaults are being used (not recommended for production), they are currently set to:
- Username: `admin`
- Password: `larachapman2024`

## 2. Variables Verification Checklist

Verify you have these 4 variables ready to copy:

| Variable Name | Description | Where to find value |
|---|---|---|
| **`MONGODB_URI`** | Database Connection String | In `server/.env` line starting with `MONGODB_URI=` |
| **`ADMIN_USERNAME`** | Admin Login Username | In `server/.env` or default: `admin` |
| **`ADMIN_PASSWORD`** | Admin Login Password | In `server/.env` or default: `larachapman2024` |
| **`FRONTEND_URL`** | URL of your Frontend | Use: `https://lara-chapman-frontend.onrender.com` |

## 3. How to Add to Render.com

1. Go to your **Backend Service** on Render.
2. Click on the **"Environment"** tab.
3. Click **"Add Environment Variable"**.
4. Copy the **Variable Name** (KEY) and **Value** from your `.env` file for each of the items above.

---
**Security Tip:** Never share your `MONGODB_URI` or `ADMIN_PASSWORD` publicly or commit `server/.env` to GitHub.
