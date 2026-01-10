# GitHub Pages Hosting Guide for Smokies 2026 Dashboard

This guide will walk you through hosting your Smokies 2026 dashboard on GitHub Pages for free.

## Prerequisites

- A GitHub account (free)
- Git installed on your local machine
- Your project files ready to deploy

## Step-by-Step Instructions

### Option 1: Create a New Repository (Recommended)

#### 1. Create a New GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository name: `smokies-2026` (or your preferred name)
4. Description: "Smokies 2026 Event Dashboard"
5. Set visibility: **Public** (required for free GitHub Pages)
6. **DO NOT** initialize with README, .gitignore, or license (we'll add files manually)
7. Click **"Create repository"**

#### 2. Initialize Git in Your Project Directory

```bash
cd /Users/miguelfranco/Development_agents/projects/dallas-drivers/smokies-2026

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Smokies 2026 dashboard"

# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/smokies-2026.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **"Save"**
6. Wait 1-2 minutes for GitHub to build your site
7. Your site will be available at: `https://YOUR_USERNAME.github.io/smokies-2026/`

**Important:** Your main HTML file must be named `index.html` for GitHub Pages to serve it automatically.

### Option 2: Use Existing Repository

If you already have a repository:

```bash
cd /Users/miguelfranco/Development_agents/projects/dallas-drivers/smokies-2026

# If not already a git repo
git init

# Add files
git add .

# Commit
git commit -m "Add Smokies 2026 dashboard"

# Add remote (if not already added)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push
git push -u origin main
```

Then follow Step 3 above to enable GitHub Pages.

## File Structure Requirements

Your repository should have this structure:

```
smokies-2026/
├── index-integrated.html  (rename to index.html)
├── images/
│   ├── IMG_0255.jpeg
│   ├── IMG_0898.jpeg
│   ├── IMG_1905.jpeg
│   ├── ... (all your images)
└── README.md (optional)
```

## Important: Rename Your HTML File

GitHub Pages looks for `index.html` in the root directory. You'll need to rename your file:

```bash
cd /Users/miguelfranco/Development_agents/projects/dallas-drivers/smokies-2026
mv index-integrated.html index.html
```

Or create a symbolic link:

```bash
ln -s index-integrated.html index.html
```

## Environment Variables Setup

### 1. Create .env File

Create a `.env` file in the project root:

```bash
AIRTABLE_PAT=your_personal_access_token_here
AIRTABLE_BASE_ID=your_base_id_here
```

### 2. Generate env-config.js

Before deploying, generate `env-config.js` from your `.env` file:

```bash
node generate-env-config.js
```

This creates `env-config.js` which contains your credentials in a format the browser can read.

**Important:** 
- ✅ Commit `env-config.js` to git (it will be public)
- ❌ **DO NOT** commit `.env` (add it to `.gitignore`)

## Security Considerations

### ⚠️ Airtable Credentials Warning

Your Airtable Personal Access Token (PAT) will be in `env-config.js`, which is committed to the repository. Since GitHub Pages repositories are public by default, **your PAT will be visible to anyone**.

### Recommended Solutions:

#### Option A: Use Environment Variables (Advanced)
- Use a build process that injects credentials at build time
- Store credentials in GitHub Secrets
- Use GitHub Actions to build and deploy

#### Option B: Use a Custom Domain with Private Repository
- Upgrade to GitHub Pro ($4/month) for private repos with Pages
- Or use a custom domain with authentication

#### Option C: Accept Public Credentials (Simplest)
- Since this is a read-only dashboard, the risk is lower
- You can rotate your PAT if it gets exposed
- Consider creating a PAT with only read permissions

#### Option D: Use Airtable Forms Instead
- Remove direct API access from the frontend
- Use Airtable's native forms for data entry
- Frontend only displays public data

## Updating Your Site

After making changes:

```bash
cd /Users/miguelfranco/Development_agents/projects/dallas-drivers/smokies-2026

# Stage changes
git add .

# Commit
git commit -m "Update dashboard: [describe changes]"

# Push to GitHub
git push
```

GitHub Pages will automatically rebuild your site (usually takes 1-2 minutes).

## Custom Domain (Optional)

To use a custom domain (e.g., `smokies2026.com`):

1. In your repository Settings → Pages
2. Under "Custom domain", enter your domain
3. Follow GitHub's DNS configuration instructions
4. Update your DNS records as instructed

## Troubleshooting

### Site Not Loading
- Check that `index.html` exists in the root directory
- Verify GitHub Pages is enabled in Settings → Pages
- Wait 2-3 minutes after enabling Pages
- Check the "Actions" tab for build errors

### Images Not Showing
- Ensure image paths are relative (e.g., `images/IMG_0898.jpeg`)
- Check that the `images/` folder is committed to git
- Verify file names match exactly (case-sensitive)

### Airtable API Errors
- Verify your PAT and Base ID are correct
- Check that your PAT has the correct scopes
- Ensure your PAT has access to the correct base
- Check browser console for CORS errors

## Quick Start Commands

```bash
# Navigate to project
cd /Users/miguelfranco/Development_agents/projects/dallas-drivers/smokies-2026

# Generate env-config.js from .env file
node generate-env-config.js

# Rename HTML file for GitHub Pages
mv index-integrated.html index.html

# Initialize git (if not already done)
git init

# Add files (excluding .env - it's in .gitignore)
git add .

# Commit
git commit -m "Initial commit: Smokies 2026 dashboard"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/smokies-2026.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Then enable GitHub Pages in repository Settings → Pages.

## Next Steps

1. ✅ Create GitHub repository
2. ✅ Rename `index-integrated.html` to `index.html`
3. ✅ Commit and push files
4. ✅ Enable GitHub Pages
5. ✅ Test your live site
6. ⚠️ Consider security implications of embedded credentials
7. 🎉 Share your dashboard URL!

Your site will be live at: `https://YOUR_USERNAME.github.io/smokies-2026/`
