import { useState } from 'react'
import { useCollection } from '../hooks/useCollection'
import { addItem, deleteItem, updateItem } from '../firebase/firestore'
import { uploadFile } from '../firebase/storage'

const emptyForm = { title: '', slug: '', body: '' }

function slugify(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-zа-яії0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '')
}

export default function SectionsManager() {
  const { data: sections, loading } = useCollection('sections', { orderByField: 'createdAt' })
  const [form, setForm] = useState(emptyForm)
  const [file, setFile] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [busy, setBusy] = useState(false)

  function update(field, value) {
    setForm((f) => {
      const next = { ...f, [field]: value }
      if (field === 'title' && !editingId) next.slug = slugify(value)
      return next
    })
  }

  function startEdit(item) {
    setEditingId(item.id)
    setForm({ title: item.title, slug: item.slug, body: item.body || '' })
  }

  function resetForm() {
    setForm(emptyForm)
    setFile(null)
    setEditingId(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.title || !form.slug) return
    setBusy(true)
    try {
      let fileUrl
      if (file) {
        const uploaded = await uploadFile(`sections/${Date.now()}_${file.name}`, file)
        fileUrl = uploaded.url
      }
      const payload = { ...form, ...(fileUrl ? { fileUrl } : {}) }
      if (editingId) {
        await updateItem('sections', editingId, payload)
      } else {
        await addItem('sections', payload)
      }
      resetForm()
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Видалити цей розділ?')) return
    await deleteItem('sections', id)
  }

  return (
    <div>
      <h1>Розділи</h1>
      <p className="muted">
        Створюйте нові сторінки сайту — вони з’являться за адресою «/rozdily/адреса-розділу» і в списку
        «Розділи» у футері.
      </p>

      <form className="admin-panel" onSubmit={handleSubmit}>
        <h3>{editingId ? 'Редагувати розділ' : 'Новий розділ'}</h3>
        <div className="form-field">
          <label htmlFor="s-title">Назва</label>
          <input id="s-title" required value={form.title} onChange={(e) => update('title', e.target.value)} />
        </div>
        <div className="form-field">
          <label htmlFor="s-slug">Адреса (slug)</label>
          <input id="s-slug" required value={form.slug} onChange={(e) => update('slug', e.target.value)} />
        </div>
        <div className="form-field">
          <label htmlFor="s-body">Текст розділу</label>
          <textarea id="s-body" rows={6} value={form.body} onChange={(e) => update('body', e.target.value)} />
        </div>
        <div className="form-field">
          <label htmlFor="s-file">Прикріплений файл (необов’язково)</label>
          <input id="s-file" type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </div>
        <div className="admin-table-actions">
          <button className="btn btn-primary" type="submit" disabled={busy}>
            {busy ? 'Збереження…' : editingId ? 'Зберегти зміни' : 'Створити розділ'}
          </button>
          {editingId && (
            <button className="btn btn-outline" type="button" onClick={resetForm}>
              Скасувати
            </button>
          )}
        </div>
      </form>

      <div className="admin-panel">
        <h3>Наявні розділи</h3>
        {loading ? (
          <p className="muted">Завантаження…</p>
        ) : (
          sections.map((item) => (
            <div className="admin-item-row" key={item.id}>
              <span className="admin-item-title">
                {item.title} <span className="muted">/rozdily/{item.slug}</span>
              </span>
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
