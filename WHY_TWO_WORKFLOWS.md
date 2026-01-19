# Why Are There Two GitHub Actions Workflows?

## The Two Workflows

### 1. "Deploy to GitHub Pages" (Custom - ✅ USE THIS)
- **What it does:** Generates `env-config.js` from GitHub Secrets and deploys
- **Why we need it:** Your site needs Airtable credentials injected during build
- **Location:** `.github/workflows/deploy-pages.yml`

### 2. "pages build and deployment" (Automatic - ❌ IGNORE THIS)
- **What it does:** GitHub's automatic workflow that runs when using "Deploy from a branch"
- **Why it exists:** GitHub creates this automatically when branch-based deployment is enabled
- **Problem:** It doesn't generate `env-config.js`, so your data won't load

## Why You See Both

You're seeing both because:
1. Your custom workflow is running (good!)
2. **But** GitHub Pages source might still be set to "Deploy from a branch" (bad!)

When "Deploy from a branch" is enabled, GitHub automatically runs `pages-build-deployment` every time you push, even though it won't have your `env-config.js` file.

## The Solution

**You should ONLY use "GitHub Actions" as the source:**

1. Go to: https://github.com/alphaspeedconsulting/smokies2026/settings/pages
2. Under **"Source"**, make sure it says: **"GitHub Actions"** (NOT "Deploy from a branch")
3. Click **Save**

## After Fixing

Once you switch to "GitHub Actions" only:
- ✅ "Deploy to GitHub Pages" workflow will run (generates `env-config.js`)
- ❌ "pages build and deployment" will stop running (it only runs with branch deployment)
- ✅ Your site will have `env-config.js` with credentials
- ✅ Airtable data will load correctly

## Verify It's Working

After changing to "GitHub Actions":
1. Go to: https://github.com/alphaspeedconsulting/smokies2026/actions
2. You should see "Deploy to GitHub Pages" running
3. You should **NOT** see new "pages build and deployment" runs
4. Check: https://alphaspeedconsulting.github.io/smokies2026/env-config.js
   - Should return JavaScript with your credentials (not 404)

## Summary

- **One workflow is enough:** Use only "Deploy to GitHub Pages"
- **Turn off branch deployment:** Set Pages source to "GitHub Actions"
- **Ignore the other one:** "pages build and deployment" will stop once branch deployment is disabled
