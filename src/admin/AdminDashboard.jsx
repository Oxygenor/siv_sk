import { useCollection } from '../hooks/useCollection'

export default function AdminDashboard() {
  const { data: news } = useCollection('news')
  const { data: documents } = useCollection('documents')
  const { data: gallery } = useCollection('gallery')
  const { data: messages } = useCollection('messages')

  const unread = messages.filter((m) => !m.read).length

  return (
    <div>
      <h1>Огляд</h1>
      <p className="muted">Швидка статистика вашого сайту.</p>
      <div className="admin-dash-grid">
        <div className="card admin-dash-card">
          <div className="num">{news.length}</div>
          <div className="muted">новин</div>
        </div>
        <div className="card admin-dash-card">
          <div className="num">{documents.length}</div>
          <div className="muted">документів</div>
        </div>
        <div className="card admin-dash-card">
          <div className="num">{gallery.length}</div>
          <div className="muted">фото</div>
        </div>
        <div className="card admin-dash-card">
          <div className="num">{unread}</div>
          <div className="muted">нових повідомлень</div>
        </div>
      </div>
    </div>
  )
}
