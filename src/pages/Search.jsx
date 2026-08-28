import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import PageHero from '../components/PageHero'
import { searchIndex } from '../data/nav'
import { news } from '../data/news'
import { sections } from '../data/sections'

export default function Search() {
  const [params] = useSearchParams()
  const initialQuery = params.get('q') || ''
  const [query, setQuery] = useState(initialQuery)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []

    const pageMatches = searchIndex
      .filter((p) => `${p.title} ${p.keywords}`.toLowerCase().includes(q))
      .map((p) => ({ title: p.title, path: p.path, type: 'Сторінка' }))

    const newsMatches = news
      .filter((n) => `${n.title} ${n.body || ''}`.toLowerCase().includes(q))
      .map((n) => ({ title: n.title, path: `/novyny/${n.id}`, type: 'Новина' }))

    const sectionMatches = sections
      .filter((s) => `${s.title} ${s.body || ''}`.toLowerCase().includes(q))
      .map((s) => ({ title: s.title, path: `/rozdily/${s.slug}`, type: 'Розділ' }))

    return [...pageMatches, ...newsMatches, ...sectionMatches]
  }, [query])

  return (
    <>
      <PageHero eyebrow="Пошук" title="Пошук по сайту" />
      <Breadcrumbs items={[{ label: 'Пошук' }]} />
      <section className="section">
        <div className="container">
          <div className="form-field" style={{ maxWidth: 420, marginBottom: 28 }}>
            <label htmlFor="search-q">Запит</label>
            <input id="search-q" type="search" value={query} onChange={(e) => setQuery(e.target.value)} autoFocus />
          </div>

          {query.trim() === '' && <p className="muted">Введіть запит, щоб знайти сторінки, новини чи документи.</p>}
          {query.trim() !== '' && results.length === 0 && <p className="muted">Нічого не знайдено за запитом «{query}».</p>}

          <ul className="doc-list">
            {results.map((r) => (
              <li key={r.path} className="doc-list-item">
                <span className="badge">{r.type}</span>
                <Link className="doc-list-title" to={r.path}>
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
