import { NavLink, Outlet } from 'react-router-dom'
import { signOut } from '../firebase/auth'
import './admin.css'

const links = [
  { to: '/admin/dashboard', label: 'Огляд' },
  { to: '/admin/news', label: 'Новини' },
  { to: '/admin/documents', label: 'Документи' },
  { to: '/admin/gallery', label: 'Фотогалерея' },
  { to: '/admin/sections', label: 'Розділи' },
  { to: '/admin/messages', label: 'Повідомлення' },
]

export default function AdminLayout() {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-title">Адмін-панель</div>
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? 'is-active' : '')}>
            {l.label}
          </NavLink>
        ))}
        <button className="admin-sidebar-logout" onClick={() => signOut()}>
          Вийти
        </button>
      </aside>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  )
}
