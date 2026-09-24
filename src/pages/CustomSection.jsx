import { useParams, Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import PhotoSlider from '../components/PhotoSlider'
import { usePageMeta } from '../hooks/usePageMeta'
import { sections } from '../data/sections'
import { assetUrl } from '../utils/assetUrl'
import '../styles/news-detail.css'

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
  const photoGroups = item.photoGroups ?? []
  const hours = item.hours ?? []
  const todayIndex = (new Date().getDay() + 6) % 7

  return (
    <>
      <Breadcrumbs items={[{ to: '/rozdily', label: 'Розділи' }, { label: item.title }]} />
      <article className="section container news-detail">
        <h1>{item.title}</h1>
        {item.body && <p style={{ whiteSpace: 'pre-wrap' }}>{item.body}</p>}
        {hours.length > 0 && (
          <table className="hours-table">
            <tbody>
              {hours.map((row, i) => (
                <tr key={row.day} className={i === todayIndex ? 'hours-today' : undefined}>
                  <th scope="row">{row.day}</th>
                  <td className={row.closed ? 'hours-closed' : undefined}>
                    {row.closed ? 'Зачинено' : row.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {photos.length > 0 && (
          <div className="section-photo-grid">
            {photos.map((photo) => (
              <a key={photo} href={assetUrl('sections', photo)} target="_blank" rel="noreferrer">
                <img src={assetUrl('sections', photo)} alt={item.title} />
              </a>
            ))}
          </div>
        )}
        {photoGroups.map((group) => (
          <PhotoSlider key={group.title} title={group.title} photos={group.photos} />
        ))}
        {fileUrl && (
          <a className="btn btn-outline" href={fileUrl} target="_blank" rel="noreferrer">
            Завантажити прикріплений файл
          </a>
        )}
      </article>
    </>
  )
}
