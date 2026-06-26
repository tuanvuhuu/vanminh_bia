import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import ws from 'ws'

if (!globalThis.WebSocket) globalThis.WebSocket = ws

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials in .env.local')
}

const supabase = createClient(supabaseUrl, supabaseKey)

const consultationsData = [
  {
    name: 'Nguyễn Văn Tuấn',
    phone: '0983123456',
    address: 'Cầu Giấy, Hà Nội',
    message: 'Tôi muốn tư vấn mở CLB bida 10 bàn tại Cầu Giấy, vui lòng liên hệ tư vấn mẫu bàn phù hợp.',
    status: 'Chờ liên hệ'
  },
  {
    name: 'Trần Thị Hương',
    phone: '0976987654',
    address: 'Quận 1, TP. HCM',
    message: 'Cần báo giá trọn gói 8 bàn Vikings Rise và bộ phụ kiện thi đấu đi kèm.',
    status: 'Đang liên hệ'
  },
  {
    name: 'Lê Hoàng Nam',
    phone: '0912345678',
    address: 'Hải Châu, Đà Nẵng',
    message: 'Tư vấn thiết kế không gian CLB diện tích 250m2, bố trí bàn và hệ thống ánh sáng chuyên nghiệp.',
    status: 'Đã xong'
  },
  {
    name: 'Phạm Minh Đức',
    phone: '0934567890',
    address: 'Lê Chân, Hải Phòng',
    message: 'Tôi muốn thay nỉ Dragon 900 và cân chỉnh lại 5 bàn bida cũ tại CLB.',
    status: 'Chờ liên hệ'
  },
  {
    name: 'Hoàng Thu Thảo',
    phone: '0967890123',
    address: 'Ninh Kiều, Cần Thơ',
    message: 'Liên hệ báo giá đại lý lấy số lượng lớn bàn bida Vikings lắp cho chuỗi CLB.',
    status: 'Chờ liên hệ'
  },
  {
    name: 'Vũ Huy Hoàng',
    phone: '0945678901',
    address: 'Thuận An, Bình Dương',
    message: 'Cần tư vấn chính sách trả góp và bảo hành cho bàn cao cấp Vikings Monster.',
    status: 'Đang liên hệ'
  },
  {
    name: 'Ngô Quốc Cường',
    phone: '0898765432',
    address: 'Biên Hòa, Đồng Nai',
    message: 'Tư vấn lắp đặt 12 bàn bida lỗ chuẩn thi đấu quốc tế, yêu cầu bàn giao trước tháng sau.',
    status: 'Chờ liên hệ'
  },
  {
    name: 'Đặng Thùy Trang',
    phone: '0888123456',
    address: 'Nha Trang, Khánh Hòa',
    message: 'Tôi cần mua lẻ 2 bàn Vikings Hero màu trắng để lắp đặt tại phòng giải trí gia đình.',
    status: 'Đã xong'
  },
  {
    name: 'Bùi Anh Tuấn',
    phone: '0905123456',
    address: 'Vũng Tàu',
    message: 'Khảo sát mặt bằng mở CLB bida kết hợp cafe tại trung tâm thành phố Vũng Tàu.',
    status: 'Hủy'
  },
  {
    name: 'Đỗ Việt Hùng',
    phone: '0972123456',
    address: 'Hạ Long, Quảng Ninh',
    message: 'Cần tư vấn gói thiết kế 3D không gian cho quán bida diện tích sàn 400m2.',
    status: 'Đang liên hệ'
  },
  {
    name: 'Phan Thanh Bình',
    phone: '0963123456',
    address: 'Vinh, Nghệ An',
    message: 'Liên hệ báo giá nỉ CPBA Competition và bóng Aramith Pro-Cup TV.',
    status: 'Đã xong'
  },
  {
    name: 'Trịnh Xuân Sơn',
    phone: '0987654321',
    address: 'Bắc Ninh',
    message: 'Tôi muốn đặt mua 6 bàn Vikings Hunter Royal chân gỗ tự nhiên màu tối.',
    status: 'Chờ liên hệ'
  },
  {
    name: 'Đinh Quang Huy',
    phone: '0915678901',
    address: 'Thanh Hóa',
    message: 'Tư vấn lắp đặt hệ thống đèn led vuông chống chói cho CLB bida 15 bàn.',
    status: 'Chờ liên hệ'
  },
  {
    name: 'Phùng Ngọc Anh',
    phone: '0932345678',
    address: 'Đà Lạt, Lâm Đồng',
    message: 'Cần đội ngũ kỹ thuật lên cân chỉnh lại độ phẳng mặt đá bàn bida bị lệch.',
    status: 'Đang liên hệ'
  },
  {
    name: 'Lý Thanh Hải',
    phone: '0909123456',
    address: 'Huế',
    message: 'Muốn làm đối tác phân phối độc quyền phụ kiện bida Vikings tại khu vực miền Trung.',
    status: 'Chờ liên hệ'
  },
  {
    name: 'Mai Đức Chung',
    phone: '0944123456',
    address: 'Buôn Ma Thuột',
    message: 'Tư vấn mở CLB kết hợp cà phê bida sân vườn diện tích lớn.',
    status: 'Đã xong'
  },
  {
    name: 'Hồ Sĩ Lâm',
    phone: '0985123456',
    address: 'Pleiku, Gia Lai',
    message: 'Tôi cần báo giá chi tiết chi phí vận chuyển và lắp đặt 4 bàn bida lên Gia Lai.',
    status: 'Chờ liên hệ'
  },
  {
    name: 'Nguyễn Tiến Minh',
    phone: '0977123456',
    address: 'Quy Nhơn, Bình Định',
    message: 'Cần tư vấn thiết kế phòng VIP riêng tư cho CLB gồm 2 bàn bida Vikings Monster.',
    status: 'Chờ liên hệ'
  },
  {
    name: 'Vương Quốc Anh',
    phone: '0966123456',
    address: 'Nam Định',
    message: 'Liên hệ gấp tư vấn lắp 15 bàn bida chuẩn bị khai trương vào ngày 15 tháng tới.',
    status: 'Đang liên hệ'
  },
  {
    name: 'Tống Khánh Linh',
    phone: '0911123456',
    address: 'Thái Bình',
    message: 'Tư vấn loại nỉ và bàn phù hợp cho CLB bida phân khúc bình dân, nhanh thu hồi vốn.',
    status: 'Đã xong'
  }
]

async function seedConsultations() {
  console.log('🌱 Bắt đầu seed 20 dữ liệu đăng ký tư vấn...\n')
  try {
    const { error } = await supabase.from('consultations').insert(consultationsData)
    if (error) throw error
    console.log('✅ Đã seed thành công 20 dữ liệu đăng ký tư vấn!')
  } catch (err) {
    console.error('❌ Lỗi seed consultations:', err.message)
    process.exit(1)
  }
}

seedConsultations()
