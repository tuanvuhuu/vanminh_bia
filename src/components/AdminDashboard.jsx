import { useState } from 'react'
import AdminProducts from './admin/AdminProducts'
import AdminServices from './admin/AdminServices'
import AdminPortfolio from './admin/AdminPortfolio'
import AdminTeam from './admin/AdminTeam'
import AdminTestimonials from './admin/AdminTestimonials'
import AdminClubPosts from './admin/AdminClubPosts'
import AdminPartners from './admin/AdminPartners'
import AdminBrand from './admin/AdminBrand'

const tabs = [
  { id: 'products', label: 'Sản phẩm', icon: '📦' },
  { id: 'services', label: 'Dịch vụ', icon: '🔧' },
  { id: 'portfolio', label: 'Portfolio', icon: '🏢' },
  { id: 'team', label: 'VĐV', icon: '👥' },
  { id: 'testimonials', label: 'Cảm nhận', icon: '⭐' },
  { id: 'club', label: 'Câu lạc bộ', icon: '📚' },
  { id: 'partners', label: 'Đối tác', icon: '🤝' },
  { id: 'brand', label: 'Thương hiệu', icon: '🏷️' },
]

export default function AdminDashboard({ userEmail }) {
  const [activeTab, setActiveTab] = useState('products')

  const renderTab = () => {
    switch (activeTab) {
      case 'products':
        return <AdminProducts />
      case 'services':
        return <AdminServices />
      case 'portfolio':
        return <AdminPortfolio />
      case 'team':
        return <AdminTeam />
      case 'testimonials':
        return <AdminTestimonials />
      case 'club':
        return <AdminClubPosts />
      case 'partners':
        return <AdminPartners />
      case 'brand':
        return <AdminBrand />
      default:
        return null
    }
  }

  return (
    <div className="container-x py-8">
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 font-semibold transition ${
              activeTab === tab.id
                ? 'bg-gold text-black'
                : 'border border-line bg-surface text-content hover:border-gold'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-line bg-surface p-6">
        {renderTab()}
      </div>
    </div>
  )
}
