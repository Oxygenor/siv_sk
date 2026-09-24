import { Link } from 'react-router-dom'
import { assetUrl } from '../utils/assetUrl'
import './DocumentList.css'

// Показує перелік документів категорії. Для слота можна вказати `filename`
// (файл лежить у public/documents/), `driveUrl` (посилання на Google Drive
// зі старого сайту) або `pageSlug` (веде на внутрішню сторінку /rozdily/:slug,
// напр. коли "документ" — це кілька фото). Пріоритет:
// filename > driveUrl > pageSlug. Якщо нема жодного — позначка, що документ
// ще не додано.
export default function DocumentList({ items }) {
  return (
    <ul className="doc-list">
      {items.map((item) => {
        const localUrl = assetUrl('documents', item.filename)
        const externalUrl = localUrl || item.driveUrl || null
        const isDrive = !localUrl && Boolean(item.driveUrl)
        return (
          <li key={item.slug} className="doc-list-item">
            <span className="doc-list-icon" aria-hidden="true">
              📄
            </span>
            <span className="doc-list-title">{item.title}</span>
            {externalUrl ? (
              <a className="btn btn-outline btn-sm" href={externalUrl} target="_blank" rel="noreferrer">
                {isDrive ? 'Переглянути в Google Drive' : 'Завантажити'}
              </a>
            ) : item.pageSlug ? (
              <Link className="btn btn-outline btn-sm" to={`/rozdily/${item.pageSlug}`}>
                Переглянути
              </Link>
            ) : (
              <span className="badge doc-list-pending">Буде додано найближчим часом</span>
            )}
          </li>
        )
      })}
    </ul>
  )
}
