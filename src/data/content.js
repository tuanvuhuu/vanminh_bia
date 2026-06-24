// Thông tin thương hiệu Dương Minh Billiards
export const brand = {
  name: 'Dương Minh Billiards',
  slogan: 'Xưởng sản xuất bàn bi-a chính hãng',
  tagline: 'Chuyên cung cấp & tư vấn setup CLB bi-a chính hãng',
  address: 'Thôn Ngọc - Lạc Đạo - Văn Lâm - Hưng Yên',
  phoneSales: '0976.983.983',
  phoneTech: '0576.583.983',
  email: 'duongminhbilliards@gmail.com',
  zalo: '0976983983',
  facebook: 'https://facebook.com/',
  mapEmbed:
    'https://www.google.com/maps?q=L%E1%BA%A1c+%C4%90%E1%BA%A1o+V%C4%83n+L%C3%A2m+H%C6%B0ng+Y%C3%AAn&output=embed',
}

export const navLinks = [
  { label: 'Trang chủ', href: '#home' },
  { label: 'Sản phẩm', href: '#products' },
  { label: 'Dịch vụ', href: '#services' },
  { label: 'Dự án', href: '#portfolio' },
  { label: 'VĐV', href: '#proteam' },
  { label: 'Cảm nhận', href: '#feedback' },
  { label: 'Tin tức', href: '#news' },
  { label: 'Liên hệ', href: '#contact' },
]

export const languages = [
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'km', label: 'ខ្មែរ', flag: '🇰🇭' },
]

export const stats = [
  { value: '10+', label: 'Năm kinh nghiệm' },
  { value: '500+', label: 'CLB đã setup' },
  { value: '63', label: 'Tỉnh thành phủ sóng' },
  { value: '100%', label: 'Bàn chính hãng' },
]

// Các dòng bàn bi-a
export const products = [
  {
    name: 'Bàn Pool 9 Bi K-Sport',
    type: 'Pool / Lỗ',
    price: 'Liên hệ',
    desc: 'Mặt đá slate Ý cao cấp, băng cao su Artemis, khung thép hộp chịu lực. Phù hợp CLB chuẩn thi đấu.',
    img: '',
    tags: ['Đá slate Ý', 'Băng Artemis', 'Bảo hành 5 năm'],
  },
  {
    name: 'Bàn Carom 3 Băng Pro',
    type: 'Carom / Libre',
    price: 'Liên hệ',
    desc: 'Sưởi mặt bàn cân bằng nhiệt, vải Simonis 300 Rapide, đạt tiêu chuẩn UMB thi đấu chuyên nghiệp.',
    img: '',
    tags: ['Sưởi mặt bàn', 'Vải Simonis', 'Chuẩn UMB'],
  },
  {
    name: 'Bàn Lỗ Imperial Platinum',
    type: 'Pool cao cấp',
    price: 'Liên hệ',
    desc: 'Thiết kế sang trọng cho không gian VIP, gỗ tự nhiên phủ PU bóng, đường nét tinh xảo.',
    img: '',
    tags: ['Gỗ tự nhiên', 'Phong cách VIP', 'Đặt riêng'],
  },
  {
    name: 'Bàn Snooker Tiêu Chuẩn',
    type: 'Snooker 12ft',
    price: 'Liên hệ',
    desc: 'Kích thước thi đấu 12ft, mặt đá 5 tấm nặng, băng L-shape chính xác cao.',
    img: '',
    tags: ['12ft thi đấu', 'Đá 5 tấm', 'Băng L-shape'],
  },
]

// Phụ kiện
export const accessories = [
  { name: 'Vải bàn (nỉ)', desc: 'Simonis, Strachan, vải Hàn Quốc — đủ màu' },
  { name: 'Cơ bi-a', desc: 'Cơ Mezz, Predator, cơ tập & cơ thi đấu' },
  { name: 'Bi phôi', desc: 'Bi Aramith Bỉ, bi pool & carom chính hãng' },
  { name: 'Combo thay nỉ', desc: 'Trọn bộ thay vải + băng tận nơi' },
]

// Dịch vụ
export const services = [
  {
    icon: 'design',
    title: 'Tư vấn & thiết kế CLB',
    desc: 'Khảo sát mặt bằng, lên bản vẽ bố trí bàn, ánh sáng, thi công trọn gói chìa khóa trao tay.',
  },
  {
    icon: 'cloth',
    title: 'Thay nỉ - thay băng',
    desc: 'Đội kỹ thuật thay vải, băng cao su tận nơi nhanh chóng, chuẩn căng phẳng tuyệt đối.',
  },
  {
    icon: 'wrench',
    title: 'Bảo trì - cân bàn',
    desc: 'Cân chỉnh độ phẳng mặt đá, bảo dưỡng định kỳ giúp bàn luôn như mới.',
  },
  {
    icon: 'truck',
    title: 'Vận chuyển - lắp đặt',
    desc: 'Vận chuyển toàn quốc, lắp đặt bởi thợ lành nghề, bàn giao chuẩn thi đấu.',
  },
]

// Dự án tiêu biểu (CLB đã setup)
export const portfolio = [
  { name: 'Vikings Billiards', location: 'Trâu Quỳ, Gia Lâm, Hà Nội', tables: 20, img: '/images/anh_bia.jpg' },
  { name: 'SAM Billiards Arena', location: 'Hà Nội', tables: 73, img: '' },
  { name: 'Universe Billiards', location: 'Phố Vọng, Hà Nội', tables: 18, img: '' },
  { name: 'Empire Billiards Club', location: 'Hải Phòng', tables: 25, img: '' },
  { name: 'Galaxy Billiards', location: 'Biên Hòa, Đồng Nai', tables: 16, img: '' },
  { name: 'Ocean Billiards', location: 'Đà Nẵng', tables: 22, img: '' },
]

export const reasons = [
  { title: 'Sản xuất tận xưởng', desc: 'Giá tận gốc, không qua trung gian, chủ động chất lượng từng chi tiết.' },
  { title: 'Vật liệu chính hãng', desc: 'Đá slate, vải Simonis, băng Artemis nhập khẩu chính ngạch.' },
  { title: 'Bảo hành dài hạn', desc: 'Bảo hành lên đến 5 năm, hỗ trợ kỹ thuật trọn đời sản phẩm.' },
  { title: 'Thi công toàn quốc', desc: 'Đội ngũ lắp đặt chuyên nghiệp, phủ sóng 63 tỉnh thành.' },
]

// Đội ngũ VĐV / cơ thủ đồng hành
export const proTeam = [
  {
    name: 'Đỗ Thế Kiên',
    role: 'Cơ thủ Pool chuyên nghiệp',
    note: 'Đồng hành cùng Dương Minh Billiards trong các giải đấu Pool 9 bi toàn quốc.',
  },
  {
    name: 'Nguyễn Hữu Kỳ',
    role: 'Cơ thủ Carom 3 băng',
    note: 'Đại diện thương hiệu, tư vấn kỹ thuật bàn carom đạt chuẩn thi đấu.',
  },
  {
    name: 'Trần Quang Huy',
    role: 'HLV & cố vấn kỹ thuật',
    note: 'Hơn 12 năm kinh nghiệm setup bàn và đào tạo cơ thủ trẻ.',
  },
]

// Cảm nhận khách hàng
export const testimonials = [
  {
    name: 'Anh Tuấn',
    place: 'Chủ CLB Vikings Billiards · Hà Nội',
    rating: 5,
    text: 'Xưởng làm bàn chắc chắn, mặt đá phẳng, băng nảy chuẩn. Đội thi công nhiệt tình, đúng tiến độ. Rất hài lòng!',
  },
  {
    name: 'Chị Hương',
    place: 'CLB Galaxy · Biên Hòa',
    rating: 5,
    text: 'Giá tốt hơn nhiều nơi mà chất lượng vượt mong đợi. Bảo hành nhanh, hỗ trợ kỹ thuật nhiệt tình.',
  },
  {
    name: 'Anh Dũng',
    place: 'CLB Ocean · Đà Nẵng',
    rating: 5,
    text: 'Tư vấn setup từ A-Z, từ bố trí bàn tới ánh sáng. Khách tới chơi khen không gian đẹp và chuyên nghiệp.',
  },
]

// Tin tức / bài viết
export const news = [
  {
    title: 'Cách chọn vải bàn bi-a phù hợp cho CLB',
    date: '12/06/2026',
    cat: 'Kinh nghiệm',
    excerpt: 'So sánh vải Simonis, Strachan và vải Hàn Quốc — ưu nhược điểm và mức giá để chọn đúng nhu cầu.',
  },
  {
    title: 'Quy trình setup một CLB bi-a chuẩn từ đầu',
    date: '02/06/2026',
    cat: 'Hướng dẫn',
    excerpt: 'Từ khảo sát mặt bằng, bố trí bàn, hệ thống đèn tới hoàn thiện — checklist chi tiết cho người mới.',
  },
  {
    title: 'Bảo dưỡng bàn bi-a đúng cách để bền lâu',
    date: '20/05/2026',
    cat: 'Mẹo hay',
    excerpt: 'Vệ sinh mặt nỉ, cân chỉnh độ phẳng và lịch bảo trì định kỳ giúp bàn luôn như mới.',
  },
]

// Thương hiệu vật liệu/đối tác
export const partners = ['Simonis', 'Aramith', 'Artemis', 'Strachan', 'Predator', 'Mezz']
