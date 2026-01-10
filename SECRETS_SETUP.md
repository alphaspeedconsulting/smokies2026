# GitHub Secrets Setup Guide

This guide explains how to set up GitHub Secrets for secure deployment of the Smokies 2026 dashboard.

## Why GitHub Secrets?

Instead of committing credentials directly to the repository (which would expose them publicly), we use GitHub Secrets to securely store sensitive information. GitHub Actions then injects these secrets during the build process.

## Step-by-Step Setup

### 1. Add Secrets to GitHub Repository

1. Go to your repository: `https://github.com/alphaspeedconsulting/smokies2026`
2. Click **Settings** (top menu)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**

#### Add First Secret: AIRTABLE_PAT
- **Name:** `AIRTABLE_PAT`
- **Value:** Your Airtable Personal Access Token
  - Example format: `patXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
  - Get your token from: https://airtable.com/create/tokens
- Click **Add secret**

#### Add Second Secret: AIRTABLE_BASE_ID
- Click **New repository secret** again
- **Name:** `AIRTABLE_BASE_ID`
- **Value:** Your Airtable Base ID
  - Example format: `appXXXXXXXXXXXXXX`
  - Find it in your Airtable base URL or API documentation
- Click **Add secret**

### 2. Enable GitHub Pages

1. Still in **Settings**, click **Pages** in the left sidebar
2. Under **Source**, select:
   - **Source:** `GitHub Actions`
3. Click **Save**

**Note:** The workflow will automatically deploy when you push to the `main` branch.

### 3. Verify Deployment

1. Go to the **Actions** tab in your repository
2. You should see the "Deploy to GitHub Pages" workflow running
3. Wait for it to complete (usually 1-2 minutes)
4. Once complete, your site will be live at:
   `https://alphaspeedconsulting.github.io/smokies2026/`

## How It Works

1. **You push code** to the `main` branch
2. **GitHub Actions triggers** the workflow
3. **Workflow reads secrets** from GitHub Secrets (never exposed in logs)
4. **Workflow generates** `env-config.js` with the secrets
5. **Workflow deploys** to GitHub Pages
6. **Your site is live** with credentials injected securely

## Security Benefits

✅ **Secrets never committed** to repository  
✅ **Secrets never exposed** in code or logs  
✅ **Secrets only available** during build process  
✅ **Can rotate secrets** without changing code  
✅ **Different secrets** for different environments (if needed)

## Troubleshooting

### Workflow Not Running
- Check that you've pushed to the `main` branch
- Verify the workflow file exists at `.github/workflows/deploy-pages.yml`
- Check the **Actions** tab for any errors

### Secrets Not Found
- Verify secrets are named exactly: `AIRTABLE_PAT` and `AIRTABLE_BASE_ID`
- Check that secrets are added under **Secrets and variables** → **Actions**
- Ensure secrets are repository secrets (not environment secrets)

### Site Not Loading
- Check the **Actions** tab for workflow completion
- Verify GitHub Pages is enabled and set to **GitHub Actions**
- Wait 1-2 minutes after workflow completes
- Check the workflow logs for any errors

### Credentials Not Working
- Verify your PAT has correct scopes (read, write, schema)
- Check that your PAT has access to the correct base
- Ensure Base ID matches your Airtable base
- Check browser console for API errors

## Manual Deployment

You can also trigger the workflow manually:

1. Go to **Actions** tab
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**
4. Select branch: `main`
5. Click **Run workflow**

## Updating Secrets

To update your secrets:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click on the secret you want to update
3. Click **Update**
4. Enter the new value
5. Click **Update secret**
6. Push a new commit or manually trigger the workflow

The new secret will be used in the next deployment.

## Local Development

For local development, you still use the `.env` file:

1. Create `.env` file with your credentials
2. Run `node generate-env-config.js` to generate `env-config.js`
3. Open `index.html` in your browser

**Important:** Never commit `.env` or `env-config.js` to git - they're in `.gitignore`.
