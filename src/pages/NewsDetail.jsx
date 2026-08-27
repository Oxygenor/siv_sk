import { useParams, Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import Loader from '../components/Loader'
import { useCollection } from '../hooks/useCollection'
import '../styles/news-detail.css'

export default function NewsDetail() {
  const { id } = useParams()
  const { data: news, loading } = useCollection('news')
  const item = news.find((n) => n.id === id)

  if (loading) return <Loader />
  if (!item) {
    return (
      <section className="section container">
        <p>Новину не знайдено.</p>
        <Link to="/novyny">← До новин</Link>
      </section>
    )
  }

  const date = item.createdAt?.toDate
    ? item.createdAt.toDate().toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })
    : ''

  return (
    <>
      <Breadcrumbs items={[{ to: '/novyny', label: 'Новини та події' }, { label: item.title }]} />
      <article className="section container news-detail">
        {date && <span className="muted">{date}</span>}
        <h1>{item.title}</h1>
        {item.imageUrl && <img src={item.imageUrl} alt="" className="news-detail-image" />}
        <p style={{ whiteSpace: 'pre-wrap' }}>{item.body}</p>
        <Link to="/novyny" className="btn btn-outline">
          ← До всіх новин
        </Link>
      </article>
    </>
  )
}
