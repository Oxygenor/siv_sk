import { assetUrl } from '../utils/assetUrl'
import './DocumentList.css'

// Показує перелік документів категорії; якщо для слота вказано `filename`,
// показує посилання на файл у public/documents/, інакше — позначку,
// що документ ще не додано.
export default function DocumentList({ items }) {
  return (
    <ul className="doc-list">
      {items.map((item) => {
        const url = assetUrl('documents', item.filename)
        return (
          <li key={item.slug} className="doc-list-item">
            <span className="doc-list-icon" aria-hidden="true">
              📄
            </span>
            <span className="doc-list-title">{item.title}</span>
            {url ? (
              <a className="btn btn-outline btn-sm" href={url} target="_blank" rel="noreferrer">
                Завантажити
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
