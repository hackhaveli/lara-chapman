/*
  # Update leads table for enhanced CRM features
  
  1. Changes
    - Add firstName and lastName columns to leads table
    - Add tags array column to store interests (buying, selling, investing)
    - Keep backwards compatibility with existing name field
  
  2. Migration Strategy
    - Add new columns
    - Migrate existing 'name' data to firstName/lastName if needed
*/

-- Add new columns to leads table
ALTER TABLE leads 
  ADD COLUMN IF NOT EXISTS firstName text,
  ADD COLUMN IF NOT EXISTS lastName text,
  ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';

-- Update existing records - split name into firstName and lastName
-- This assumes the existing 'name' field has format "FirstName LastName"
UPDATE leads 
SET 
  firstName = SPLIT_PART(name, ' ', 1),
  lastName = CASE 
    WHEN SPLIT_PART(name, ' ', 2) != '' THEN SPLIT_PART(name, ' ', 2)
    ELSE SPLIT_PART(name, ' ', 1)  -- If no last name, use first name
  END
WHERE firstName IS NULL;

-- Create index on tags for better search performance
CREATE INDEX IF NOT EXISTS idx_leads_tags ON leads USING GIN(tags);

-- Add comment to document the tags column purpose
COMMENT ON COLUMN leads.tags IS 'Array of interest tags: Buying, Selling, Investing';
