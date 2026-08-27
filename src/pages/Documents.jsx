import { useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import PageHero from '../components/PageHero'
import DocumentList from '../components/DocumentList'
import { documentCategories } from '../data/documents'

export default function Documents() {
  const [query, setQuery] = useState('')

  const filtered = documentCategories
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((i) => i.title.toLowerCase().includes(query.toLowerCase())),
    }))
    .filter((cat) => cat.items.length > 0)

  return (
    <>
      <PageHero
        eyebrow="Документи"
        title="Документи та публічна інформація"
        lead="Офіційні документи закладу відповідно до вимог публічності та прозорості: статут, ліцензія, освітня програма, фінансова звітність та інше."
      />
      <Breadcrumbs items={[{ label: 'Документи' }]} />

      <section className="section">
        <div className="container">
          <div className="form-field" style={{ maxWidth: 360, marginBottom: 32 }}>
            <label htmlFor="doc-search">Пошук документа</label>
            <input
              id="doc-search"
              type="search"
              placeholder="Напр. «статут», «звіт»…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {filtered.map((cat) => (
            <div key={cat.id} style={{ marginBottom: 36 }}>
              <h2>{cat.title}</h2>
              <DocumentList items={cat.items} />
            </div>
          ))}
          {filtered.length === 0 && <p className="muted">Нічого не знайдено за вашим запитом.</p>}
        </div>
      </section>
    </>
  )
}
