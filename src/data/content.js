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
  { label: 'Không gian', href: '#gallery' },
  { label: 'VĐV', href: '#proteam' },
  { label: 'Cảm nhận', href: '#feedback' },
  { label: 'Câu lạc bộ', href: '#club' },
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

// Câu lạc bộ — mỗi bài là một chủ đề riêng (chọn vải, setup, bảo dưỡng)
export const clubPosts = [
  {
    id: 'chon-vai-ban',
    title: 'Chọn nỉ bàn bi-a: Dragon 900 hay CPBA Competition?',
    date: '12/06/2026',
    cat: 'Kinh nghiệm',
    image: '/images/san_pham/gallery-08.jpg',
    intro:
      'Vải (nỉ) là yếu tố quyết định trực tiếp tới đường bi và trải nghiệm người chơi. Chọn đúng loại nỉ giúp CLB vừa đẹp, vừa bền, vừa tối ưu chi phí vận hành.',
    points: [
      {
        h: 'Nỉ Dragon 900',
        d: 'Độ nảy ổn định, giá hợp lý, phù hợp CLB phổ thông và bàn tập — cân bằng giữa chất lượng và chi phí.',
      },
      {
        h: 'Nỉ CPBA Competition',
        d: 'Sợi mịn, tốc độ bi nhanh và chuẩn thi đấu, dành cho CLB cao cấp và bàn phục vụ giải đấu.',
      },
      {
        h: 'Chọn theo mô hình CLB',
        d: 'Cân nhắc lượng khách, cường độ sử dụng và phân khúc giá vé để chọn loại nỉ có vòng đời bảo trì hợp lý nhất.',
      },
    ],
  },
  {
    id: 'setup-clb',
    title: 'Setup CLB bi-a từ A–Z: Quy trình chuẩn cho người mới',
    date: '02/06/2026',
    cat: 'Hướng dẫn',
    image: '/images/san_pham/gallery-22.jpg',
    intro:
      'Một CLB bi-a vận hành tốt bắt đầu từ khâu setup bài bản — từ mặt bằng, bố trí bàn đến hệ thống ánh sáng và nghiệm thu.',
    points: [
      {
        h: 'Khảo sát & bố trí mặt bằng',
        d: 'Đảm bảo khoảng cách giữa các bàn để người chơi thoải mái ra cơ, tối ưu số bàn trên diện tích thực tế.',
      },
      {
        h: 'Hệ thống ánh sáng',
        d: 'Đèn LED chuyên dụng chiếu sáng đều mặt bàn, không chói, không bóng đổ — yếu tố tạo trải nghiệm chuyên nghiệp.',
      },
      {
        h: 'Hoàn thiện & nghiệm thu',
        d: 'Cân chỉnh độ phẳng mặt đá, kiểm tra băng nảy và bàn giao chuẩn thi đấu trước ngày khai trương.',
      },
    ],
  },
  {
    id: 'bao-duong-ban',
    title: 'Bí quyết bảo dưỡng bàn bi-a luôn như mới',
    date: '20/05/2026',
    cat: 'Mẹo hay',
    image: '/images/san_pham/gallery-40.jpg',
    intro:
      'Bảo dưỡng đúng cách giúp bàn luôn như mới, kéo dài tuổi thọ nỉ và giữ đường bi chuẩn theo thời gian.',
    points: [
      {
        h: 'Vệ sinh mặt nỉ',
        d: 'Chải và hút bụi định kỳ theo một chiều, tránh làm xù sợi — giữ tốc độ bi ổn định.',
      },
      {
        h: 'Cân chỉnh độ phẳng',
        d: 'Kiểm tra và cân lại mặt đá định kỳ để đảm bảo bi lăn thẳng, không lệch hướng.',
      },
      {
        h: 'Lịch bảo trì định kỳ',
        d: 'Lên lịch bảo dưỡng theo cường độ sử dụng, thay nỉ và băng đúng thời điểm để tối ưu chi phí.',
      },
    ],
  },
  {
    id: 'chon-ban-ngan-sach',
    title: 'Đầu tư CLB bi-a: Chọn bàn đúng theo ngân sách',
    date: '08/05/2026',
    cat: 'Tư vấn',
    image: '/images/san_pham/gallery-15.jpg',
    intro:
      'Không phải cứ bàn đắt nhất là tối ưu. Chọn dòng bàn đúng với ngân sách và mô hình kinh doanh giúp bạn hoàn vốn nhanh mà vẫn giữ trải nghiệm tốt cho khách.',
    points: [
      {
        h: 'Phân khúc tiết kiệm',
        d: 'Vikings Hero / Silver Hero — chi phí đầu tư thấp, phù hợp CLB bình dân và bàn tập, hoàn vốn nhanh.',
      },
      {
        h: 'Phân khúc tầm trung',
        d: 'Vikings Hunter Royal — cân bằng giữa thẩm mỹ, độ bền và chi phí, lựa chọn phổ biến cho CLB tầm trung.',
      },
      {
        h: 'Phân khúc cao cấp & thi đấu',
        d: 'Vikings Rise / Monster — chuẩn thi đấu, nâng tầm thương hiệu CLB và phục vụ giải đấu chuyên nghiệp.',
      },
    ],
  },
]

// Vật liệu / thương hiệu đối tác
export const partners = ['Dyna Titanium', 'Aramith', 'Uylin K55', 'CPBA', 'Joss', 'Dragon 900']

// Thư viện ảnh không gian CLB Vikings (render 3D thiết kế)
export const gallery = Array.from(
  { length: 49 },
  (_, i) => `/images/san_pham/gallery-${String(i + 1).padStart(2, '0')}.jpg`,
)
