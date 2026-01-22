# Creating Shipping Logistics Table in Airtable

## ⚠️ Important: Airtable API Limitation

**The Airtable REST API does NOT support creating tables or modifying schema.** You must create the table manually in Airtable first, then use the setup script to populate it with data.

## 📋 Step-by-Step Instructions

### Step 1: Create the Table in Airtable

1. Go to your Airtable base: https://airtable.com/appQygVLH6YLcLRJM
2. Click **"Add a table"** or the **"+"** button
3. Name it: **`Shipping Logistics`**
4. Click **"Create table"**

### Step 2: Add Fields

Add these fields in order (click the **"+"** button to add fields):

| Field Name | Field Type | Options/Notes |
|------------|------------|---------------|
| **Section** | Single select | Options: `Dates`, `Costs`, `Contact`, `Payments` |
| **Title** | Single line text | |
| **Date** | Date | |
| **Time** | Single line text | |
| **Location** | Single line text | |
| **Address** | Long text | |
| **Phone** | Single line text | |
| **Description** | Long text | |
| **Cost Amount** | Number | Format: Currency (USD) |
| **Cost Label** | Single line text | e.g., "per trailer", "per car" |
| **Contact Name** | Single line text | |
| **Contact Phone** | Single line text | |
| **Order** | Number | For display ordering |
| **Active** | Checkbox | To show/hide entries |

### Step 3: Run the Setup Script

Once the table is created with all fields:

```bash
# Make sure you have Node.js installed
node setup-shipping-table.js
```

The script will:
- ✅ Check if the table exists
- ✅ Create all the shipping records with your data
- ✅ Organize them by section

### Step 4: Verify

1. Go back to Airtable
2. Check the "Shipping Logistics" table
3. You should see ~15 records organized by section

## 🔄 Alternative: Manual Entry

If you prefer to enter data manually:

1. Create the table and fields as above
2. Add records one by one using the data from the hardcoded HTML
3. Make sure to set the **Section** field correctly
4. Set **Order** numbers to control display order
5. Check **Active** for all entries you want to show

## 📝 Field Notes

- **Section**: Groups records (Dates, Costs, Contact, Payments)
- **Order**: Lower numbers appear first (1, 2, 3...)
- **Active**: Uncheck to hide an entry without deleting it
- **Cost Amount**: Use numbers only (5175, not $5,175)
- **Date**: Use YYYY-MM-DD format or Airtable's date picker

## ✅ After Setup

Once the table is created and populated:
1. I'll update the code to fetch from Airtable instead of hardcoded HTML
2. You can edit all shipping information directly in Airtable
3. Changes will appear on the website automatically
