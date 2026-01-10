# Quick Setup Guide

## Step 1: Get Your Airtable Credentials

### Create Personal Access Token

1. Go to https://airtable.com/create/tokens
2. Click **"Create new token"**
3. Name: `Smokies 2026 Dashboard`
4. Scopes: Select `data.records:read`
5. Access: Add your specific base
6. Click **"Create token"**
7. **Copy the token** (starts with `pat...`) - you won't see it again!

### Get Your Base ID

1. Open your Airtable base
2. Look at the URL: `https://airtable.com/appAbc123xyz456/...`
3. Copy the part starting with `app` (e.g., `appAbc123xyz456`)

## Step 2: Configure the Dashboard

### Option A: User-Entered Credentials (Recommended for shared hosting)

1. Open `index.html` in a browser
2. Click the ⚙️ settings button (bottom right corner)
3. Enter your **Personal Access Token**
4. Enter your **Base ID**
5. Click **"Save & Load Data"**

✅ Credentials are stored in browser localStorage
✅ Each user can use their own credentials
✅ No credentials exposed in code

### Option B: Pre-configured (For single-user deployment)

1. Create a file named `.env.local` (copy from `.env.example`)
2. Add your credentials:
   ```
   AIRTABLE_PERSONAL_ACCESS_TOKEN=pat...your-token...
   AIRTABLE_BASE_ID=app...your-base-id...
   ```
3. Modify `index.html` to auto-load these values (see below)

**Note:** This requires modifying the JavaScript to read from environment variables or hardcoding them (not recommended for public repos).

## Step 3: Verify Your Airtable Tables

Make sure your Airtable base has these three tables with the correct field names:

### Table: `Attendees`
- `Attendee Name` (Single line text)
- `Car Details` (Single line text)

### Table: `Vehicles`
- `Car Details` (Single line text)
- `Attendees` (Single line text or Link to Attendees table)
- `Transport Method` (Single select)
- `Arrival Method` (Single select)

### Table: `Schedule`
- `Date` (Single line text or Date field)
- `Time` (Single line text)
- `Event` (Single line text)
- `Description` (Long text)

## Step 4: Test Locally

1. Open `index.html` in your browser (double-click the file)
2. Enter credentials in the settings panel
3. Check that data loads in all 4 sections:
   - ✅ Event Details (stats should show attendee/vehicle count)
   - ✅ Attendees (list should populate)
   - ✅ Logistics (vehicles should show)
   - ✅ Schedule (events should appear)

## Step 5: Deploy (Choose One)

### GitHub Pages (Recommended)
```bash
# Push to GitHub
git add smokies-2026/
git commit -m "Add Smokies 2026 event dashboard"
git push origin main

# Enable GitHub Pages
# Go to: Settings → Pages → Source: main → Folder: /smokies-2026 → Save
# Your site will be at: https://[username].github.io/[repo]/smokies-2026/
```

### Netlify (Easiest)
1. Go to https://app.netlify.com/drop
2. Drag the `smokies-2026` folder
3. Done! Site is live instantly

### Cloudflare Pages (Unlimited Bandwidth)
1. Go to https://dash.cloudflare.com/
2. Pages → Create a project
3. Connect to GitHub or upload folder
4. Deploy

## Troubleshooting

### "Error loading attendees/vehicles/schedule"

**Check:**
- ✅ Token has correct scopes (`data.records:read`)
- ✅ Token has access to your specific base
- ✅ Base ID is correct (starts with `app`)
- ✅ Table names match exactly (case-sensitive)

**Test your credentials:**
```bash
# Replace with your actual values
curl "https://api.airtable.com/v0/YOUR_BASE_ID/Attendees" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### "No attendees found"

**Check:**
- ✅ Table is named exactly `Attendees` (case-sensitive)
- ✅ Table has data
- ✅ Field names match:
  - `Attendee Name`
  - `Car Details`

### Data not updating

1. Open browser DevTools (F12)
2. Go to Application → Local Storage
3. Delete `airtable_token` and `base_id`
4. Reload page and re-enter credentials

## Security Notes

⚠️ **For Public Deployment:**
- Create a **read-only** token (only `data.records:read` scope)
- Users enter their own credentials
- Credentials stored in browser localStorage only

⚠️ **Never:**
- Hardcode credentials in `index.html` for public repos
- Commit `.env` or `.env.local` files
- Share your Personal Access Token publicly

## Customization

### Change Table Names

Edit `index.html` line ~709:
```javascript
const TABLES = {
    ATTENDEES: 'Your_Table_Name',
    VEHICLES: 'Your_Vehicles_Table',
    SCHEDULE: 'Your_Schedule_Table'
};
```

### Change Colors

Edit CSS variables in `index.html` lines 10-25:
```css
:root {
    --teal: #14b8a6;        /* Change to your brand color */
    --teal-dark: #0d9488;
}
```

---

**Need Help?** Check the full README.md for detailed hosting options and troubleshooting.
