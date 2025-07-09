# Vercel Auto-Deploy Setup

This guide explains how to set up automatic Vercel deployments when content changes in your Sanity Studio.

## 🚀 Custom Deploy Tool

A custom Vercel deploy tool has been created that's compatible with React 19 and your Sanity Studio setup.

## 📋 Setup Steps

### 1. Get Your Vercel Deploy Hook

1. Go to your Vercel dashboard
2. Select your Astro app project
3. Go to **Settings** > **Git**
4. Scroll down to **Deploy Hooks**
5. Click **Create Hook**
6. Name it "Sanity Content Update"
7. Select the branch (usually `main`)
8. Copy the generated webhook URL

### 2. Configure Environment Variables

1. In your studio folder, create `.env.local` from the example:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your deploy hook URL:
   ```env
   # Required: Your Vercel deploy hook URL
   SANITY_STUDIO_VERCEL_DEPLOY_HOOK=https://api.vercel.com/v1/integrations/deploy/prj_xxxxx/yyyy
   
   # Optional: Project ID (already filled in from example)
   SANITY_STUDIO_VERCEL_PROJECT_ID=prj_vFWrtekqNK4sR3eOM1q1J5l2WBl7
   
   # Optional: Team ID (only for team projects)
   SANITY_STUDIO_VERCEL_TEAM_ID=
   ```

### 3. Restart Your Studio

After adding the environment variables, restart your Sanity Studio:
```bash
npm run dev
```

## 🎯 How It Works

1. **Deploy Tab**: A "Deploy" tab appears in your Sanity Studio navigation
2. **Manual Trigger**: Click the "Deploy Now" button to trigger a deployment
3. **Real-time Feedback**: See success/error messages and deployment progress
4. **Content Updates**: Deploy whenever you make content changes

## 🔧 Usage

1. Open your Sanity Studio
2. Click on the "Deploy" tab in the navigation
3. Click "Deploy Now" to trigger a deployment
4. Monitor the deployment status in the interface
5. Your Astro app will be updated with the latest content

## ✅ Features

- **React 19 Compatible**: Built specifically for your React 19 setup
- **Real-time Feedback**: Shows success/error messages immediately
- **Environment Variable Integration**: Automatically uses your `.env.local` settings
- **Clean UI**: Matches Sanity Studio design patterns
- **Error Handling**: Provides clear error messages for troubleshooting

## 🚨 Troubleshooting

- **"Deploy hook not set" error**: Make sure `SANITY_STUDIO_VERCEL_DEPLOY_HOOK` is set in `.env.local`
- **Deploy button not appearing**: Restart your studio after adding environment variables
- **403/404 errors**: Verify your deploy hook URL is correct and active
- **Network errors**: Check your internet connection and Vercel service status

## 📝 Notes

- This creates a manual deploy button (not automatic on content change)
- For fully automatic deployments, you'd need to set up Sanity webhooks separately
- The deploy hook method is simple, reliable, and doesn't require API tokens
- Keep your `.env.local` file private and don't commit it to version control