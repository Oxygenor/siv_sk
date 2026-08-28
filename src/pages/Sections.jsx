import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import PageHero from '../components/PageHero'
import { EmptyState } from '../components/Loader'
import { sections } from '../data/sections'

export default function Sections() {
  return (
    <>
      <PageHero eyebrow="Додатково" title="Інші розділи" lead="Додаткові сторінки сайту гімназії." />
      <Breadcrumbs items={[{ label: 'Розділи' }]} />
      <section className="section">
        <div className="container">
          {sections.length ? (
            <ul className="doc-list">
              {sections.map((s) => (
                <li key={s.slug} className="doc-list-item">
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
