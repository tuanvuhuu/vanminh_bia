-- ============================================
-- Tạo bảng thông báo đơn hàng ảo (fake_orders)
-- Chạy đoạn lệnh này trong Supabase SQL Editor
-- ============================================

CREATE TABLE IF NOT EXISTS fake_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  text TEXT NOT NULL,
  type TEXT DEFAULT 'product',
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Bật RLS và cấp quyền truy cập công khai
ALTER TABLE fake_orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access" ON fake_orders;
CREATE POLICY "Allow public read access" ON fake_orders FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public manage access" ON fake_orders;
CREATE POLICY "Allow public manage access" ON fake_orders FOR ALL USING (true);

-- Xóa dữ liệu cũ nếu có và nạp dữ liệu mẫu ban đầu (50 bản ghi Miền Bắc)
TRUNCATE TABLE fake_orders;

INSERT INTO fake_orders (name, location, text, type, image) VALUES
  ('Anh Tuấn', 'Cầu Giấy, Hà Nội', 'đã đặt mua bàn Vikings Monster', 'product', '/images/spec-monster.jpg'),
  ('Chị Hương', 'Đống Đa, Hà Nội', 'đã đặt mua bàn Vikings Rise', 'product', '/images/spec-rise.jpg'),
  ('Anh Nam', 'Hạ Long, Quảng Ninh', 'đã đăng ký tư vấn thiết kế & lắp đặt CLB', 'consultation', ''),
  ('Anh Đức', 'Lê Chân, Hải Phòng', 'đã đặt dịch vụ thay nỉ Dragon 900', 'accessory', ''),
  ('Chị Thảo', 'Vĩnh Yên, Vĩnh Phúc', 'đã yêu cầu báo giá đại lý bàn bida', 'consultation', ''),
  ('Anh Hoàng', 'Gia Lâm, Hà Nội', 'đã đặt mua bàn Vikings Hunter Royal', 'product', '/images/spec-hunter-black.jpg'),
  ('Anh Cường', 'Từ Sơn, Bắc Ninh', 'đã đặt mua bàn Vikings Silver Hero', 'product', '/images/spec-silver-hero.jpg'),
  ('Chị Trang', 'Cẩm Phả, Quảng Ninh', 'đã đăng ký tư vấn mở CLB bida 12 bàn', 'consultation', ''),
  ('Anh Hùng', 'Ngô Quyền, Hải Phòng', 'đã đặt mua trọn bộ phụ kiện cao cấp', 'accessory', '/images/acc-triangle.webp'),
  ('Anh Bình', 'Thanh Xuân, Hà Nội', 'đã đặt mua bàn Vikings Hero', 'product', '/images/spec-hero.jpg'),
  ('Anh Sơn', 'Thuận Thành, Bắc Ninh', 'đã đặt mua 4 bàn Vikings Hunter Royal', 'product', '/images/spec-hunter-black.jpg'),
  ('Anh Huy', 'Thành phố Hải Dương', 'đã đặt dịch vụ cân chỉnh bàn bida định kỳ', 'consultation', ''),
  ('Chị Vy', 'Mỹ Hào, Hưng Yên', 'đã đặt mua bóng Aramith Pro-Cup TV', 'accessory', ''),
  ('Anh Minh', 'Phủ Lý, Hà Nam', 'đã đặt mua nỉ CPBA Competition', 'accessory', ''),
  ('Anh Quân', 'Việt Trì, Phú Thọ', 'đã yêu cầu khảo sát mặt bằng mở CLB', 'consultation', ''),
  ('Chị Hà', 'Thái Bình', 'đã đặt mua bàn Vikings Rise', 'product', '/images/spec-rise.jpg'),
  ('Anh Phong', 'Chí Linh, Hải Dương', 'đã đăng ký tư vấn thiết kế CLB bida 8 bàn', 'consultation', ''),
  ('Chị Tuyết', 'Phúc Yên, Vĩnh Phúc', 'đã đặt mua 2 bàn Vikings Hero chân đen', 'product', '/images/spec-hero.jpg'),
  ('Anh Tùng', 'Ninh Bình', 'đã đặt phụ kiện lơ và gậy thi đấu Vikings', 'accessory', ''),
  ('Chị Quyên', 'Sông Công, Thái Nguyên', 'đã đặt mua bàn Vikings Silver Hero trắng', 'product', '/images/spec-silver-hero.jpg'),
  ('Anh Hải', 'Lạng Sơn', 'đã đăng ký khảo sát lắp đặt CLB bida', 'consultation', ''),
  ('Anh Tiến', 'Tuyên Quang', 'đã đặt mua bàn Vikings Monster cao cấp nhất', 'product', '/images/spec-monster.jpg'),
  ('Chị Mai', 'Hòa Bình', 'đã đặt dịch vụ thay băng cao su Uylin K55', 'accessory', ''),
  ('Anh Hùng', 'Yên Bái', 'đã đặt mua bàn Vikings Hunter Royal gỗ tự nhiên', 'product', '/images/spec-hunter-black.jpg'),
  ('Anh Long', 'Bắc Giang', 'đã đăng ký tư vấn mở CLB bida kết hợp cafe', 'consultation', ''),
  ('Chị Phương', 'Đông Anh, Hà Nội', 'đã đặt mua 6 bàn bida chuẩn thi đấu', 'product', ''),
  ('Anh Lâm', 'Hà Đông, Hà Nội', 'đã đặt mua bàn Vikings Rise', 'product', '/images/spec-rise.jpg'),
  ('Anh Khánh', 'Sơn Tây, Hà Nội', 'đã đặt mua bàn Vikings Monster', 'product', '/images/spec-monster.jpg'),
  ('Chị Hoa', 'Thủy Nguyên, Hải Phòng', 'đã đặt mua trọn bộ 10 phụ kiện bida lỗ', 'accessory', ''),
  ('Anh Phước', 'Uông Bí, Quảng Ninh', 'đã đăng ký tư vấn mở CLB 16 bàn', 'consultation', ''),
  ('Anh Vũ', 'Bắc Từ Liêm, Hà Nội', 'đã đặt dịch vụ bọc nỉ bàn bida tận nơi', 'accessory', ''),
  ('Chị Thu', 'Từ Sơn, Bắc Ninh', 'đã đặt mua bàn Vikings Silver Hero', 'product', '/images/spec-silver-hero.jpg'),
  ('Anh Nghĩa', 'Bình Giang, Hải Dương', 'đã đặt mua bàn Vikings Hero chân gỗ', 'product', '/images/spec-hero.jpg'),
  ('Anh Nhân', 'Văn Lâm, Hưng Yên', 'đã đăng ký tư vấn lắp đặt phòng VIP bida', 'consultation', ''),
  ('Chị Ngân', 'Đông Hưng, Thái Bình', 'đã đặt mua bàn Vikings Hunter Royal', 'product', '/images/spec-hunter-black.jpg'),
  ('Anh Đạt', 'Duy Tiên, Hà Nam', 'đã đặt mua bóng Dyna Titanium chính hãng', 'accessory', ''),
  ('Chị Trúc', 'Tam Điệp, Ninh Bình', 'đã đặt dịch vụ cân bàn và bảo trì định kỳ', 'consultation', ''),
  ('Anh Tấn', 'Phổ Yên, Thái Nguyên', 'đã đặt mua bàn Vikings Rise', 'product', '/images/spec-rise.jpg'),
  ('Anh Khoa', 'Lạng Giang, Bắc Giang', 'đã đặt mua 5 bàn Vikings Monster', 'product', '/images/spec-monster.jpg'),
  ('Chị Dung', 'Lâm Thao, Phú Thọ', 'đã đăng ký tư vấn mở CLB bida 6 bàn', 'consultation', ''),
  ('Anh Kiên', 'Sơn La', 'đã đặt mua bàn Vikings Hero', 'product', '/images/spec-hero.jpg'),
  ('Anh Phát', 'Điện Biên', 'đã đặt mua nỉ bàn bida CPBA', 'accessory', ''),
  ('Chị Liên', 'Cao Bằng', 'đã đặt mua bàn Vikings Hunter Royal', 'product', '/images/spec-hunter-black.jpg'),
  ('Anh Duy', 'Ý Yên, Nam Định', 'đã đăng ký tư vấn kinh doanh CLB bida', 'consultation', ''),
  ('Chị Vân', 'Quỳnh Phụ, Thái Bình', 'đã đặt mua bàn Vikings Rise', 'product', '/images/spec-rise.jpg'),
  ('Anh Phụng', 'Chí Linh, Hải Dương', 'đã đặt mua bàn Vikings Silver Hero', 'product', '/images/spec-silver-hero.jpg'),
  ('Anh Thịnh', 'Phúc Yên, Vĩnh Phúc', 'đã đặt mua bóng Aramith Pro-Cup TV', 'accessory', ''),
  ('Chị Cát', 'Hoài Đức, Hà Nội', 'đã đăng ký khảo sát thi công lắp đặt CLB', 'consultation', ''),
  ('Anh Trí', 'Thanh Trì, Hà Nội', 'đã đặt mua bàn Vikings Monster cao cấp', 'product', '/images/spec-monster.jpg'),
  ('Anh Quốc', 'Đông Anh, Hà Nội', 'đã đặt mua bàn Vikings Rise', 'product', '/images/spec-rise.jpg');
