import { Link } from 'react-router-dom'
import './Breadcrumbs.css'

export default function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs container" aria-label="Хлібні крихти">
      <Link to="/">Головна</Link>
      {items.map((item, i) => (
        <span key={i}>
          <span className="breadcrumbs-sep">/</span>
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
        </span>
      ))}
    </nav>
  )
}
