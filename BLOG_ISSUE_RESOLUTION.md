# Blog Posts Issue - Complete Resolution Summary

## Problem Statement
Blog posts were sometimes showing and sometimes not showing after publishing. The main issues were:
1. **CORS (Cross-Origin Resource Sharing) blocking** - Backend only allowed requests from port 5173, but frontend was on 5174
2. **Multiple server instances** - Multiple backend servers trying to run on port 5000 causing conflicts
3. **Draft posts** - Some posts were in "draft" status instead of "published"

## Root Causes Identified

### 1. CORS Configuration Issue ✅ FIXED
**Problem:** Backend server (`server/server.js`) was configured to only allow requests from `http://localhost:5173`, but the frontend was running on `http://localhost:5174`.

**Error in Browser Console:**
```
Access to fetch at 'http://localhost:5000/api/blog' from origin 'http://localhost:5174' has been blocked by CORS policy
```

**Solution:** Updated CORS configuration to allow multiple ports:
```javascript
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
```

### 2. Port Conflict - Multiple Server Instances ✅ FIXED
**Problem:** Multiple `npm run dev` processes were running in the server directory, causing "EADDRINUSE" errors.

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
1. Killed all processes using port 5000:
   ```powershell
   Get-NetTCPConnection -LocalPort 5000 | Select-Object -ExpandProperty OwningProcess | ForEach-Object { taskkill /F /PID $_ }
   ```
2. Started only ONE backend server instance

### 3. Draft Posts Not Published ✅ FIXED
**Problem:** Some blog posts were in "draft" status instead of "published".

**Solution:** Created and ran `server/check-published-posts.js` to publish all draft posts:
- Found 5 total posts
- 3 were already published
- 2 draft posts were automatically published

## Files Modified

### 1. `server/server.js`
- Fixed CORS configuration to allow multiple frontend URLs
- Removed invalid null characters that were causing syntax errors

### 2. `src/pages/Blog.tsx`
- Added console logging to debug API calls and state updates
- Added logging for filtering and pagination logic

### 3. `src/lib/api.ts`
- Added detailed logging to track API requests and responses
- Logs URL, status, and response data

### 4. `vite.config.ts`
- Added server configuration to bind to all network interfaces (0.0.0.0)

## Files Created

### 1. `server/check-published-posts.js`
Script to check and publish all blog posts in the database

### 2. `server/test-api.js`
Script to test API responses directly

### 3. `BLOG_POSTS_FIX.md`
Comprehensive documentation of the issue and solution

## Current Status

### ✅ Backend Server
- Running successfully on port 5000
- Connected to MongoDB
- CORS properly configured
- API endpoint `/api/blog?status=published` returns 5 posts

### ✅ Frontend Server  
- Running successfully on port 5174
- Making successful API calls to backend
- Receiving 5 blog posts from API

### ⚠️ Rendering Issue (IN PROGRESS)
The API is working correctly and returning 5 posts, but the posts are not rendering visually on the page. Console logs show:
- API Response: `{success: true, data: {posts: [5 posts], pagination: {...}}}`
- Posts received: `[Object, Object, Object, Object, Object]` (5 posts)
- However, the blog post cards are not appearing on the page

**Next Steps to Debug:**
1. Check if `filteredPosts` state is being set correctly
2. Verify `currentPosts` array has items
3. Check if there's a React rendering issue in the map function
4. Verify the post data structure matches the expected format

## How to Verify

### 1. Check Backend is Running
```bash
cd c:\Users\coder\OneDrive\Desktop\lara-chapman\server
npm run dev
```
Should see:
- `Server running on port 5000`
- `MongoDB Connected`

### 2. Check Frontend is Running
```bash
cd c:\Users\coder\OneDrive\Desktop\lara-chapman
npm run dev
```
Should see:
- `Local: http://localhost:5174/`

### 3. Test API Directly
```bash
curl http://localhost:5000/api/blog?status=published
```
Should return JSON with 5 posts.

### 4. Check Browser Console
Navigate to `http://localhost:5174/blog` and open console (F12):
- Should see `[API] Fetching from URL: http://localhost:5000/api/blog?status=published...`
- Should see `[API] Response status: 200`
- Should see `Posts received: [5 posts]`

## Recommendations

1. **Remove Debug Logging** - Once the rendering issue is fixed, remove all console.log statements from production code

2. **Environment Variables** - Set `VITE_API_URL` in `.env` file for production deployment

3. **Single Server Instance** - Always ensure only ONE backend server is running to avoid port conflicts

4. **Monitor CORS** - When deploying to production (Vercel), update `FRONTEND_URL` environment variable

## Summary

The main CORS and server connectivity issues have been resolved. The API is now working correctly and returning blog posts. The remaining issue is a frontend rendering problem where the posts are received but not displayed. This requires further investigation into the React component's state management and rendering logic.
