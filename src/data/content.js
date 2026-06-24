// Thông tin thương hiệu VIKINGS BILLIARDS
export const brand = {
  name: 'Vikings Billiards',
  slogan: 'Premium Quality · Affordable Price',
  tagline: 'Bàn bi-a Vikings chính hãng — chất lượng vượt trội, giá hợp lý',
  address: '89 P. Thành Trung, Trâu Quỳ, Gia Lâm, Hà Nội',
  phoneSales: '0976.983.943',
  phoneTech: '0979.294.826',
  email: 'vikingsbilliards@gmail.com',
  zalo: '0976983943',
  facebook: 'https://facebook.com/',
  mapEmbed:
    'https://www.google.com/maps?q=Tr%C3%A2u+Qu%E1%BB%B3+Gia+L%C3%A2m+H%C3%A0+N%E1%BB%99i&output=embed',
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

// Banner cho hero slider
export const banners = [
  { img: '/images/banner-premium.jpg', title: 'Premium Quality', sub: 'Affordable Price' },
  { img: '/images/banner-dragon.jpg', title: 'Dragon Black', sub: 'Exquisite Present' },
  { img: '/images/banner-blackheart.jpg', title: 'Black Heart', sub: 'Quality · Uniqueness' },
  { img: '/images/banner-revolutionary.jpg', title: 'Revolutionary Design', sub: 'Superior Quality' },
]

export const stats = [
  { value: '10+', label: 'Năm kinh nghiệm' },
  { value: '1000+', label: 'Bàn đã bàn giao' },
  { value: '5', label: 'Dòng bàn cao cấp' },
  { value: '63', label: 'Tỉnh thành phủ sóng' },
]

// Các dòng bàn bi-a Vikings (giá & thông số theo bảng báo giá)
export const products = [
  {
    name: 'Vikings Monster',
    code: 'VK25',
    badge: 'Cao cấp nhất',
    price: '72.000.000đ',
    oldPrice: '78.000.000đ',
    frame: 'Khung thép hợp kim · Nỉ Bông Tuyết',
    specs: ['Bóng Dyna Titanium', 'Băng Uylin K55', 'Đá đen tự nhiên phẳng 99%', 'Góc hợp kim đúc'],
    size: 'Phủ bì 290×165×82cm · Sử dụng 254×127cm',
    image: '/images/spec-monster.jpg',
  },
  {
    name: 'Vikings Rise',
    code: 'VK-RISE',
    badge: 'Chuẩn thi đấu',
    price: '79.000.000đ',
    oldPrice: '85.000.000đ',
    frame: 'Khung thép hợp kim chân chữ V',
    specs: ['Bóng Dyna Black Aramit', 'Băng Uylin K55', 'Nỉ CPBA Competition', 'Đá đen tự nhiên 99%'],
    size: 'Phủ bì 290×165×82cm · Sử dụng 254×127cm',
    image: '/images/spec-rise.jpg',
  },
  {
    name: 'Vikings Hunter Royal',
    code: 'VK-HUNTER',
    badge: 'Bán chạy',
    price: '65.000.000đ',
    oldPrice: '',
    frame: 'Chân gỗ tự nhiên (đen / sáng)',
    specs: ['Bi Dyna Titan', 'Gậy Joss', 'Nỉ Dragon 900', '13 phụ kiện đi kèm'],
    size: 'Sử dụng 2m54 × 1m27',
    image: '/images/spec-hunter-black.jpg',
    gallery: ['/images/spec-hunter-black.jpg', '/images/spec-hunter-wood.jpg'],
  },
  {
    name: 'Vikings Silver Hero',
    code: 'VK-SILVER',
    badge: 'Ưu đãi',
    price: '50.000.000đ',
    oldPrice: '55.000.000đ',
    frame: 'Khung gỗ Polywood · Trắng hoa văn',
    specs: ['Bóng Diamon Ultra-C', 'Băng Primer đen', 'Nỉ Dragon 900', 'Đá đen tự nhiên 99%'],
    size: 'Phủ bì 290×165×82cm',
    image: '/images/spec-silver-hero.jpg',
  },
  {
    name: 'Vikings Hero',
    code: 'VK-HERO',
    badge: 'Giá tốt',
    price: '50.000.000đ',
    oldPrice: '',
    frame: 'Chân gỗ đen',
    specs: ['Bi Diamon Ultra-C', 'Đèn LED vuông', 'Nỉ Dragon 900', '13 phụ kiện đi kèm'],
    size: 'Sử dụng 2m54 × 1m27',
    image: '/images/spec-hero.jpg',
  },
]

// Phụ kiện đi kèm / bán lẻ
export const accessories = [
  { name: 'Bi Dyna / Diamon Ultra-C', desc: 'Bi phôi cao cấp, độ tròn & màu sắc chuẩn thi đấu', img: '' },
  { name: 'Nỉ Dragon 900 / CPBA', desc: 'Vải bàn chuyên nghiệp, độ nảy chuẩn, bền màu', img: '' },
  { name: 'Gậy Vikings / Joss', desc: 'Đa dạng gậy tập và gậy thi đấu chính hãng', img: '' },
  { name: 'Tam giác xếp bi', desc: 'Tam giác Đài Loan chuẩn, xếp bi khít đẹp', img: '/images/acc-triangle.webp' },
  { name: 'Đèn LED vuông', desc: 'Hệ đèn chiếu sáng đều mặt bàn, không chói', img: '' },
  { name: 'Phụ kiện trọn bộ', desc: 'Găng tay, lơ, khay bi, giá cơ, tấm phủ, chổi vệ sinh…', img: '' },
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
  { title: 'Giá tận gốc', desc: 'Sản xuất & phân phối trực tiếp, không qua trung gian — giá hợp lý nhất.' },
  { title: 'Vật liệu cao cấp', desc: 'Đá đen tự nhiên phẳng 99%, băng Uylin K55, nỉ CPBA Competition.' },
  { title: 'Bảo hành dài hạn', desc: 'Bảo hành lên đến 5 năm, hỗ trợ kỹ thuật trọn đời sản phẩm.' },
  { title: 'Thi công toàn quốc', desc: 'Đội ngũ lắp đặt chuyên nghiệp, phủ sóng 63 tỉnh thành.' },
]

// Đội ngũ VĐV / cơ thủ đồng hành
export const proTeam = [
  {
    name: 'Đỗ Thế Kiên',
    role: 'Cơ thủ Pool chuyên nghiệp',
    note: 'Đồng hành cùng Vikings Billiards trong các giải đấu Pool 9 bi toàn quốc.',
  },
  {
    name: 'Nguyễn Hữu Kỳ',
    role: 'Cơ thủ Carom 3 băng',
    note: 'Đại diện thương hiệu, tư vấn kỹ thuật bàn đạt chuẩn thi đấu.',
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
    place: 'Chủ CLB Vikings · Hà Nội',
    rating: 5,
    text: 'Bàn Vikings làm chắc chắn, mặt đá phẳng, băng nảy chuẩn. Đội thi công nhiệt tình, đúng tiến độ. Rất hài lòng!',
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
    excerpt: 'So sánh nỉ Dragon 900, CPBA Competition và các loại vải phổ biến — ưu nhược điểm và mức giá.',
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

// Vật liệu / thương hiệu đối tác
export const partners = ['Dyna Titanium', 'Aramith', 'Uylin K55', 'CPBA', 'Joss', 'Dragon 900']
