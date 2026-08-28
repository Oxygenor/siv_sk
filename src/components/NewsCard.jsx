import { Link } from 'react-router-dom'
import './NewsCard.css'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function NewsCard({ item }) {
  return (
    <article className="card news-card">
      {item.imageUrl && (
        <div className="news-card-image">
          <img src={item.imageUrl} alt="" loading="lazy" />
        </div>
      )}
      <div className="news-card-body">
        {item.date && <span className="muted news-card-date">{formatDate(item.date)}</span>}
        <h3>
          <Link to={`/novyny/${item.id}`}>{item.title}</Link>
        </h3>
        <p className="muted news-card-excerpt">{item.excerpt || item.body?.slice(0, 140)}</p>
        <Link to={`/novyny/${item.id}`} className="news-card-link">
          Читати далі →
        </Link>
      </div>
    </article>
  )
}
