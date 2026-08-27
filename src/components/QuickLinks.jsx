import { Link } from 'react-router-dom'
import './QuickLinks.css'

const items = [
  { to: '/uchnyam#rozklad', icon: '🗓️', label: 'Розклад уроків' },
  { to: '/dokumenty', icon: '📄', label: 'Документи' },
  { to: '/batkam#zarahuvannya', icon: '📝', label: 'Зарахування' },
  { to: '/fotogalereya', icon: '🖼️', label: 'Фотогалерея' },
  { to: '/korysni-posylannya', icon: '🔗', label: 'Корисні посилання' },
  { to: '/kontakty', icon: '☎️', label: 'Контакти' },
]

export default function QuickLinks() {
  return (
    <div className="quick-links grid grid-3">
      {items.map((item) => (
        <Link to={item.to} key={item.to} className="card quick-link">
          <span className="quick-link-icon" aria-hidden="true">
            {item.icon}
          </span>
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  )
}
