# 🚀 Deployment Guide - Crowdfunding Platform

## 📋 Prerequisites

### MongoDB Atlas Setup
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (Free tier available)
3. Create database user with password
4. Whitelist IP addresses (0.0.0.0/0 for all IPs)
5. Get connection string: `mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority`

---

## 🖥️ Backend Deployment (Render)

### Step 1: Create Render Account
1. Go to [Render](https://render.com/)
2. Sign up/Sign in with GitHub

### Step 2: Deploy Backend
1. Click **New** → **Web Service**
2. Connect your GitHub repository: `kkishore07/crowd_funding_web`
3. Configure service:
   - **Name:** `crowdfunding-backend`
   - **Region:** Choose nearest region
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

### Step 3: Add Environment Variables
In Render dashboard, add these environment variables:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/crowdfunding?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars
FRONTEND_URL=https://your-frontend-app.vercel.app
NODE_ENV=production
PORT=10000
```

**Important:** 
- Replace `<username>` and `<password>` with your MongoDB credentials
- Generate a strong JWT_SECRET (minimum 32 characters)
- Update FRONTEND_URL after deploying frontend

### Step 4: Deploy
1. Click **Create Web Service**
2. Wait for deployment (takes 2-5 minutes)
3. Note your backend URL: `https://crowdfunding-backend-xxxx.onrender.com`

---

## 🌐 Frontend Deployment (Vercel)

### Step 1: Create Vercel Account
1. Go to [Vercel](https://vercel.com/)
2. Sign up/Sign in with GitHub

### Step 2: Deploy Frontend
1. Click **Add New** → **Project**
2. Import repository: `kkishore07/crowd_funding_web`
3. Configure project:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### Step 3: Add Environment Variables
Add this environment variable:

```env
VITE_API_URL=https://crowdfunding-backend-xxxx.onrender.com
```

**Important:** Replace with your actual Render backend URL

### Step 4: Deploy
1. Click **Deploy**
2. Wait for deployment (takes 1-3 minutes)
3. Your app is live at: `https://your-app.vercel.app`

### Step 5: Update Backend FRONTEND_URL
1. Go back to Render dashboard
2. Update `FRONTEND_URL` environment variable with your Vercel URL
3. Redeploy backend service

---

## ✅ Post-Deployment Checklist

### 1. Test MongoDB Connection
- Check Render logs for "MongoDB connected" message
- If connection fails, verify:
  - MongoDB Atlas IP whitelist includes 0.0.0.0/0
  - Connection string is correct
  - Database user has read/write permissions

### 2. Test API Endpoints
Visit: `https://your-backend.onrender.com/api/auth/check`
- Should return a response (even if error, it confirms server is running)

### 3. Test Frontend
1. Open your Vercel URL
2. Try to register/login
3. Create a campaign (as creator)
4. Make a donation (as user)
5. Test admin features

### 4. Configure CORS
CORS is already configured to accept your frontend URL.
If you have issues:
1. Check `backend/server.js`
2. Ensure `FRONTEND_URL` is set correctly in Render

---

## 🔧 Environment Variables Reference

### Backend (.env - Render)
```env
# Database
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/crowdfunding

# Authentication
JWT_SECRET=your_secret_minimum_32_characters_long

# CORS
FRONTEND_URL=https://your-frontend.vercel.app

# Server
NODE_ENV=production
PORT=10000
```

### Frontend (.env - Vercel)
```env
# API URL
VITE_API_URL=https://your-backend.onrender.com
```

---

## 🐛 Troubleshooting

### Backend Issues

**Problem:** MongoDB connection fails
- **Solution:** Check MongoDB Atlas IP whitelist, verify connection string

**Problem:** JWT errors
- **Solution:** Ensure JWT_SECRET is set and minimum 32 characters

**Problem:** CORS errors
- **Solution:** Verify FRONTEND_URL matches your Vercel deployment URL

### Frontend Issues

**Problem:** API calls fail
- **Solution:** Verify VITE_API_URL is correct and includes https://

**Problem:** Build fails
- **Solution:** Check build logs in Vercel dashboard

**Problem:** Routes don't work
- **Solution:** Ensure `vercel.json` has proper rewrites configuration

---

## 📱 Monitoring

### Render (Backend)
- View logs: Render Dashboard → Your Service → Logs
- Monitor performance: Render Dashboard → Metrics

### Vercel (Frontend)
- View deployments: Vercel Dashboard → Project → Deployments
- Check analytics: Vercel Dashboard → Analytics

---

## 🔄 Continuous Deployment

Both Render and Vercel are configured for automatic deployments:
- **Any push to `main` branch** triggers automatic redeployment
- Check deployment status in respective dashboards

---

## 🔐 Security Recommendations

1. **Never commit `.env` files** to GitHub
2. **Use strong JWT_SECRET** (32+ characters, random)
3. **Rotate secrets** periodically
4. **Monitor suspicious activity** using the admin dashboard
5. **Keep dependencies updated** regularly

---

## 📞 Support

If you encounter issues:
1. Check deployment logs (Render/Vercel dashboards)
2. Verify all environment variables are set correctly
3. Test API endpoints individually
4. Check MongoDB Atlas connection status

---

## ✨ Features Deployed

Your deployed application includes:
- ✅ User authentication & authorization
- ✅ Campaign creation & management
- ✅ Donation processing with payment methods
- ✅ Fraud prevention system
- ✅ Refund management (mock)
- ✅ Campaign deadlines & expiry tracking
- ✅ Analytics dashboard
- ✅ Rating system
- ✅ Admin approval workflow

**All features are production-ready!** 🎉
