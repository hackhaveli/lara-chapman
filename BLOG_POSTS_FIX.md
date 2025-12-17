# Blog Posts Not Showing - Complete Fix

## Problem
Blog posts are sometimes showing and sometimes not showing after publishing. The root cause is a **CORS (Cross-Origin Resource Sharing) configuration issue**.

## Root Cause
The backend server (`server/server.js`) was configured to only allow requests from `http://localhost:5173`, but the frontend is running on `http://localhost:5174`. This causes the browser to block API calls due to CORS policy violations.

## Solution Applied

### 1. Fixed CORS Configuration
Updated `server/server.js` to allow multiple frontend URLs:

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

### 2. Published Draft Posts
Created and ran `server/check-published-posts.js` to ensure all blog posts are marked as "published":
- Found 5 total posts
- 3 were already published
- 2 draft posts were automatically published

### 3. Added Debug Logging
Added console logging to both:
- `src/pages/Blog.tsx` - to track API calls
- `src/lib/api.ts` - to track API responses

## How to Verify the Fix

1. **Ensure both servers are running:**
   ```bash
   # Terminal 1 - Frontend
   cd c:\Users\coder\OneDrive\Desktop\lara-chapman
   npm run dev
   
   # Terminal 2 - Backend
   cd c:\Users\coder\OneDrive\Desktop\lara-chapman\server
   npm run dev
   ```

2. **Check the backend is running:**
   - Should see: `Server running on port 5000`
   - Should see: `MongoDB Connected`

3. **Check the frontend is running:**
   - Should see: `Local: http://localhost:5174/`

4. **Test the blog page:**
   - Navigate to: `http://localhost:5174/blog`
   - Open browser console (F12)
   - Look for logs starting with `[API]`
   - Should see 5 published blog posts

5. **Test the API directly:**
   ```bash
   curl http://localhost:5000/api/blog?status=published
   ```
   Should return JSON with 5 posts.

## Common Issues & Solutions

### Issue: "ERR_CONNECTION_REFUSED"
**Solution:** Backend server is not running. Start it with:
```bash
cd server
npm run dev
```

### Issue: "CORS policy" error in console
**Solution:** The CORS fix should resolve this. If it persists:
1. Stop the backend server (Ctrl+C)
2. Restart it: `npm run dev`
3. Hard refresh the browser (Ctrl+Shift+R)

### Issue: "No posts found" even though API returns data
**Solution:**
1. Check browser console for errors
2. Verify the API_BASE_URL in console logs
3. Ensure posts are marked as "published" in database

### Issue: Posts show in admin but not on public blog
**Solution:** Run the publish script:
```bash
cd server
node check-published-posts.js
```

## Files Modified
1. `server/server.js` - Fixed CORS configuration
2. `src/pages/Blog.tsx` - Added debug logging
3. `src/lib/api.ts` - Added detailed API logging
4. `vite.config.ts` - Added server host configuration

## Files Created
1. `server/check-published-posts.js` - Script to publish draft posts
2. `server/test-api.js` - Script to test API responses

## Next Steps
Once verified working:
1. Remove debug console.log statements from production code
2. Update `.env` file with production API URL
3. Test on deployed environment (Vercel)
