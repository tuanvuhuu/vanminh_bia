-- ============================================
-- Storage cho upload ảnh (bucket "uploads", public)
-- Chạy 1 lần trong Supabase SQL Editor
-- ============================================

-- 1. Tạo bucket public
INSERT INTO storage.buckets (id, name, public)
VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Policy: cho phép đọc công khai
CREATE POLICY "Public read uploads"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'uploads');

-- 3. Policy: cho phép upload (anon) — phù hợp khi chạy không bật auth
CREATE POLICY "Anon upload uploads"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'uploads');

-- 4. Policy: cho phép xóa (anon)
CREATE POLICY "Anon delete uploads"
  ON storage.objects FOR DELETE
  TO anon, authenticated
  USING (bucket_id = 'uploads');
