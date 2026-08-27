import { useCollection } from '../hooks/useCollection'
import './DocumentList.css'

// Показує перелік документів категорії; якщо для слота є завантажений файл
// у Firestore (колекція "documents"), показує посилання на завантаження,
// інакше — позначку, що документ ще не додано.
export default function DocumentList({ items }) {
  const { data: uploaded, loading } = useCollection('documents')

  return (
    <ul className="doc-list">
      {items.map((item) => {
        const match = uploaded.find((d) => d.slug === item.slug)
        return (
          <li key={item.slug} className="doc-list-item">
            <span className="doc-list-icon" aria-hidden="true">
              📄
            </span>
            <span className="doc-list-title">{item.title}</span>
            {match ? (
              <a className="btn btn-outline btn-sm" href={match.fileUrl} target="_blank" rel="noreferrer">
                Завантажити
              </a>
            ) : (
              <span className="badge doc-list-pending">
                {loading ? 'Завантаження…' : 'Буде додано найближчим часом'}
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}
