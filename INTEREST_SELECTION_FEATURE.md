# Interest Selection Feature for CRM

## Overview
Added a multi-select "Interested In" field to the Contact form that allows visitors to select their interests:
- **Buying** - Looking to purchase a property
- **Selling** - Looking to sell a property  
- **Investing** - Interested in real estate investment

Multiple options can be selected, and they are saved as **tags** in the CRM database.

## Features

### User Experience
- Beautiful animated toggle buttons with green highlight when selected
- Hover and tap animations for better interactivity
- Visual feedback showing which options are selected
- Required field with helpful prompt if nothing is selected
- Mobile-responsive design

### Data Storage
The selected interests are stored in two places:

1. **Database (Supabase)**: 
   - Saved in the `leads` table in the `tags` column as a text array
   - Example: `['Buying', 'Investing']`

2. **Email Notification**:
   - Included in the FormSubmit email as a comma-separated list
   - Example: "Interested In: Buying, Investing"

## Database Migration

A new migration file has been created to update the leads table:
`superbase/migrations/20251210000000_add_tags_and_names_to_leads.sql`

### What it does:
1. Adds `firstName` column to store first name separately
2. Adds `lastName` column to store last name separately  
3. Adds `tags` column (text array) to store selected interests
4. Migrates any existing `name` data to firstName/lastName
5. Creates an index on the tags column for better search performance

### To apply the migration:

If you're using Supabase CLI locally:
```bash
supabase db push
```

Or manually in Supabase Dashboard:
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the migration SQL file contents
4. Run the query

## Code Changes

### Updated Files:
- `src/pages/Contact.tsx` - Added interest selection UI and logic

### Key Changes:
1. Added `interestedIn` array to form state
2. Created `handleInterestToggle` function to manage selections
3. Added animated button UI for selecting interests
4. Updated form submission to save tags to database
5. Updated email notification to include interests

## Usage in CRM

The tags can be used for:
- **Filtering leads** - Find all buyers, sellers, or investors
- **Segmentation** - Create targeted marketing campaigns
- **Analytics** - Track which interests are most common
- **Follow-up** - Prioritize leads based on their interests

### Example Supabase Query:
```typescript
// Get all leads interested in buying
const { data } = await supabase
  .from('leads')
  .select('*')
  .contains('tags', ['Buying'])

// Get leads interested in both buying and investing
const { data } = await supabase
  .from('leads')
  .select('*')
  .contains('tags', ['Buying', 'Investing'])
```

## Technical Details

- **Animation**: Uses Framer Motion for smooth button animations
- **Styling**: Consistent with existing design system (Teal #2A9D8F for active state)
- **Validation**: Shows helper text when no option is selected
- **Type Safety**: Properly typed with TypeScript
- **Backward Compatible**: Existing leads table data is preserved
