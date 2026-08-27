import { useCollection } from '../hooks/useCollection'
import { deleteItem, updateItem } from '../firebase/firestore'

export default function MessagesManager() {
  const { data: messages, loading } = useCollection('messages', { orderByField: 'createdAt' })

  async function markRead(id, read) {
    await updateItem('messages', id, { read })
  }
  async function handleDelete(id) {
    if (!confirm('Видалити повідомлення?')) return
    await deleteItem('messages', id)
  }

  return (
    <div>
      <h1>Повідомлення</h1>
      <p className="muted">Звернення, надіслані через контактну форму на сайті.</p>

      <div className="admin-panel">
        {loading ? (
          <p className="muted">Завантаження…</p>
        ) : messages.length ? (
          messages.map((m) => (
            <div className="admin-item-row" key={m.id} style={{ alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <strong>{m.name}</strong> {!m.read && <span className="badge">нове</span>}
                <p className="muted" style={{ margin: '2px 0' }}>
                  {m.email}
                </p>
                <p style={{ margin: 0 }}>{m.message}</p>
              </div>
              <div className="admin-table-actions">
                <button className="btn btn-outline btn-sm" onClick={() => markRead(m.id, !m.read)}>
                  {m.read ? 'Позначити новим' : 'Позначити прочитаним'}
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(m.id)}>
                  Видалити
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="muted">Повідомлень поки немає.</p>
        )}
      </div>
    </div>
  )
}
