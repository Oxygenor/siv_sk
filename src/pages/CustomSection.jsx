import { useParams, Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import { usePageMeta } from '../hooks/usePageMeta'
import { sections } from '../data/sections'
import { assetUrl } from '../utils/assetUrl'

export default function CustomSection() {
  const { slug } = useParams()
  const item = sections.find((s) => s.slug === slug)

  usePageMeta(item?.title ?? 'Розділ не знайдено', item?.body?.slice(0, 160))

  if (!item) {
    return (
      <section className="section container">
        <p>Розділ не знайдено.</p>
        <Link to="/rozdily">← До розділів</Link>
      </section>
    )
  }

  const fileUrl = assetUrl('sections', item.filename)
  const photos = item.photos ?? []

  return (
    <>
      <Breadcrumbs items={[{ to: '/rozdily', label: 'Розділи' }, { label: item.title }]} />
      <article className="section container news-detail">
        <h1>{item.title}</h1>
        {item.body && <p style={{ whiteSpace: 'pre-wrap' }}>{item.body}</p>}
        {photos.length > 0 && (
          <div className="section-photo-grid">
            {photos.map((photo) => (
              <a key={photo} href={assetUrl('sections', photo)} target="_blank" rel="noreferrer">
                <img src={assetUrl('sections', photo)} alt={item.title} />
              </a>
            ))}
          </div>
        )}
        {fileUrl && (
          <a className="btn btn-outline" href={fileUrl} target="_blank" rel="noreferrer">
            Завантажити прикріплений файл
          </a>
        )}
      </article>
    </>
  )
}
