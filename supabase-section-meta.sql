-- ============================================
-- Tiêu đề các mục (section_meta) + seed thư viện ảnh (galleries)
-- Chạy 1 lần trong Supabase SQL Editor. An toàn khi chạy lại.
-- ============================================

CREATE TABLE IF NOT EXISTS section_meta (
  key TEXT PRIMARY KEY,
  eyebrow TEXT,
  title TEXT,
  description TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO section_meta (key, eyebrow, title, description) VALUES
  ('products', 'Sản phẩm', 'Các dòng bàn Vikings',
   '5 dòng bàn bi-a cao cấp — khung thép hợp kim / gỗ tự nhiên, đá đen phẳng 99%, trọn bộ phụ kiện đi kèm.'),
  ('services', 'Dịch vụ', 'Giải pháp trọn gói cho CLB bi-a',
   'Từ tư vấn thiết kế đến thi công, bảo trì — Vikings Billiards đồng hành cùng bạn trên cả chặng đường.'),
  ('portfolio', 'Dự án tiêu biểu', 'CLB đã setup & bàn giao',
   'Hàng trăm câu lạc bộ bi-a trên toàn quốc đã tin tưởng lựa chọn Vikings Billiards.'),
  ('gallery', 'Không gian CLB', 'Thư viện thiết kế Vikings',
   'Bộ sưu tập không gian câu lạc bộ bi-a Vikings — thiết kế nội thất, ánh sáng và setup bàn đẳng cấp.'),
  ('proteam', 'Đội ngũ chuyên nghiệp', 'VĐV & cố vấn đồng hành',
   'Các cơ thủ và huấn luyện viên giàu kinh nghiệm đồng hành cùng thương hiệu, đảm bảo mỗi cây bàn đạt chuẩn thi đấu.'),
  ('feedback', 'Cảm nhận khách hàng', 'Khách hàng nói gì về chúng tôi',
   'Sự hài lòng của hàng trăm chủ CLB trên toàn quốc là động lực để Vikings Billiards không ngừng hoàn thiện.'),
  ('club', 'Câu lạc bộ', 'Kiến thức & kinh nghiệm vận hành CLB',
   'Mỗi bài viết là một chủ đề riêng — từ chọn vải, setup đến bảo dưỡng — giúp bạn vận hành câu lạc bộ bi-a hiệu quả nhất.'),
  ('contact', 'Liên hệ', 'Nhận báo giá & tư vấn setup CLB',
   'Để lại thông tin, đội ngũ Vikings Billiards sẽ liên hệ tư vấn trong thời gian sớm nhất.')
ON CONFLICT (key) DO NOTHING;

-- Seed thư viện ảnh từ gallery-01..49 (chỉ khi bảng đang trống)
INSERT INTO galleries (image_url, display_order)
SELECT '/images/san_pham/gallery-' || lpad(g::text, 2, '0') || '.jpg', g
FROM generate_series(1, 49) AS g
WHERE NOT EXISTS (SELECT 1 FROM galleries);
