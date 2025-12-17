# Lara Chapman Real Estate Website

A modern, full-stack real estate website built with React, Node.js, Express, and MongoDB.

## 🌟 Features

- **Dynamic Content Management** - Admin panel for managing all website content
- **Blog System** - Full-featured blog with categories, tags, and rich text editor
- **Neighborhood Guides** - Detailed neighborhood information with videos and stats
- **Property Search Integration** - MLS search integration
- **Mortgage Calculators** - Interactive mortgage and affordability calculators
- **Contact Forms** - Lead capture with CRM integration
- **Responsive Design** - Mobile-first, works on all devices
- **SEO Optimized** - Proper meta tags, semantic HTML, and fast loading

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **CORS** enabled for cross-origin requests
- **RESTful API** architecture

## 📁 Project Structure

```
lara-chapman/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # API and utilities
│   └── main.tsx           # Entry point
├── server/                # Backend source code
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Express middleware
│   ├── config/            # Configuration files
│   └── server.js          # Server entry point
├── public/                # Static assets
└── render.yaml           # Render.com deployment config
```

## 🛠️ Local Development

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/hackhaveli/lara-chapman.git
   cd lara-chapman
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd server
   npm install
   cd ..
   ```

3. **Configure environment variables**

   Create `.env` in root directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

   Create `server/.env`:
   ```env
   MONGODB_URI=your-mongodb-connection-string
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your-secure-password
   FRONTEND_URL=http://localhost:5174
   NODE_ENV=development
   PORT=5000
   ```

4. **Start development servers**

   Terminal 1 - Backend:
   ```bash
   cd server
   npm run dev
   ```

   Terminal 2 - Frontend:
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5174
   - Backend API: http://localhost:5000/api
   - Admin Panel: http://localhost:5174/admin

## 🌐 Deployment

### Deploy to Render.com

This project is configured for easy deployment to Render.com using the included `render.yaml` file.

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Render**
   - Go to https://render.com
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml`
   - Add environment variables when prompted
   - Click "Apply"

3. **Configure environment variables**
   - See `RENDER_DEPLOYMENT_GUIDE.md` for detailed instructions

### Environment Variables

#### Backend
- `MONGODB_URI` - MongoDB connection string
- `ADMIN_USERNAME` - Admin panel username
- `ADMIN_PASSWORD` - Admin panel password
- `FRONTEND_URL` - Frontend URL (for CORS)
- `NODE_ENV` - Set to `production`

#### Frontend
- `VITE_API_URL` - Backend API URL

## 📚 Documentation

- **[Deployment Guide](RENDER_DEPLOYMENT_GUIDE.md)** - Complete deployment instructions
- **[Deployment Checklist](DEPLOYMENT_CHECKLIST.md)** - Step-by-step checklist
- **[Final Status](FINAL_STATUS.md)** - Current project status

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data

## 🎨 Features in Detail

### Admin Panel
- Content management for all pages
- Blog post creation and editing
- Neighborhood management
- Rich text editor with image upload
- Real-time preview

### Blog System
- Categories and tags
- Featured images
- SEO metadata
- Reading time calculation
- Search and filtering
- Pagination

### Neighborhood Guides
- Video integration
- Statistics and highlights
- School information
- Interactive maps
- Custom CTAs

## 🔒 Security

- Environment variables for sensitive data
- Basic authentication for admin panel
- CORS configuration
- Input validation
- MongoDB injection prevention

## 📈 Performance

- Code splitting
- Lazy loading
- Image optimization
- Caching strategies
- CDN ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is proprietary and confidential.

## 👤 Author

**Lara Chapman Real Estate**

## 🙏 Acknowledgments

- Built with modern web technologies
- Deployed on Render.com
- Database hosted on MongoDB Atlas

---

For deployment instructions, see [RENDER_DEPLOYMENT_GUIDE.md](RENDER_DEPLOYMENT_GUIDE.md)
