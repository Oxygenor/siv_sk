import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import PageHero from '../components/PageHero'
import Loader, { EmptyState } from '../components/Loader'
import { useCollection } from '../hooks/useCollection'

export default function Sections() {
  const { data: sections, loading } = useCollection('sections', { orderByField: 'createdAt' })

  return (
    <>
      <PageHero eyebrow="Додатково" title="Інші розділи" lead="Сторінки, додані адміністрацією гімназії." />
      <Breadcrumbs items={[{ label: 'Розділи' }]} />
      <section className="section">
        <div className="container">
          {loading ? (
            <Loader />
          ) : sections.length ? (
            <ul className="doc-list">
              {sections.map((s) => (
                <li key={s.id} className="doc-list-item">
                  <Link className="doc-list-title" to={`/rozdily/${s.slug}`}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState label="Наразі немає додаткових розділів." />
          )}
        </div>
      </section>
    </>
  )
}
