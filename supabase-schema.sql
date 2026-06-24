-- Admin users
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Brand info (singleton, chỉ 1 record)
CREATE TABLE IF NOT EXISTS brand_info (
  id INT PRIMARY KEY DEFAULT 1,
  name TEXT,
  slogan TEXT,
  tagline TEXT,
  address TEXT,
  phone_sales TEXT,
  phone_tech TEXT,
  email TEXT,
  zalo TEXT,
  facebook TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Products
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  badge TEXT,
  price TEXT,
  old_price TEXT,
  frame TEXT,
  specs TEXT[] DEFAULT '{}',
  size TEXT,
  image TEXT,
  gallery TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Services
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon TEXT,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Portfolio (CLB đã setup)
CREATE TABLE IF NOT EXISTS portfolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT,
  tables INT,
  img TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Pro Team (VĐV)
CREATE TABLE IF NOT EXISTS pro_team (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  note TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  place TEXT,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  text TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Club Posts
CREATE TABLE IF NOT EXISTS club_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  date TEXT,
  cat TEXT,
  image TEXT,
  intro TEXT,
  points JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Partners
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Galleries
CREATE TABLE IF NOT EXISTS galleries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  display_order INT,
  created_at TIMESTAMP DEFAULT NOW()
);
