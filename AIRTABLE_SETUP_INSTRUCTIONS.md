# Airtable Configuration Instructions

## To Load Data from Your Airtable Base

### Step 1: Get Your Personal Access Token
1. Go to https://airtable.com/create/tokens
2. Create a new Personal Access Token
3. Make sure it has these scopes:
   - `data.records:read` (read records)
   - `data.records:write` (write records)
   - `schema.bases:read` (read schema)

4. Add access to your **"Smokies 2026"** base (appQygVLH6YLcLRJM)

### Step 2: Configure the Dashboard
1. Open the dashboard: `http://localhost:8000/index-integrated.html`
2. Click the **⚙️ gear button** in the bottom-right corner
3. In the **"Airtable Configuration"** modal:
   - **Personal Access Token**: Paste your token from Step 1
   - **Base ID**: `appQygVLH6YLcLRJM`
4. Click **"Save & Load Data"**

### Step 3: Verify Data is Loading
- The dashboard will automatically fetch and display data from:
  - **Attendees** table
  - **Vehicles** table (displayed in Logistics)
  - **Routes** table
  - **Schedule** table
  - **Accommodations** table

## What Gets Displayed

Once configured, the dashboard displays:
- ✅ All records from each table
- ✅ Linked records (e.g., vehicle owner names, not IDs)
- ✅ Search/filter functionality
- ✅ Registration form (public form in modal)

## Registration Form

Users can register by:
1. Clicking the **"Register Now"** button on the Event Details page
2. Filling out the registration form
3. Submitting - this creates a new record in the **Attendees** table with status "Pending"

## Troubleshooting

If data doesn't load:
1. **Check browser console** (F12) for error messages
2. Ensure your Personal Access Token has:
   - Correct scopes (read/write/schema)
   - Access to the Smokies 2026 base
3. Verify Base ID is correct: `appQygVLH6YLcLRJM`
4. Try clearing localStorage and starting fresh

To clear localStorage:
```javascript
// Open browser console (F12) and run:
localStorage.removeItem('airtable_token');
localStorage.removeItem('base_id');
```

## API Configuration Saved

Your credentials are saved in browser localStorage, so you only need to configure once. They'll persist on subsequent visits.
