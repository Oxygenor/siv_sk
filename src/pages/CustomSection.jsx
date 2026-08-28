import { useParams, Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import { sections } from '../data/sections'
import { assetUrl } from '../utils/assetUrl'

export default function CustomSection() {
  const { slug } = useParams()
  const item = sections.find((s) => s.slug === slug)

  if (!item) {
    return (
      <section className="section container">
        <p>Розділ не знайдено.</p>
        <Link to="/rozdily">← До розділів</Link>
      </section>
    )
  }

  const fileUrl = assetUrl('sections', item.filename)

  return (
    <>
      <Breadcrumbs items={[{ to: '/rozdily', label: 'Розділи' }, { label: item.title }]} />
      <article className="section container news-detail">
        <h1>{item.title}</h1>
        <p style={{ whiteSpace: 'pre-wrap' }}>{item.body}</p>
        {fileUrl && (
          <a className="btn btn-outline" href={fileUrl} target="_blank" rel="noreferrer">
            Завантажити прикріплений файл
          </a>
        )}
      </article>
    </>
  )
}
