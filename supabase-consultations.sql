-- ============================================
-- Tạo bảng Đăng ký tư vấn (consultations)
-- Chạy đoạn lệnh này trong Supabase SQL Editor
-- ============================================

CREATE TABLE IF NOT EXISTS consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  message TEXT,
  status TEXT DEFAULT 'Chờ liên hệ',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Cho phép tất cả người dùng (kể cả khách vãng lai) thêm thông tin đăng ký tư vấn
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cho phép khách vãng lai gửi đăng ký" ON consultations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Cho phép Admin đọc/sửa/xóa thông tin" ON consultations
  FOR ALL TO public USING (true);
