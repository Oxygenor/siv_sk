import { usePageMeta } from '../hooks/usePageMeta'
import './PageHero.css'

export default function PageHero({ eyebrow, title, lead }) {
  usePageMeta(title, lead)

  return (
    <section className="page-hero">
      <div className="container">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {lead && <p className="page-hero-lead">{lead}</p>}
      </div>
    </section>
  )
}
