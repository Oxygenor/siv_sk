import { Link } from 'react-router-dom'

export default function NotFound() {
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
