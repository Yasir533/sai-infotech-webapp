# Deployment Guide

## Backend (Render)
- Create a new Web Service from the `backend` folder.
- Set the build command to `npm install`.
- Set the start command to `npm start`.
- Add these environment variables:
  - `MONGO_URI`
  - `EMAIL_USER`
  - `EMAIL_PASS`
  - `ADMIN_EMAIL`
  - `ADMIN_JWT_SECRET`
  - `ADMIN_RESET_JWT_SECRET`
- **Persistent Storage (Crucial)**:
  - To prevent uploaded product images from getting deleted when Render restarts or redeploys, add a **Persistent Disk**:
    - Go to the **Disks** section of your Web Service in the Render Dashboard.
    - Click **Add Disk**.
    - **Name**: `uploads`
    - **Mount Path**: `/opt/render/project/src/uploads`
    - **Size**: `1 GiB` (or more)

## Frontend (Vercel)
- Create a new project from the repo root.
- Set the framework to Vite/React.
- Build command: `npm run build`
- Output directory: `dist`
- Add environment variable:
  - `VITE_API_BASE=https://your-render-backend-url`

## Important
- Do not use `localhost` in production.
- Use a public MongoDB Atlas connection string.
- Update the frontend after changing `VITE_API_BASE`.
