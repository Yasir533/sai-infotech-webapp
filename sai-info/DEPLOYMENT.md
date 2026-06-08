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
