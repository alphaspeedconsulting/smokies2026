# Logistics Page Password Protection Setup

## ✅ What's Been Implemented

The Logistics page is now password-protected. Users must enter a password before accessing sensitive logistics information.

## 🔐 Setting Up the Password

### Step 1: Add Password to GitHub Secrets

1. Go to: https://github.com/alphaspeedconsulting/smokies2026/settings/secrets/actions
2. Click **"New repository secret"**
3. **Name:** `LOGISTICS_PASSWORD`
4. **Value:** Enter your desired password (e.g., `smokies2026` or whatever password you want to share with the group)
5. Click **"Add secret"**

### Step 2: Deploy the Changes

After adding the secret, trigger a new deployment:

1. Go to: https://github.com/alphaspeedconsulting/smokies2026/actions
2. Click **"Deploy to GitHub Pages"**
3. Click **"Run workflow"** → **"Run workflow"**
4. Wait 1-2 minutes for deployment

## 🔒 How It Works

1. **Password Prompt:** When users click "Logistics" in the navigation, they'll see a password prompt modal
2. **Authentication:** After entering the correct password, they can access the Logistics page
3. **Session Storage:** The authentication is stored in browser localStorage, so users won't need to re-enter the password during their session
4. **Security:** The password is stored securely in GitHub Secrets and injected during deployment

## 📝 Default Password (Fallback)

If `LOGISTICS_PASSWORD` is not set in GitHub Secrets, the system will use a default password: `smokies2026`

**Important:** Set your own password in GitHub Secrets for better security!

## 🔄 Changing the Password

1. Update the `LOGISTICS_PASSWORD` secret in GitHub Settings → Secrets
2. Re-run the deployment workflow
3. Users will need to enter the new password (their old authentication will be cleared)

## 🧪 Testing

1. Visit: https://alphaspeedconsulting.github.io/smokies2026/
2. Click "Logistics" in the sidebar
3. Enter the password you set in GitHub Secrets
4. You should now see the Logistics page content

## 🔓 Logging Out

To require password again (for testing or security):
1. Open browser DevTools (F12)
2. Go to Application → Local Storage
3. Delete the `logistics_authenticated` key
4. Refresh the page

## ⚠️ Security Notes

- This is **client-side password protection** - suitable for basic access control
- The password is visible in the deployed `env-config.js` file (but only to those who can access the site)
- For highly sensitive data, consider additional security measures
- The password is stored in GitHub Secrets and never committed to the repository
