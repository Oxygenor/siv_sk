import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'

export default function NotFound() {
  usePageMeta('Сторінку не знайдено', 'Такої сторінки не існує — можливо, її було переміщено або видалено.')

  return (
    <section className="section container" style={{ textAlign: 'center', padding: '100px 20px' }}>
      <span className="eyebrow">404</span>
      <h1>Сторінку не знайдено</h1>
      <p className="muted">Можливо, її було переміщено або видалено.</p>
      <Link to="/" className="btn btn-primary">
        На головну
      </Link>
    </section>
  )
}
