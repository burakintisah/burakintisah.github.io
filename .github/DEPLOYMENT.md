# GitHub Actions Deployment Guide

This project uses GitHub Actions for automatic deployment to GitHub Pages.

## 🚀 How It Works

Every push to the `main` branch automatically triggers a deployment:

1. **Build**: Project is built with Vite
2. **Test** (optional): Run tests before deployment
3. **Deploy**: Artifacts uploaded to GitHub Pages

## 🔐 Required GitHub Secrets

You need to set up the following secrets in your repository:

**Navigate to**: `Settings` → `Secrets and variables` → `Actions` → `New repository secret`

### Firebase Configuration Secrets

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Where to Find These Values

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Project Settings** (⚙️ icon)
4. Scroll to **Your apps** section
5. Select your web app
6. Copy the config values

## ⚙️ GitHub Pages Settings

### Update Deployment Source

1. Go to repository **Settings** → **Pages**
2. Under **Build and deployment**:
   - **Source**: Change from `Deploy from a branch` to `GitHub Actions`
3. Save changes

### Custom Domain (Already Configured)

- Domain: `burakintisah.com`
- HTTPS: Enforced ✅
- DNS: Configured ✅

## 📝 Workflow File

Location: `.github/workflows/deploy.yml`

### Trigger Events

- **Push to main**: Automatic deployment
- **Manual**: Via GitHub Actions UI (workflow_dispatch)

### Jobs

1. **build**
   - Checkout code
   - Setup Node.js 18
   - Install dependencies (`npm ci`)
   - Build project (`npm run build`)
   - Upload build artifacts

2. **deploy**
   - Deploy artifacts to GitHub Pages
   - Update live site

## 🔄 Migration from gh-pages Branch

### Old Method (Manual)
```bash
npm run deploy  # Manually push to gh-pages branch
```

### New Method (Automatic)
```bash
git add .
git commit -m "Your changes"
git push origin main  # Automatically deploys!
```

## 🛠️ Local Development

Development workflow remains the same:

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build locally (optional)
npm run build

# Preview build
npm run preview
```

## 📊 Monitoring Deployments

1. Go to **Actions** tab in GitHub repository
2. See all deployment runs
3. View logs for each deployment
4. Debug if deployment fails

## ❌ Removing Old gh-pages Workflow

After GitHub Actions is set up, you can:

1. Remove `gh-pages` package from `package.json`:
   ```bash
   npm uninstall gh-pages
   ```

2. Remove deploy scripts from `package.json`:
   ```json
   // Remove these lines:
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

3. Delete local `gh-pages` branch:
   ```bash
   git branch -D gh-pages
   ```

## 🚨 Troubleshooting

### Deployment Fails

1. **Check Secrets**: Ensure all Firebase secrets are set correctly
2. **Check Logs**: View GitHub Actions logs for detailed errors
3. **Build Locally**: Test `npm run build` locally first

### Site Not Updating

1. **Clear Cache**: Hard refresh (Ctrl+Shift+R)
2. **Check Deployment**: Verify in Actions tab that deployment succeeded
3. **Wait**: GitHub Pages can take 2-5 minutes to update

### Permission Errors

Ensure the workflow has correct permissions:
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

**Last Updated**: January 31, 2026  
**Migration Status**: ✅ Ready for GitHub Actions
