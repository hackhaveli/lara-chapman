# Backend Migration Guide: CTA Buttons Structure Update

## Overview
This guide explains how to migrate the neighborhood CTA buttons from a simple string array to an object array with text and URL properties.

---

## Changes Required

### 1. **Database Schema Update** (Mongoose Model)

Update the `Neighborhood` model in your backend (likely in `server/models/Neighborhood.js` or similar):

#### **Before:**
```javascript
ctaButtons: [{
  type: String
}]
```

#### **After:**
```javascript
ctaButtons: [{
  text: {
    type: String,
    required: false
  },
  url: {
    type: String,
    required: false
  }
}]
```

---

## 2. **Data Migration Script**

Create a migration script to update existing neighborhood records in the database:

### **Migration Script** (`server/scripts/migrate-cta-buttons.js`):

```javascript
const mongoose = require('mongoose');
const Neighborhood = require('../models/Neighborhood');

async function migrateCTAButtons() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find all neighborhoods
    const neighborhoods = await Neighborhood.find({});
    console.log(`📦 Found ${neighborhoods.length} neighborhoods to migrate`);

    let migrated = 0;
    let skipped = 0;

    for (const neighborhood of neighborhoods) {
      // Check if ctaButtons need migration
      if (neighborhood.ctaButtons && neighborhood.ctaButtons.length > 0) {
        // Check if it's already in the new format
        if (typeof neighborhood.ctaButtons[0] === 'string') {
          // Old format - needs migration
          const newCtaButtons = neighborhood.ctaButtons.map(text => ({
            text: text,
            url: '' // You can set default URLs here if needed
          }));

          neighborhood.ctaButtons = newCtaButtons;
          await neighborhood.save();
          
          console.log(`✅ Migrated: ${neighborhood.name}`);
          migrated++;
        } else {
          console.log(`⏭️  Skipped (already migrated): ${neighborhood.name}`);
          skipped++;
        }
      } else {
        console.log(`⏭️  Skipped (no CTA buttons): ${neighborhood.name}`);
        skipped++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`   ✅ Migrated: ${migrated}`);
    console.log(`   ⏭️  Skipped: ${skipped}`);
    console.log(`   📦 Total: ${neighborhoods.length}`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run migration
migrateCTAButtons();
```

### **How to Run:**

```bash
cd server
node scripts/migrate-cta-buttons.js
```

---

## 3. **Backend API Controller Update**

Ensure your neighborhood controller properly handles the new structure. The current TypeScript types already support this, but verify your backend validation:

```javascript
// Example validation (using Joi or similar)
const neighborhoodSchema = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string(),
  shortDescription: Joi.string().required(),
  fullDescription: Joi.string().required(),
  // ... other fields
  ctaButtons: Joi.array().items(
    Joi.object({
      text: Joi.string().allow(''),
      url: Joi.string().allow('')
    })
  ),
  isActive: Joi.boolean()
});
```

---

## 4. **Testing the Migration**

After running the migration:

1. **Check the database** to verify the structure:
   ```javascript
   db.neighborhoods.findOne()
   ```

   Expected output:
   ```json
   {
     "ctaButtons": [
       { "text": "View Market Report", "url": "/reports/mesa" },
       { "text": "Search Homes", "url": "https://example.com/search" }
     ]
   }
   ```

2. **Test the API endpoint**:
   ```bash
   curl http://localhost:5000/api/neighborhoods
   ```

3. **Test the admin panel**: Create/edit a neighborhood and verify CTA buttons save correctly

4. **Test the frontend**: Visit a neighborhood detail page and verify buttons work

---

## 5. **Rollback Plan**

If you need to rollback (reverse migration):

```javascript
// Rollback script
const neighborhoods = await Neighborhood.find({});
for (const neighborhood of neighborhoods) {
  if (neighborhood.ctaButtons && typeof neighborhood.ctaButtons[0] === 'object') {
    // Convert back to strings
    neighborhood.ctaButtons = neighborhood.ctaButtons.map(btn => btn.text);
    await neighborhood.save();
  }
}
```

---

## 6. **Deployment Checklist**

- [ ] Update Mongoose model in backend
- [ ] Run migration script on development database
- [ ] Test API endpoints
- [ ] Test admin panel (create/edit)
- [ ] Test frontend display
- [ ] Run migration on staging database
- [ ] Test staging environment
- [ ] Create database backup before production migration
- [ ] Run migration on production database
- [ ] Deploy updated backend code
- [ ] Deploy updated frontend code
- [ ] Verify production site

---

## Notes

- The migration is **backward compatible** - the frontend can handle both old string arrays and new object arrays
- Empty URLs (`url: ''`) are acceptable and won't break the UI
- You can run the migration script multiple times safely (it checks the format before migrating)
- Consider adding a `createdAt` timestamp to track when migrations ran

---

## Example: Updating URLs After Migration

If you want to bulk update URLs after migration:

```javascript
await Neighborhood.updateMany(
  { 'ctaButtons.0.text': /Market Report/i },
  { $set: { 'ctaButtons.0.url': '/reports' } }
);
```

This will find all neighborhoods where the first CTA button text contains "Market Report" and set its URL to '/reports'.
