# Smokies 2026 Event Dashboard

A beautiful, responsive dashboard for managing the Smokies 2026 car event, powered by Airtable.

## Features

- 📊 **Event Details** - Overview and registration
- 👥 **Attendees** - Manage participant list
- 🚗 **Logistics** - Vehicle tracking and management
- 🗺️ **Routes** - Driving route information
- 📅 **Schedule** - Event timeline
- 🏨 **Accommodations** - Lodging details
- 📸 **Photo Gallery** - Event photos with lightbox

## Setup

### For Local Development

1. **Create `.env` file** in the project root:
   ```bash
   AIRTABLE_PAT=your_personal_access_token_here
   AIRTABLE_BASE_ID=your_base_id_here
   ```

2. **Generate env-config.js**:
   ```bash
   node generate-env-config.js
   ```

3. **Open in browser** or use a local server:
   ```bash
   python3 -m http.server 8000
   ```

### For GitHub Pages Deployment

**See [SECRETS_SETUP.md](./SECRETS_SETUP.md) for complete instructions.**

Quick steps:
1. Add secrets to GitHub: `AIRTABLE_PAT` and `AIRTABLE_BASE_ID`
2. Enable GitHub Pages (Settings → Pages → Source: GitHub Actions)
3. Push to `main` branch - deployment happens automatically!

**Important:** Credentials are stored securely in GitHub Secrets and never committed to the repository.

### 3. Local Development

Simply open `index-integrated.html` in a web browser, or use a local server:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server -p 8000
```

Then visit `http://localhost:8000/index-integrated.html`

## Deployment

### GitHub Pages (Secure)

**See [SECRETS_SETUP.md](./SECRETS_SETUP.md) for complete setup instructions.**

The repository uses GitHub Actions to securely deploy:
- ✅ Credentials stored in GitHub Secrets (never in code)
- ✅ Automatically generates `env-config.js` during deployment
- ✅ Deploys on every push to `main` branch
- ✅ No credentials exposed in repository

**Quick Setup:**
1. Add secrets: `AIRTABLE_PAT` and `AIRTABLE_BASE_ID` in repository Settings
2. Enable GitHub Pages: Settings → Pages → Source: GitHub Actions
3. Push to `main` - deployment happens automatically!

Your site will be live at: `https://alphaspeedconsulting.github.io/smokies2026/`

## File Structure

```
smokies-2026/
├── index-integrated.html    # Main dashboard file
├── env-config.js            # Generated from .env (DO NOT EDIT)
├── generate-env-config.js   # Script to generate env-config.js
├── .env                     # Your credentials (DO NOT COMMIT)
├── .gitignore              # Git ignore rules
├── images/                 # Event photos
│   ├── IMG_0255.jpeg
│   ├── IMG_0898.jpeg
│   └── ...
└── README.md               # This file
```

## Development Workflow

1. Make changes to `index-integrated.html`
2. Update `.env` if credentials change
3. Run `node generate-env-config.js` to regenerate `env-config.js`
4. Test locally
5. Commit changes (excluding `.env`)
6. Push to GitHub

## Troubleshooting

### Credentials Not Loading
- Ensure `.env` file exists with correct format
- Run `node generate-env-config.js` to regenerate `env-config.js`
- Check browser console for errors
- Verify `env-config.js` is loaded (check Network tab)

### Images Not Showing
- Verify image paths are relative (e.g., `images/IMG_0898.jpeg`)
- Check file names match exactly (case-sensitive)
- Ensure images directory is committed to git

### Airtable API Errors
- Verify PAT has correct scopes (read, write, schema)
- Check PAT has access to the correct base
- Ensure Base ID is correct
- Check browser console for CORS errors

## License

Private project for Smokies 2026 event.
