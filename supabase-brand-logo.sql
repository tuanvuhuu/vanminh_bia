-- Thêm logo cho thương hiệu (chạy 1 lần trên Supabase SQL editor)
ALTER TABLE brand_info ADD COLUMN IF NOT EXISTS logo_dark TEXT; -- logo cho nền sáng (header sáng, admin)
ALTER TABLE brand_info ADD COLUMN IF NOT EXISTS logo_gold TEXT; -- logo cho nền tối (dark mode)
