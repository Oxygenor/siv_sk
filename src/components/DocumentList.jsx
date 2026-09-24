import { assetUrl } from '../utils/assetUrl'
import './DocumentList.css'

// Показує перелік документів категорії. Для слота можна вказати або `filename`
// (файл лежить у public/documents/), або `driveUrl` (посилання на Google Drive
// зі старого сайту) — якщо є обидва, пріоритет має локальний файл. Якщо нема
// жодного — позначка, що документ ще не додано.
export default function DocumentList({ items }) {
  return (
    <ul className="doc-list">
      {items.map((item) => {
        const localUrl = assetUrl('documents', item.filename)
        const url = localUrl || item.driveUrl || null
        const isDrive = !localUrl && Boolean(item.driveUrl)
        return (
          <li key={item.slug} className="doc-list-item">
            <span className="doc-list-icon" aria-hidden="true">
              📄
            </span>
            <span className="doc-list-title">{item.title}</span>
            {url ? (
              <a className="btn btn-outline btn-sm" href={url} target="_blank" rel="noreferrer">
                {isDrive ? 'Переглянути в Google Drive' : 'Завантажити'}
              </a>
            ) : (
              <span className="badge doc-list-pending">Буде додано найближчим часом</span>
            )}
          </li>
        )
      })}
    </ul>
  )
}
