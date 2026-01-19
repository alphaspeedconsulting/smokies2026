# GitHub Pages Deployment Fix

## The Problem

Your GitHub Pages site is showing a 404 error because:

1. **Workflow Location Issue**: The GitHub Actions workflow is in a nested directory (`projects/dallas-drivers/smokies-2026/.github/workflows/`), but GitHub only recognizes workflows at the repository root.

2. **Repository Structure Mismatch**: The URL `alphaspeedconsulting.github.io/smokies2026/` suggests you need a separate repository called `smokies2026`, but your project is nested inside `Development_agents`.

## Solution Options

### Option 1: Create Separate Repository (Recommended)

This matches your URL and is the cleanest solution:

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Repository name: `smokies2026`
   - Set to **Public** (required for free GitHub Pages)
   - **DO NOT** initialize with README

2. **Push your project to the new repository:**
   ```bash
   cd /Users/miguelfranco/Development_agents/projects/dallas-drivers/smokies-2026
   
   # Create a new git repository (or remove existing .git if needed)
   rm -rf .git
   git init
   
   # Add all files
   git add .
   
   # Commit
   git commit -m "Initial commit: Smokies 2026 dashboard"
   
   # Add the new remote
   git remote add origin https://github.com/alphaspeedconsulting/smokies2026.git
   
   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to https://github.com/alphaspeedconsulting/smokies2026/settings/pages
   - Under **Source**, select: **GitHub Actions**
   - Click **Save**

4. **Add GitHub Secrets:**
   - Go to https://github.com/alphaspeedconsulting/smokies2026/settings/secrets/actions
   - Add `AIRTABLE_PAT` with your Airtable token
   - Add `AIRTABLE_BASE_ID` with your Airtable base ID

5. **The workflow will automatically run** and deploy your site to:
   `https://alphaspeedconsulting.github.io/smokies2026/`

### Option 2: Use Nested Structure (Current Setup)

If you want to keep it in `Development_agents`, I've created a workflow at the repository root:

1. **The workflow is now at:** `.github/workflows/deploy-smokies-pages.yml` (in Development_agents root)

2. **Enable GitHub Pages for the parent repository:**
   - Go to https://github.com/alphaspeedconsulting/Development_agents/settings/pages
   - Under **Source**, select: **GitHub Actions**
   - Click **Save**

3. **Add GitHub Secrets to the parent repository:**
   - Go to https://github.com/alphaspeedconsulting/Development_agents/settings/secrets/actions
   - Add `AIRTABLE_PAT` and `AIRTABLE_BASE_ID`

4. **Note:** The site will be at `alphaspeedconsulting.github.io/Development_agents/` (not `smokies2026`)

## Verify the Fix

After setting up, check:

1. **GitHub Actions tab:** Go to your repository → Actions tab
   - You should see the "Deploy Smokies 2026 to GitHub Pages" workflow
   - It should complete successfully (green checkmark)

2. **GitHub Pages settings:** Settings → Pages
   - Should show "Your site is live at..." with a URL
   - Should show recent deployments

3. **Wait 1-2 minutes** after the workflow completes for DNS to propagate

## Troubleshooting

### Workflow Not Running
- Check that the workflow file is in `.github/workflows/` at the repository root
- Verify the workflow file is committed and pushed
- Check the Actions tab for any errors

### Still Getting 404
- Wait 2-3 minutes after deployment
- Clear browser cache
- Check the Actions tab for workflow errors
- Verify GitHub Pages is enabled (Settings → Pages → Source: GitHub Actions)

### Credentials Not Working
- Verify secrets are added in Settings → Secrets and variables → Actions
- Check workflow logs to see if secrets are being read (they won't be visible, but errors will show)
- Ensure secret names match exactly: `AIRTABLE_PAT` and `AIRTABLE_BASE_ID`
