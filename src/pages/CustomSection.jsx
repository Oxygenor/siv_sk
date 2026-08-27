import { useParams, Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import Loader from '../components/Loader'
import { useCollection } from '../hooks/useCollection'

export default function CustomSection() {
  const { slug } = useParams()
  const { data: sections, loading } = useCollection('sections')
  const item = sections.find((s) => s.slug === slug)

  if (loading) return <Loader />
  if (!item) {
    return (
      <section className="section container">
        <p>Розділ не знайдено.</p>
        <Link to="/rozdily">← До розділів</Link>
      </section>
    )
  }

  return (
    <>
      <Breadcrumbs items={[{ to: '/rozdily', label: 'Розділи' }, { label: item.title }]} />
      <article className="section container news-detail">
        <h1>{item.title}</h1>
        <p style={{ whiteSpace: 'pre-wrap' }}>{item.body}</p>
        {item.fileUrl && (
          <a className="btn btn-outline" href={item.fileUrl} target="_blank" rel="noreferrer">
            Завантажити прикріплений файл
          </a>
        )}
      </article>
    </>
  )
}
