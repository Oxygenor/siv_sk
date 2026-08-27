import { useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import PageHero from '../components/PageHero'
import NewsCard from '../components/NewsCard'
import Loader, { EmptyState } from '../components/Loader'
import { useCollection } from '../hooks/useCollection'
import { events20252026, events20242025Note } from '../data/events'
import '../styles/tabs.css'

const TABS = [
  { id: 'news', label: 'Стрічка новин' },
  { id: '2025', label: 'Шкільне життя 2025–2026' },
  { id: '2024', label: 'Шкільне життя 2024–2025' },
]

export default function News() {
  const [tab, setTab] = useState('news')
  const { data: news, loading } = useCollection('news', { orderByField: 'createdAt' })

  return (
    <>
      <PageHero eyebrow="Новини" title="Новини та шкільне життя" lead="Оголошення, події та хронологія шкільного життя гімназії." />
      <Breadcrumbs items={[{ label: 'Новини та події' }]} />

      <section className="section">
        <div className="container">
          <div className="tabs" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                className={`tabs-btn ${tab === t.id ? 'is-active' : ''}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'news' &&
            (loading ? (
              <Loader />
            ) : news.length ? (
              <div className="grid grid-3">
                {news.map((item) => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <EmptyState label="Новини з’являться тут одразу, як тільки адміністратор їх опублікує." />
            ))}

          {tab === '2025' && (
            <ol className="timeline">
              {events20252026.map((event, i) => (
                <li key={event} className="timeline-item">
                  <span className="timeline-index">{i + 1}</span>
                  <span>{event}</span>
                </li>
              ))}
            </ol>
          )}

          {tab === '2024' && (
            <div>
              <p className="muted">{events20242025Note}</p>
              <Link to="/fotogalereya" className="btn btn-outline">
                Переглянути фотоархів →
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
