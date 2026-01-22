# Airtable AI Chat Prompt - Create Shipping Logistics Table

Copy and paste this prompt into Airtable's AI chat interface:

---

## Prompt to Copy:

```
Create a new table called "Shipping Logistics" with the following fields in this exact order:

1. Section - Single select field with options: "Dates", "Costs", "Contact", "Payments"
2. Title - Single line text field
3. Date - Date field
4. Time - Single line text field
5. Location - Single line text field
6. Address - Long text field
7. Phone - Single line text field
8. Description - Long text field
9. Cost Amount - Number field, format as Currency (USD)
10. Cost Label - Single line text field
11. Contact Name - Single line text field
12. Contact Phone - Single line text field
13. Order - Number field (for display ordering)
14. Active - Checkbox field (default checked)

After creating the table, add these sample records:

Record 1 (Dates section):
- Section: Dates
- Title: Pickup at RAC
- Date: April 16, 2026
- Time: 8:00 AM
- Location: RAC
- Order: 1
- Active: checked

Record 2 (Dates section):
- Section: Dates
- Title: Dropoff at EAG
- Date: April 18, 2026
- Location: European Auto Garage
- Address: 1229 Lovell Rd, Knoxville, TN 37932
- Phone: (865) 862-5270
- Description: EAG is a full-service center and also has a storage facility.
- Order: 2
- Active: checked

Record 3 (Dates section):
- Section: Dates
- Title: Pickup from EAG and Return to RAC
- Date: April 27, 2026
- Description: Shipping cars will be picked up at EAG and dropped off back at RAC by April 29th
- Order: 3
- Active: checked

Record 4 (Costs section):
- Section: Costs
- Title: Shipping TO Event (Dallas → Knoxville)
- Description: Currently: 5 cars = $1,035 per car. If we get a 6th car (trailer can hold 6), the rate lowers for everyone.
- Cost Amount: 5175
- Cost Label: per trailer (5 cars per trailer)
- Order: 1
- Active: checked

Record 5 (Costs section):
- Section: Costs
- Title: Shipping FROM Event (Knoxville → Dallas)
- Description: Currently: 8 cars = $1,293.75 per car. Can bring up to 12 cars back - more cars lowers the cost for all.
- Cost Amount: 10350
- Cost Label: total (2 trailers needed)
- Order: 2
- Active: checked

Record 6 (Costs section):
- Section: Costs
- Title: EAG Storage & Handling
- Description: Brian Johns will pay for this. You can Venmo him.
- Cost Amount: 100
- Cost Label: per car (regardless of one-way or both-way shipping)
- Order: 3
- Active: checked

Record 7 (Contact section):
- Section: Contact
- Title: Reliable Carriers - Kevin
- Description: Everyone shipping a car must call Kevin @ Reliable and pay your share
- Contact Name: Kevin @ Reliable
- Contact Phone: (312) 800-5457
- Order: 1
- Active: checked

Record 8 (Payments section):
- Section: Payments
- Title: Miguel Franco
- Cost Amount: 2328.75
- Cost Label: total
- Order: 1
- Active: checked

Record 9 (Payments section):
- Section: Payments
- Title: Brian Johns
- Cost Amount: 2328.75
- Cost Label: total
- Order: 2
- Active: checked

Record 10 (Payments section):
- Section: Payments
- Title: Michael Cheng
- Cost Amount: 1293.75
- Cost Label: total
- Order: 3
- Active: checked

Record 11 (Payments section):
- Section: Payments
- Title: Jimmy Lertdilok
- Cost Amount: 1293.75
- Cost Label: total
- Order: 4
- Active: checked

Record 12 (Payments section):
- Section: Payments
- Title: Allan Wu
- Cost Amount: 2328.75
- Cost Label: total
- Order: 5
- Active: checked

Record 13 (Payments section):
- Section: Payments
- Title: Troy Tharp
- Cost Amount: 2328.75
- Cost Label: total
- Order: 6
- Active: checked

Record 14 (Payments section):
- Section: Payments
- Title: Wali Khan
- Cost Amount: 2328.75
- Cost Label: total
- Order: 7
- Active: checked

Record 15 (Payments section):
- Section: Payments
- Title: Zacharia Bailey
- Cost Amount: 1293.75
- Cost Label: total
- Order: 8
- Active: checked
```

---

## Alternative Shorter Prompt (if the above is too long):

If Airtable's AI has character limits, try this shorter version:

```
Create a new table called "Shipping Logistics" with these fields:
1. Section (Single select: Dates, Costs, Contact, Payments)
2. Title (Single line text)
3. Date (Date field)
4. Time (Single line text)
5. Location (Single line text)
6. Address (Long text)
7. Phone (Single line text)
8. Description (Long text)
9. Cost Amount (Number, Currency USD)
10. Cost Label (Single line text)
11. Contact Name (Single line text)
12. Contact Phone (Single line text)
13. Order (Number)
14. Active (Checkbox)

This table will store shipping logistics information for a car event, organized by sections: dates/locations, costs, contact info, and payment breakdowns.
```

Then manually add the records, or ask the AI in a follow-up message to add sample records.

---

## How to Use:

1. Open your Airtable base
2. Look for the AI chat/assistant feature (usually in the top right or as a button)
3. Paste the prompt above
4. Review what Airtable creates
5. Verify all fields and records are correct
6. Run the setup script to verify: `node setup-shipping-table.js`

---

## Tips:

- If the AI doesn't create all records, you can ask it to add the remaining ones
- You can also manually add records using the data from the prompt
- Make sure the "Section" field has exactly these options: "Dates", "Costs", "Contact", "Payments"
- Verify the "Cost Amount" field is formatted as Currency (USD)
