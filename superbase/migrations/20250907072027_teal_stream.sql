/*
  # Real Estate Website Database Schema

  1. New Tables
    - `users` - User profiles and authentication data
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `phone` (text, nullable)
      - `created_at` (timestamp)
    
    - `leads` - Contact form submissions and lead capture
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text, nullable)
      - `message` (text, nullable)
      - `created_at` (timestamp)
    
    - `neighborhoods` - Neighborhood information and details
      - `id` (uuid, primary key)
      - `slug` (text, unique)
      - `title` (text)
      - `description` (text)
      - `video_url` (text, nullable)
      - `highlights` (text array, nullable)
      - `quick_facts` (jsonb, nullable)
      - `created_at` (timestamp)
    
    - `resources` - Downloadable resources and guides
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `file_url` (text)
      - `created_at` (timestamp)
    
    - `testimonials` - Client testimonials and reviews
      - `id` (uuid, primary key)
      - `name` (text)
      - `quote` (text)
      - `photo_url` (text, nullable)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access where appropriate
    - Add policies for authenticated users where needed
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  created_at timestamptz DEFAULT now()
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text,
  created_at timestamptz DEFAULT now()
);

-- Create neighborhoods table
CREATE TABLE IF NOT EXISTS neighborhoods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  video_url text,
  highlights text[],
  quick_facts jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create resources table
CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  file_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  quote text NOT NULL,
  photo_url text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE neighborhoods ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create policies for leads table (allow public insert for contact forms)
CREATE POLICY "Anyone can insert leads"
  ON leads
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for neighborhoods table (public read access)
CREATE POLICY "Anyone can read neighborhoods"
  ON neighborhoods
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage neighborhoods"
  ON neighborhoods
  FOR ALL
  TO authenticated
  USING (true);

-- Create policies for resources table (public read access)
CREATE POLICY "Anyone can read resources"
  ON resources
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage resources"
  ON resources
  FOR ALL
  TO authenticated
  USING (true);

-- Create policies for testimonials table (public read access)
CREATE POLICY "Anyone can read testimonials"
  ON testimonials
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage testimonials"
  ON testimonials
  FOR ALL
  TO authenticated
  USING (true);

-- Insert sample data for testimonials
INSERT INTO testimonials (name, quote, photo_url) VALUES
  ('Sarah Johnson', 'Lara made our home buying experience seamless and stress-free. Her knowledge of the Phoenix market is unmatched.', null),
  ('Mike Rodriguez', 'Professional, knowledgeable, and genuinely cares about her clients. Lara helped us sell our home above asking price.', null),
  ('Jennifer Chen', 'The staging services transformed our home completely. We had multiple offers within the first week!', null),
  ('David Thompson', 'As first-time homebuyers, we were nervous about the process. Lara guided us every step of the way and found us the perfect home.', null),
  ('Lisa Martinez', 'Lara''s investment advice has been invaluable. She helped us build a portfolio of rental properties that generate great returns.', null);

-- Insert sample data for neighborhoods
INSERT INTO neighborhoods (slug, title, description, video_url, highlights, quick_facts) VALUES
  ('arcadia', 'Arcadia', 'Known for its stunning mountain views and luxury homes, Arcadia is one of Phoenix''s most prestigious neighborhoods. This area offers a perfect blend of urban sophistication and desert beauty.', null, 
   ARRAY['Luxury homes with mountain views', 'Upscale shopping and dining', 'Close to Camelback Mountain', 'Excellent schools'],
   '{"population": "15000", "median_home_price": "$850000", "average_lot_size": "0.5 acres", "schools_rating": "9/10"}'::jsonb),
  
  ('scottsdale', 'Scottsdale', 'A vibrant city known for its world-class golf courses, luxury resorts, and thriving arts scene. Scottsdale offers the perfect blend of desert beauty and urban amenities.', null,
   ARRAY['World-class golf courses', 'Luxury shopping and dining', 'Vibrant nightlife', 'Art galleries and museums'],
   '{"population": "258000", "median_home_price": "$650000", "average_lot_size": "0.3 acres", "schools_rating": "8/10"}'::jsonb),
  
  ('tempe', 'Tempe', 'Home to Arizona State University, Tempe is a dynamic city with a young, energetic vibe. The area offers great dining, entertainment, and easy access to outdoor recreation.', null,
   ARRAY['Home to Arizona State University', 'Vibrant downtown area', 'Great restaurants and bars', 'Close to Tempe Town Lake'],
   '{"population": "195000", "median_home_price": "$425000", "average_lot_size": "0.2 acres", "schools_rating": "7/10"}'::jsonb),
  
  ('gilbert', 'Gilbert', 'A family-friendly community known for its excellent schools, safe neighborhoods, and strong sense of community. Gilbert consistently ranks as one of the safest cities in America.', null,
   ARRAY['Top-rated schools', 'Family-friendly community', 'Low crime rates', 'Great parks and recreation'],
   '{"population": "267000", "median_home_price": "$475000", "average_lot_size": "0.25 acres", "schools_rating": "9/10"}'::jsonb);

-- Insert sample data for resources
INSERT INTO resources (title, description, file_url) VALUES
  ('First-Time Homebuyer Guide', 'Everything you need to know about buying your first home in the Phoenix Valley.', '/resources/first-time-buyer-guide.pdf'),
  ('Home Seller''s Handbook', 'A comprehensive guide to preparing and selling your home for maximum value.', '/resources/home-sellers-handbook.pdf'),
  ('Staging Checklist', 'Professional tips to stage your home like a pro and attract more buyers.', '/resources/staging-checklist.pdf'),
  ('Phoenix Market Report', 'Latest market trends, pricing data, and forecasts for the Phoenix Valley.', '/resources/phoenix-market-report.pdf');