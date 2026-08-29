import { Link } from 'react-router-dom'
import NewsCard from '../components/NewsCard'
import QuickLinks from '../components/QuickLinks'
import { EmptyState } from '../components/Loader'
import { usePageMeta } from '../hooks/usePageMeta'
import { school } from '../data/school'
import { news } from '../data/news'
import { events20252026 } from '../data/events'
import './Home.css'

export default function Home() {
  usePageMeta(
    null,
    'Комунальний заклад «Сиваковецька гімназія» — новини, розклад, документи та контакти закладу освіти в селі Сиваківці.',
  )
  const latestNews = news.slice(0, 3)
  const nextEvents = events20252026.slice(0, 6)

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <span className="eyebrow">КЗ «Сиваковецька гімназія»</span>
            <h1>Сучасна українська школа</h1>
            <p className="hero-lead">
              Безпечне освітнє середовище, турботливий педагогічний колектив і відкрита комунікація
              з батьками — усе, що потрібно знати про життя гімназії, в одному місці.
            </p>
            <div className="hero-actions">
              <Link to="/novyny" className="btn btn-primary">
                Новини та події
              </Link>
              <Link to="/uchnyam#rozklad" className="btn btn-outline">
                Розклад уроків
              </Link>
            </div>
            <div className="hero-tags">
              <span className="badge">Гаряче харчування</span>
              <span className="badge">Дистанційне навчання</span>
              <span className="badge">Психологічна підтримка</span>
              <span className="badge">Протидія булінгу</span>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-art-blob" />
            <img className="hero-art-icon" src={`${import.meta.env.BASE_URL}iconSite.png`} alt="" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">Швидкий доступ</span>
          <h2>Найпотрібніше — в один клік</h2>
          <QuickLinks />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">Новини</span>
              <h2>Останні новини та оголошення</h2>
            </div>
            <Link to="/novyny" className="btn btn-outline btn-sm">
              Усі новини
            </Link>
          </div>
          {latestNews.length ? (
            <div className="grid grid-3">
              {latestNews.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <EmptyState label="Новини з’являться тут одразу, як тільки їх додадуть." />
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">Шкільне життя 2025–2026</span>
              <h2>Найближчі та заплановані події</h2>
            </div>
            <Link to="/novyny" className="btn btn-outline btn-sm">
              Повний план
            </Link>
          </div>
          <ul className="event-chip-list">
            {nextEvents.map((e) => (
              <li key={e} className="event-chip">
                {e}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container contact-teaser">
          <div>
            <span className="eyebrow">Контакти</span>
            <h2>Завжди на зв’язку</h2>
            <p className="muted">{school.address}</p>
            <p>
              <a href={school.phoneHref}>{school.phone}</a> · <a href={`mailto:${school.email}`}>{school.email}</a>
            </p>
            <Link to="/kontakty" className="btn btn-primary">
              Написати нам
            </Link>
          </div>
          <div className="contact-teaser-map">
            <iframe
              title="Карта — Сиваковецька гімназія"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(school.address)}&z=14&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  )
}
