import Breadcrumbs from '../components/Breadcrumbs'
import PageHero from '../components/PageHero'
import { usefulLinks } from '../data/links'
import '../styles/links.css'

export default function Links() {
  return (
    <>
      <PageHero eyebrow="Ресурси" title="Корисні посилання" lead="Освітні платформи та сервіси, якими користуються учні, батьки та вчителі гімназії." />
      <Breadcrumbs items={[{ label: 'Корисні посилання' }]} />
      <section className="section">
        <div className="container grid grid-3">
          {usefulLinks.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="card link-card">
              <h3>{link.title}</h3>
              <p className="muted">{link.note}</p>
              <span className="link-card-cta">Перейти →</span>
            </a>
          ))}
        </div>
      </section>
    </>
  )
}
