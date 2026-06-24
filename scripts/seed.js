import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import ws from 'ws'

// Node < 22 chưa có WebSocket native — cung cấp cho supabase-js
if (!globalThis.WebSocket) globalThis.WebSocket = ws

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials in .env.local')
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Data từ content.js
const brandData = {
  name: 'Vikings Billiards',
  slogan: 'Premium Quality · Affordable Price',
  tagline: 'Bàn bi-a Vikings chính hãng — chất lượng vượt trội, giá hợp lý',
  address: '89 P. Thành Trung, Trâu Quỳ, Gia Lâm, Hà Nội',
  phone_sales: '0976.983.943',
  phone_tech: '0979.294.826',
  email: 'vikingsbilliards@gmail.com',
  zalo: '0976983943',
  facebook: 'https://facebook.com/',
}

const productsData = [
  {
    name: 'Vikings Monster',
    code: 'VK25',
    badge: 'Cao cấp nhất',
    price: '72.000.000đ',
    old_price: '78.000.000đ',
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
    old_price: '85.000.000đ',
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
    old_price: '',
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
    old_price: '55.000.000đ',
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
    old_price: '',
    frame: 'Chân gỗ đen',
    specs: ['Bi Diamon Ultra-C', 'Đèn LED vuông', 'Nỉ Dragon 900', '13 phụ kiện đi kèm'],
    size: 'Sử dụng 2m54 × 1m27',
    image: '/images/spec-hero.jpg',
  },
]

const servicesData = [
  {
    icon: 'design',
    title: 'Tư vấn & thiết kế CLB',
    description: 'Khảo sát mặt bằng, lên bản vẽ bố trí bàn, ánh sáng, thi công trọn gói chìa khóa trao tay.',
  },
  {
    icon: 'cloth',
    title: 'Thay nỉ - thay băng',
    description: 'Đội kỹ thuật thay vải, băng cao su tận nơi nhanh chóng, chuẩn căng phẳng tuyệt đối.',
  },
  {
    icon: 'wrench',
    title: 'Bảo trì - cân bàn',
    description: 'Cân chỉnh độ phẳng mặt đá, bảo dưỡng định kỳ giúp bàn luôn như mới.',
  },
  {
    icon: 'truck',
    title: 'Vận chuyển - lắp đặt',
    description: 'Vận chuyển toàn quốc, lắp đặt bởi thợ lành nghề, bàn giao chuẩn thi đấu.',
  },
]

const portfolioData = [
  { name: 'Vikings Billiards', location: 'Trâu Quỳ, Gia Lâm, Hà Nội', tables: 20, img: '/images/anh_bia.jpg' },
  { name: 'SAM Billiards Arena', location: 'Hà Nội', tables: 73, img: '' },
  { name: 'Universe Billiards', location: 'Phố Vọng, Hà Nội', tables: 18, img: '' },
  { name: 'Empire Billiards Club', location: 'Hải Phòng', tables: 25, img: '' },
  { name: 'Galaxy Billiards', location: 'Biên Hòa, Đồng Nai', tables: 16, img: '' },
  { name: 'Ocean Billiards', location: 'Đà Nẵng', tables: 22, img: '' },
]

const proTeamData = [
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

const testimonialsData = [
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

const clubPostsData = [
  {
    slug: 'chon-vai-ban',
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
    slug: 'setup-clb',
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
    slug: 'bao-duong-ban',
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
    slug: 'chon-ban-ngan-sach',
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

const partnersData = ['Dyna Titanium', 'Aramith', 'Uylin K55', 'CPBA', 'Joss', 'Dragon 900']

async function seed() {
  console.log('🌱 Bắt đầu seed dữ liệu...\n')

  try {
    // 1. Seed brand_info
    console.log('📦 Seeding brand_info...')
    const { error: brandError } = await supabase
      .from('brand_info')
      .upsert([{ id: 1, ...brandData }])
    if (brandError) throw brandError
    console.log('✅ brand_info seeded\n')

    // 2. Seed products
    console.log('📦 Seeding products...')
    const { error: productsError } = await supabase.from('products').insert(productsData)
    if (productsError) throw productsError
    console.log(`✅ ${productsData.length} sản phẩm seeded\n`)

    // 3. Seed services
    console.log('📦 Seeding services...')
    const { error: servicesError } = await supabase.from('services').insert(servicesData)
    if (servicesError) throw servicesError
    console.log(`✅ ${servicesData.length} dịch vụ seeded\n`)

    // 4. Seed portfolio
    console.log('📦 Seeding portfolio...')
    const { error: portfolioError } = await supabase.from('portfolio').insert(portfolioData)
    if (portfolioError) throw portfolioError
    console.log(`✅ ${portfolioData.length} dự án seeded\n`)

    // 5. Seed pro_team
    console.log('📦 Seeding pro_team...')
    const { error: teamError } = await supabase.from('pro_team').insert(proTeamData)
    if (teamError) throw teamError
    console.log(`✅ ${proTeamData.length} VĐV seeded\n`)

    // 6. Seed testimonials
    console.log('📦 Seeding testimonials...')
    const { error: testimonialsError } = await supabase
      .from('testimonials')
      .insert(testimonialsData)
    if (testimonialsError) throw testimonialsError
    console.log(`✅ ${testimonialsData.length} cảm nhận seeded\n`)

    // 7. Seed club_posts
    console.log('📦 Seeding club_posts...')
    const { error: clubError } = await supabase.from('club_posts').insert(clubPostsData)
    if (clubError) throw clubError
    console.log(`✅ ${clubPostsData.length} bài viết CLB seeded\n`)

    // 8. Seed partners
    console.log('📦 Seeding partners...')
    const partnersPayload = partnersData.map((name) => ({ name }))
    const { error: partnersError } = await supabase.from('partners').insert(partnersPayload)
    if (partnersError) throw partnersError
    console.log(`✅ ${partnersData.length} đối tác seeded\n`)

    console.log('✨ Seed hoàn tất! Database ready for use.')
  } catch (error) {
    console.error('❌ Lỗi seed:', error.message)
    process.exit(1)
  }
}

seed()
