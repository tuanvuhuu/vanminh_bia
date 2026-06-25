-- ============================================
-- Tạo bảng cấu hình Chatbot (chatbot_settings) & Luật Q&A (chatbot_rules)
-- Chạy đoạn lệnh này trong Supabase SQL Editor
-- ============================================

CREATE TABLE IF NOT EXISTS chatbot_settings (
  id BIGINT PRIMARY KEY DEFAULT 1,
  enabled BOOLEAN DEFAULT true,
  bot_name TEXT DEFAULT 'Vikings Assistant',
  welcome_message TEXT DEFAULT 'Xin chào! Vikings Billiards có thể hỗ trợ gì cho anh/chị ạ?',
  fallback_message TEXT DEFAULT 'Dạ, câu hỏi này chatbot chưa được học. Anh/chị vui lòng để lại số điện thoại hoặc gọi hotline để bộ phận kinh doanh hỗ trợ ngay lập tức ạ!',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Chèn dữ liệu mặc định ban đầu nếu chưa có
INSERT INTO chatbot_settings (id, enabled, bot_name, welcome_message, fallback_message)
VALUES (1, true, 'Vikings Assistant', 'Xin chào! Vikings Billiards có thể hỗ trợ gì cho anh/chị ạ?', 'Dạ, câu hỏi này chatbot chưa được học. Anh/chị vui lòng để lại số điện thoại hoặc gọi hotline để bộ phận kinh doanh hỗ trợ ngay lập tức ạ!')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- Tạo bảng kịch bản câu hỏi thường gặp (chatbot_rules)
-- ============================================
CREATE TABLE IF NOT EXISTS chatbot_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Chèn dữ liệu mẫu cho chatbot_rules
INSERT INTO chatbot_rules (id, question, answer, sort_order) VALUES
('11111111-1111-1111-1111-111111111111', 'Giá bán bàn Rise bao nhiêu?', 'Chào anh/chị, bàn bi-a Vikings Rise cao cấp hiện có giá ưu đãi đặc biệt là 38.000.000đ (đã bao gồm đầy đủ phụ kiện chính hãng và bảo hành 2 năm). Anh/chị có cần tư vấn setup chi tiết không ạ?', 1),
('22222222-2222-2222-2222-222222222222', 'Có giao hàng toàn quốc không?', 'Dạ có, Vikings Billiards vận chuyển, lắp đặt và bàn giao kỹ thuật tận nhà trên toàn quốc. Đội ngũ thợ tay nghề cao đảm bảo cân chỉnh bàn chuẩn thi đấu cho anh/chị ạ!', 2),
('33333333-3333-3333-3333-333333333333', 'Chính sách bảo hành thế nào?', 'Tất cả bàn bi-a chính hãng Vikings đều được bảo hành 2 năm về mặt bàn, thành băng, kết cấu gỗ, và bảo trì trọn đời sản phẩm. Anh/chị hoàn toàn yên tâm sử dụng nhé!', 3),
('44444444-4444-4444-4444-444444444444', 'Địa chỉ showroom ở đâu?', 'Showroom của Vikings Billiards đặt tại: 89 P. Thành Trung, Trâu Quỳ, Gia Lâm, Hà Nội. Kính mời anh/chị ghé qua trải nghiệm trực tiếp bàn ạ!', 4)
ON CONFLICT (id) DO NOTHING;

-- Bật RLS và cấp quyền truy cập công khai để chatbot hoạt động trên landing page
ALTER TABLE chatbot_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Cho phép đọc cấu hình chatbot công khai" ON chatbot_settings;
CREATE POLICY "Cho phép đọc cấu hình chatbot công khai" ON chatbot_settings FOR SELECT USING (true);
DROP POLICY IF EXISTS "Cho phép Admin sửa cấu hình chatbot" ON chatbot_settings;
CREATE POLICY "Cho phép Admin sửa cấu hình chatbot" ON chatbot_settings FOR ALL USING (true);

ALTER TABLE chatbot_rules ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Cho phép đọc luật chatbot công khai" ON chatbot_rules;
CREATE POLICY "Cho phép đọc luật chatbot công khai" ON chatbot_rules FOR SELECT USING (true);
DROP POLICY IF EXISTS "Cho phép Admin quản lý luật chatbot" ON chatbot_rules;
CREATE POLICY "Cho phép Admin quản lý luật chatbot" ON chatbot_rules FOR ALL USING (true);
