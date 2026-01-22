#!/usr/bin/env node

/**
 * Setup script for Shipping Logistics Airtable table
 * 
 * This script will:
 * 1. Check if the table exists
 * 2. Create sample records with your shipping information
 * 
 * Usage:
 *   node setup-shipping-table.js
 * 
 * Requires:
 *   - .env file with AIRTABLE_PAT and AIRTABLE_BASE_ID
 *   - Table "Shipping Logistics" must be created manually in Airtable first
 */

const fs = require('fs');
const path = require('path');

// Read .env file (same approach as generate-env-config.js)
const envPath = path.join(__dirname, '.env');
let AIRTABLE_PAT, BASE_ID;

if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        line = line.trim();
        if (!line || line.startsWith('#')) return;
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            const key = match[1].trim();
            let value = match[2].trim();
            if ((value.startsWith('"') && value.endsWith('"')) || 
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            if (key === 'AIRTABLE_PAT') AIRTABLE_PAT = value;
            if (key === 'AIRTABLE_BASE_ID') BASE_ID = value;
        }
    });
}
const TABLE_NAME = 'Shipping Logistics';

if (!AIRTABLE_PAT || !BASE_ID) {
    console.error('❌ Error: AIRTABLE_PAT and AIRTABLE_BASE_ID must be set in .env file');
    process.exit(1);
}

const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`;

// Sample shipping data to populate
const shippingRecords = [
    // Dates & Locations
    {
        fields: {
            'Section': 'Dates',
            'Title': 'Pickup at RAC',
            'Date': '2026-04-16',
            'Time': '8:00 AM',
            'Location': 'RAC',
            'Order': 1,
            'Active': true
        }
    },
    {
        fields: {
            'Section': 'Dates',
            'Title': 'Dropoff at EAG',
            'Date': '2026-04-18',
            'Location': 'European Auto Garage',
            'Address': '1229 Lovell Rd, Knoxville, TN 37932',
            'Phone': '(865) 862-5270',
            'Description': 'EAG is a full-service center and also has a storage facility.',
            'Order': 2,
            'Active': true
        }
    },
    {
        fields: {
            'Section': 'Dates',
            'Title': 'Pickup from EAG and Return to RAC',
            'Date': '2026-04-27',
            'Description': 'Shipping cars will be picked up at EAG and dropped off back at RAC by April 29th',
            'Order': 3,
            'Active': true
        }
    },
    // Costs
    {
        fields: {
            'Section': 'Costs',
            'Title': 'Shipping TO Event (Dallas → Knoxville)',
            'Description': 'Currently: 5 cars = $1,035 per car. If we get a 6th car (trailer can hold 6), the rate lowers for everyone.',
            'Cost Amount': 5175,
            'Cost Label': 'per trailer (5 cars per trailer)',
            'Order': 1,
            'Active': true
        }
    },
    {
        fields: {
            'Section': 'Costs',
            'Title': 'Shipping FROM Event (Knoxville → Dallas)',
            'Description': 'Currently: 8 cars = $1,293.75 per car. Can bring up to 12 cars back - more cars lowers the cost for all.',
            'Cost Amount': 10350,
            'Cost Label': 'total (2 trailers needed)',
            'Order': 2,
            'Active': true
        }
    },
    {
        fields: {
            'Section': 'Costs',
            'Title': 'EAG Storage & Handling',
            'Description': 'Brian Johns will pay for this. You can Venmo him.',
            'Cost Amount': 100,
            'Cost Label': 'per car (regardless of one-way or both-way shipping)',
            'Order': 3,
            'Active': true
        }
    },
    // Contact Info
    {
        fields: {
            'Section': 'Contact',
            'Title': 'Reliable Carriers - Kevin',
            'Description': 'Everyone shipping a car must call Kevin @ Reliable and pay your share',
            'Contact Name': 'Kevin @ Reliable',
            'Contact Phone': '(312) 800-5457',
            'Order': 1,
            'Active': true
        }
    },
    // Payment Breakdown
    {
        fields: {
            'Section': 'Payments',
            'Title': 'Miguel Franco',
            'Cost Amount': 2328.75,
            'Cost Label': 'total',
            'Order': 1,
            'Active': true
        }
    },
    {
        fields: {
            'Section': 'Payments',
            'Title': 'Brian Johns',
            'Cost Amount': 2328.75,
            'Cost Label': 'total',
            'Order': 2,
            'Active': true
        }
    },
    {
        fields: {
            'Section': 'Payments',
            'Title': 'Michael Cheng',
            'Cost Amount': 1293.75,
            'Cost Label': 'total',
            'Order': 3,
            'Active': true
        }
    },
    {
        fields: {
            'Section': 'Payments',
            'Title': 'Jimmy Lertdilok',
            'Cost Amount': 1293.75,
            'Cost Label': 'total',
            'Order': 4,
            'Active': true
        }
    },
    {
        fields: {
            'Section': 'Payments',
            'Title': 'Allan Wu',
            'Cost Amount': 2328.75,
            'Cost Label': 'total',
            'Order': 5,
            'Active': true
        }
    },
    {
        fields: {
            'Section': 'Payments',
            'Title': 'Troy Tharp',
            'Cost Amount': 2328.75,
            'Cost Label': 'total',
            'Order': 6,
            'Active': true
        }
    },
    {
        fields: {
            'Section': 'Payments',
            'Title': 'Wali Khan',
            'Cost Amount': 2328.75,
            'Cost Label': 'total',
            'Order': 7,
            'Active': true
        }
    },
    {
        fields: {
            'Section': 'Payments',
            'Title': 'Zacharia Bailey',
            'Cost Amount': 1293.75,
            'Cost Label': 'total',
            'Order': 8,
            'Active': true
        }
    }
];

async function checkTableExists() {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_PAT}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            return true;
        } else if (response.status === 404) {
            return false;
        } else {
            const error = await response.json();
            throw new Error(`API Error: ${JSON.stringify(error)}`);
        }
    } catch (error) {
        console.error('Error checking table:', error.message);
        return false;
    }
}

async function createRecords() {
    console.log(`\n📝 Creating ${shippingRecords.length} records in "${TABLE_NAME}" table...\n`);

    // Airtable API allows up to 10 records per request
    const batchSize = 10;
    let created = 0;
    let errors = 0;

    for (let i = 0; i < shippingRecords.length; i += batchSize) {
        const batch = shippingRecords.slice(i, i + batchSize);
        
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${AIRTABLE_PAT}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    records: batch
                })
            });

            if (!response.ok) {
                const error = await response.json();
                console.error(`❌ Error creating batch ${Math.floor(i / batchSize) + 1}:`, error);
                errors += batch.length;
                continue;
            }

            const result = await response.json();
            created += result.records.length;
            console.log(`✅ Created ${result.records.length} records (${created}/${shippingRecords.length} total)`);
        } catch (error) {
            console.error(`❌ Error creating batch:`, error.message);
            errors += batch.length;
        }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   ✅ Created: ${created} records`);
    if (errors > 0) {
        console.log(`   ❌ Errors: ${errors} records`);
    }
}

async function main() {
    console.log('🚀 Shipping Logistics Table Setup\n');
    console.log(`Base ID: ${BASE_ID}`);
    console.log(`Table: ${TABLE_NAME}\n`);

    // Check if table exists
    console.log('🔍 Checking if table exists...');
    const exists = await checkTableExists();

    if (!exists) {
        console.log('\n❌ Table does not exist!');
        console.log('\n📋 Please create the table manually in Airtable first:');
        console.log('   1. Go to your Airtable base');
        console.log('   2. Create a new table named "Shipping Logistics"');
        console.log('   3. Add the fields as specified in AIRTABLE_SHIPPING_TABLE_SETUP.md');
        console.log('   4. Run this script again\n');
        process.exit(1);
    }

    console.log('✅ Table exists!\n');

    // Ask for confirmation
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question('⚠️  This will create records in the table. Continue? (y/n): ', async (answer) => {
        readline.close();
        
        if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
            console.log('Cancelled.');
            process.exit(0);
        }

        await createRecords();
        console.log('\n✅ Setup complete!');
    });
}

// Check if fetch is available (Node 18+)
if (typeof fetch === 'undefined') {
    console.error('❌ Error: This script requires Node.js 18+ (for native fetch support)');
    console.error('   Or install node-fetch: npm install node-fetch');
    process.exit(1);
}

main().catch(console.error);
