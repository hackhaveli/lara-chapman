# Admin Panel Backend Setup Instructions

## Quick Start

1. Create a `.env` file in the `server` directory with the following content:

```
# MongoDB Connection
MONGODB_URI=mongodb+srv://coderrohit2927_db_user:O6ZghP3ERtxzz7Ir@cluster0.uadfkjh.mongodb.net/lara-chapman?retryWrites=true&w=majority&appName=Cluster0

# Server Port
PORT=5000

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=larachapman2024

# Node Environment
NODE_ENV=development
```

2. Start the backend server:
```bash
cd server
npm run dev
```

3. Start the frontend (in another terminal):
```bash
npm run dev
```

4. Access the admin panel at: http://localhost:5173/admin

## Default Login Credentials
- Username: `admin`
- Password: `larachapman2024`

## Seeding the Database

To populate initial data, run:
```bash
cd server
npm run seed
```

This will add:
- Sample neighborhoods (Mesa, Gilbert, Paradise Valley, etc.)
- Default site content for all pages

## API Endpoints

### Public Routes (no auth required)
- `GET /api/content` - Get all site content
- `GET /api/content/:section` - Get specific section (home, about, buy, sell, calculators, contact)
- `GET /api/neighborhoods` - Get all active neighborhoods
- `GET /api/neighborhoods/:slug` - Get single neighborhood by slug

### Admin Routes (requires Basic Auth)
- `PUT /api/content` - Update site content
- `PUT /api/content/:section` - Update specific section
- `POST /api/neighborhoods` - Create new neighborhood
- `PUT /api/neighborhoods/:id` - Update neighborhood
- `DELETE /api/neighborhoods/:id` - Delete neighborhood

## Admin Panel Features

1. **Dashboard** - Overview of content and quick actions
2. **Neighborhoods** - Create, edit, delete neighborhood listings
3. **Buy & Sell Pages** - Manage buying/selling process steps
4. **General Pages** - Edit Home, About, Contact, and Calculators content
