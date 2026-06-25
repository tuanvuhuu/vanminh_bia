import AdminGallery from './AdminGallery'
import Overview from './Overview'

// Cấu hình tất cả section của admin: sidebar nav + CRUD config
// icon: path bên trong <svg viewBox="0 0 24 24" stroke="currentColor">

const truncate = (s, n = 50) => (s && s.length > n ? s.slice(0, n) + '…' : s || '')

const thumb = (url) =>
  url ? (
    <img
      src={url}
      alt=""
      className="h-10 w-14 rounded border border-gray-200 object-cover cursor-zoom-in hover:brightness-90 transition shadow-sm"
    />
  ) : (
    <span className="text-xs text-gray-300">—</span>
  )

export const sections = [
  {
    id: 'dashboard',
    label: 'Tổng quan',
    title: 'Tổng quan',
    component: Overview,
    icon: <path d="M3 13h8V3H3zM13 21h8V3h-8zM3 21h8v-6H3z" />,
  },
  {
    id: 'products',
    label: 'Sản phẩm',
    table: 'products',
    title: 'Sản phẩm — Bàn bi-a',
    icon: <path d="M3 7h18v10H3zM3 11h18M8 7v10" />,
    columns: [
      { key: 'image', label: 'Ảnh', render: (r) => thumb(r.image) },
      { key: 'name', label: 'Tên' },
      { key: 'code', label: 'Mã' },
      { key: 'price', label: 'Giá' },
      { key: 'badge', label: 'Nhãn' },
    ],
    fields: [
      { key: 'name', label: 'Tên sản phẩm', type: 'text', required: true, span: 6 },
      { key: 'code', label: 'Mã (VK25)', type: 'text', required: true, span: 3 },
      {
        key: 'badge',
        label: 'Nhãn',
        type: 'combo',
        span: 3,
        options: [
          'Cao cấp nhất',
          'Chuẩn thi đấu',
          'Bán chạy',
          'Sản phẩm HOT',
          'HOT',
          'Nổi bật',
          'Ưu đãi',
          'Giá tốt',
          'Mới',
          'Hết hàng',
        ],
      },
      { key: 'price', label: 'Giá', type: 'text', span: 4 },
      { key: 'old_price', label: 'Giá cũ', type: 'text', span: 4 },
      { key: 'frame', label: 'Khung', type: 'text', span: 4 },
      {
        key: 'specs',
        label: 'Thông số',
        type: 'array',
        span: 6,
        rows: 5,
        hint: 'Mỗi dòng là một thông số.',
      },
      { key: 'size', label: 'Kích thước', type: 'textarea', span: 6, rows: 5 },
      { key: 'image', label: 'Ảnh đại diện', type: 'image', span: 4 },
      {
        key: 'gallery',
        label: 'Bộ sưu tập ảnh',
        type: 'images',
        span: 8,
        hint: 'Có thể chọn/kéo-thả nhiều ảnh.',
      },
    ],
  },
  {
    id: 'services',
    label: 'Dịch vụ',
    table: 'services',
    title: 'Dịch vụ',
    icon: <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6z" />,
    columns: [
      { key: 'title', label: 'Tiêu đề' },
      { key: 'icon', label: 'Icon' },
      { key: 'description', label: 'Mô tả', render: (r) => truncate(r.description, 60) },
    ],
    fields: [
      {
        key: 'icon',
        label: 'Icon',
        type: 'select',
        span: 4,
        options: [
          { value: 'design', label: 'design (thiết kế)' },
          { value: 'cloth', label: 'cloth (vải/nỉ)' },
          { value: 'wrench', label: 'wrench (bảo trì)' },
          { value: 'truck', label: 'truck (vận chuyển)' },
        ],
      },
      { key: 'title', label: 'Tiêu đề', type: 'text', required: true, span: 8 },
      { key: 'description', label: 'Mô tả', type: 'textarea', full: true, rows: 3 },
    ],
  },
  {
    id: 'portfolio',
    label: 'Dự án (CLB)',
    table: 'portfolio',
    title: 'Dự án — CLB đã setup',
    icon: <path d="M3 21h18M5 21V7l8-4 8 4v14M9 9h.01M9 13h.01M9 17h.01" />,
    columns: [
      { key: 'img', label: 'Ảnh', render: (r) => thumb(r.img) },
      { key: 'name', label: 'Tên CLB' },
      { key: 'location', label: 'Địa điểm' },
      { key: 'tables', label: 'Số bàn' },
    ],
    fields: [
      { key: 'name', label: 'Tên CLB', type: 'text', required: true, span: 6 },
      { key: 'tables', label: 'Số bàn', type: 'number', span: 3 },
      { key: 'location', label: 'Địa điểm', type: 'text', span: 9 },
      { key: 'img', label: 'Ảnh', type: 'image', full: true },
    ],
  },
  {
    id: 'team',
    label: 'VĐV',
    table: 'pro_team',
    title: 'Đội ngũ VĐV & cố vấn',
    icon: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 .01M23 21v-2a4 4 0 0 0-3-3.87" />,
    columns: [
      { key: 'name', label: 'Tên' },
      { key: 'role', label: 'Vai trò' },
      { key: 'note', label: 'Ghi chú', render: (r) => truncate(r.note, 60) },
    ],
    fields: [
      { key: 'name', label: 'Tên', type: 'text', required: true, span: 6 },
      { key: 'role', label: 'Vai trò', type: 'text', span: 6 },
      { key: 'note', label: 'Ghi chú', type: 'textarea', full: true, rows: 2 },
    ],
  },
  {
    id: 'testimonials',
    label: 'Cảm nhận',
    table: 'testimonials',
    title: 'Cảm nhận khách hàng',
    icon: <path d="M12 2l3 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.9 21l1.2-6.8-5-4.9 6.9-1z" />,
    columns: [
      { key: 'name', label: 'Tên' },
      { key: 'place', label: 'Nơi' },
      { key: 'rating', label: 'Sao', render: (r) => '⭐'.repeat(r.rating || 0) },
      { key: 'text', label: 'Nội dung', render: (r) => truncate(r.text, 50) },
    ],
    fields: [
      { key: 'name', label: 'Tên', type: 'text', required: true, span: 4 },
      { key: 'place', label: 'Nơi / CLB', type: 'text', span: 5 },
      {
        key: 'rating',
        label: 'Đánh giá',
        type: 'select',
        span: 3,
        options: [
          { value: '5', label: '⭐⭐⭐⭐⭐ (5)' },
          { value: '4', label: '⭐⭐⭐⭐ (4)' },
          { value: '3', label: '⭐⭐⭐ (3)' },
        ],
      },
      { key: 'text', label: 'Nội dung', type: 'textarea', full: true, rows: 3, required: true },
    ],
  },
  {
    id: 'club',
    label: 'Câu lạc bộ',
    table: 'club_posts',
    title: 'Bài viết Câu lạc bộ',
    icon: <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5z" />,
    columns: [
      { key: 'image', label: 'Ảnh', render: (r) => thumb(r.image) },
      { key: 'title', label: 'Tiêu đề' },
      { key: 'cat', label: 'Danh mục' },
      { key: 'date', label: 'Ngày' },
    ],
    fields: [
      { key: 'title', label: 'Tiêu đề', type: 'text', required: true, span: 8 },
      { key: 'slug', label: 'Slug (chon-vai-ban)', type: 'text', required: true, span: 4 },
      {
        key: 'cat',
        label: 'Danh mục',
        type: 'combo',
        span: 4,
        options: ['Kinh nghiệm', 'Hướng dẫn', 'Mẹo hay', 'Tư vấn', 'Tin tức'],
      },
      { key: 'date', label: 'Ngày (12/06/2026)', type: 'text', span: 4 },
      { key: 'image', label: 'Ảnh bài viết', type: 'image', span: 4 },
      { key: 'intro', label: 'Đoạn mở đầu', type: 'textarea', full: true, rows: 3 },
      {
        key: 'points',
        label: 'Các điểm chính',
        type: 'points',
        full: true,
        rows: 8,
        hint: 'Mỗi điểm: dòng 1 = tiêu đề, dòng 2 = mô tả. Ngăn cách các điểm bằng một dòng "---".',
      },
    ],
  },
  {
    id: 'partners',
    label: 'Đối tác',
    table: 'partners',
    title: 'Đối tác / Thương hiệu',
    icon: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 .01M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />,
    columns: [{ key: 'name', label: 'Tên đối tác' }],
    fields: [{ key: 'name', label: 'Tên đối tác', type: 'text', required: true, full: true }],
  },
  {
    id: 'gallery',
    label: 'Thư viện ảnh',
    title: 'Thư viện ảnh',
    component: AdminGallery,
    icon: <path d="M3 5h18v14H3zM3 15l5-5 4 4 3-3 6 6" />,
  },
  {
    id: 'sectionmeta',
    label: 'Tiêu đề mục',
    table: 'section_meta',
    title: 'Tiêu đề các mục trên trang',
    pk: 'key',
    icon: <path d="M4 6h16M4 12h10M4 18h7" />,
    columns: [
      { key: 'key', label: 'Mã mục' },
      { key: 'title', label: 'Tiêu đề' },
      { key: 'eyebrow', label: 'Eyebrow' },
    ],
    fields: [
      {
        key: 'key',
        label: 'Mã mục (key)',
        type: 'text',
        required: true,
        span: 6,
        hint: 'Không nên đổi — phải khớp với trang (vd: gallery, contact).',
      },
      { key: 'eyebrow', label: 'Eyebrow (nhãn nhỏ phía trên)', type: 'text', span: 6 },
      { key: 'title', label: 'Tiêu đề', type: 'text', full: true },
      { key: 'description', label: 'Mô tả', type: 'textarea', full: true, rows: 3 },
    ],
  },
  {
    id: 'brand',
    label: 'Thương hiệu',
    table: 'brand_info',
    title: 'Thông tin thương hiệu',
    singleton: true,
    icon: <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01" />,
    fields: [
      {
        key: 'logo_dark',
        label: 'Logo (nền sáng)',
        type: 'image',
        span: 6,
        hint: 'Hiển thị trên header sáng & trang admin.',
      },
      {
        key: 'logo_gold',
        label: 'Logo (nền tối / dark mode)',
        type: 'image',
        span: 6,
        hint: 'Hiển thị khi trang ở chế độ tối.',
      },
      { key: 'name', label: 'Tên thương hiệu', type: 'text', span: 6 },
      { key: 'slogan', label: 'Slogan', type: 'text', span: 6 },
      { key: 'tagline', label: 'Tagline', type: 'textarea', full: true, rows: 2 },
      { key: 'address', label: 'Địa chỉ', type: 'text', full: true },
      { key: 'phone_sales', label: 'SĐT kinh doanh', type: 'text', span: 4 },
      { key: 'phone_tech', label: 'SĐT kỹ thuật', type: 'text', span: 4 },
      { key: 'email', label: 'Email', type: 'text', span: 4 },
      { key: 'zalo', label: 'Zalo', type: 'text', span: 6 },
      { key: 'facebook', label: 'Facebook URL', type: 'text', span: 6 },
    ],
  },
  {
    id: 'consultations',
    label: 'Đăng ký tư vấn',
    table: 'consultations',
    title: 'Danh sách đăng ký tư vấn',
    icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
    columns: [
      { key: 'name', label: 'Họ tên' },
      { key: 'phone', label: 'Số điện thoại' },
      { key: 'address', label: 'Khu vực' },
      { key: 'message', label: 'Nội dung', render: (r) => truncate(r.message, 50) },
      {
        key: 'status',
        label: 'Trạng thái',
        render: (r) => {
          const badgeColors = {
            'Chờ liên hệ': 'bg-amber-50 text-amber-700 border-amber-200',
            'Đang liên hệ': 'bg-blue-50 text-blue-700 border-blue-200',
            'Đã xong': 'bg-green-50 text-green-700 border-green-200',
            'Hủy': 'bg-red-50 text-red-600 border-red-200',
          }
          const color = badgeColors[r.status] || 'bg-gray-50 text-gray-700 border-gray-200'
          return (
            <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium border ${color}`}>
              {r.status || 'Chờ liên hệ'}
            </span>
          )
        },
      },
    ],
    fields: [
      { key: 'name', label: 'Họ tên khách hàng', type: 'text', required: true, span: 6 },
      { key: 'phone', label: 'Số điện thoại', type: 'text', required: true, span: 6 },
      { key: 'address', label: 'Khu vực', type: 'text', span: 6 },
      {
        key: 'status',
        label: 'Trạng thái',
        type: 'select',
        span: 6,
        options: [
          { value: 'Chờ liên hệ', label: 'Chờ liên hệ' },
          { value: 'Đang liên hệ', label: 'Đang liên hệ' },
          { value: 'Đã xong', label: 'Đã xong' },
          { value: 'Hủy', label: 'Hủy' },
        ],
      },
      { key: 'message', label: 'Nội dung yêu cầu', type: 'textarea', full: true, rows: 4 },
    ],
  },
  {
    id: 'chatbot_settings',
    label: 'Cấu hình Chatbot',
    table: 'chatbot_settings',
    title: 'Cấu hình Chatbot trợ lý',
    icon: <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0 1 12 2zm1 10h-2v5h2v-5zm0-4h-2v2h2V8z" />,
    singleton: true,
    columns: [
      { key: 'bot_name', label: 'Tên Bot' },
      { key: 'enabled', label: 'Hoạt động', render: (r) => (r.enabled ? '🟢 Đang bật' : '🔴 Đang tắt') },
      { key: 'welcome_message', label: 'Lời chào', render: (r) => truncate(r.welcome_message, 40) },
      { key: 'fallback_message', label: 'Tin phản hồi chưa học', render: (r) => truncate(r.fallback_message, 40) },
    ],
    fields: [
      { key: 'bot_name', label: 'Tên Chatbot', type: 'text', required: true, span: 6 },
      {
        key: 'enabled',
        label: 'Trạng thái hoạt động',
        type: 'select',
        span: 6,
        options: [
          { value: true, label: 'Bật trợ lý chatbot' },
          { value: false, label: 'Tắt trợ lý chatbot' },
        ],
      },
      { key: 'welcome_message', label: 'Lời chào mừng', type: 'textarea', full: true, rows: 2, required: true },
      { key: 'fallback_message', label: 'Tin nhắn khi không hiểu câu hỏi', type: 'textarea', full: true, rows: 3, required: true },
    ],
  },
  {
    id: 'chatbot_rules',
    label: 'Kịch bản Chatbot',
    table: 'chatbot_rules',
    title: 'Câu hỏi thường gặp & Câu trả lời của Chatbot',
    icon: <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />,
    columns: [
      { key: 'question', label: 'Câu hỏi' },
      { key: 'answer', label: 'Câu trả lời', render: (r) => truncate(r.answer, 60) },
      { key: 'sort_order', label: 'Thứ tự' },
    ],
    fields: [
      { key: 'question', label: 'Câu hỏi khách hàng thường chọn/nhập', type: 'text', required: true, full: true },
      { key: 'answer', label: 'Câu trả lời của Chatbot', type: 'textarea', required: true, full: true, rows: 4 },
      { key: 'sort_order', label: 'Thứ tự ưu tiên hiển thị', type: 'number', span: 6 },
    ],
  },
]

