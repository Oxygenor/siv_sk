import { useState } from 'react'
import { useCollection } from '../hooks/useCollection'
import { addItem, deleteItem, updateItem } from '../firebase/firestore'
import { uploadFile } from '../firebase/storage'

const emptyForm = { title: '', excerpt: '', body: '' }

export default function NewsManager() {
  const { data: news, loading } = useCollection('news', { orderByField: 'createdAt' })
  const [form, setForm] = useState(emptyForm)
  const [file, setFile] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [busy, setBusy] = useState(false)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function startEdit(item) {
    setEditingId(item.id)
    setForm({ title: item.title, excerpt: item.excerpt || '', body: item.body || '' })
  }

  function resetForm() {
    setForm(emptyForm)
    setFile(null)
    setEditingId(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.title || !form.body) return
    setBusy(true)
    try {
      let imageUrl
      if (file) {
        const uploaded = await uploadFile(`news/${Date.now()}_${file.name}`, file)
        imageUrl = uploaded.url
      }
      if (editingId) {
        await updateItem('news', editingId, { ...form, ...(imageUrl ? { imageUrl } : {}) })
      } else {
        await addItem('news', { ...form, ...(imageUrl ? { imageUrl } : {}) })
      }
      resetForm()
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Видалити цю новину?')) return
    await deleteItem('news', id)
  }

  return (
    <div>
      <h1>Новини</h1>
      <p className="muted">Додавайте оголошення та новини — вони одразу з’являться на сайті.</p>

      <form className="admin-panel" onSubmit={handleSubmit}>
        <h3>{editingId ? 'Редагувати новину' : 'Нова новина'}</h3>
        <div className="form-field">
          <label htmlFor="title">Заголовок</label>
          <input id="title" required value={form.title} onChange={(e) => update('title', e.target.value)} />
        </div>
        <div className="form-field">
          <label htmlFor="excerpt">Короткий опис (для картки)</label>
          <input id="excerpt" value={form.excerpt} onChange={(e) => update('excerpt', e.target.value)} />
        </div>
        <div className="form-field">
          <label htmlFor="body">Текст новини</label>
          <textarea id="body" rows={6} required value={form.body} onChange={(e) => update('body', e.target.value)} />
        </div>
        <div className="form-field">
          <label htmlFor="image">Зображення (необов’язково)</label>
          <input id="image" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </div>
        <div className="admin-table-actions">
          <button className="btn btn-primary" type="submit" disabled={busy}>
            {busy ? 'Збереження…' : editingId ? 'Зберегти зміни' : 'Опублікувати'}
          </button>
          {editingId && (
            <button className="btn btn-outline" type="button" onClick={resetForm}>
              Скасувати
            </button>
          )}
        </div>
      </form>

      <div className="admin-panel">
        <h3>Опубліковані новини</h3>
        {loading ? (
          <p className="muted">Завантаження…</p>
        ) : (
          news.map((item) => (
            <div className="admin-item-row" key={item.id}>
              {item.imageUrl && <img src={item.imageUrl} alt="" />}
              <span className="admin-item-title">{item.title}</span>
              <div className="admin-table-actions">
                <button className="btn btn-outline btn-sm" onClick={() => startEdit(item)}>
                  Редагувати
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>
                  Видалити
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
