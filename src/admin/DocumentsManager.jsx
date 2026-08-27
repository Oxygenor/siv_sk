import { useState } from 'react'
import { useCollection } from '../hooks/useCollection'
import { addItem, deleteItem, updateItem } from '../firebase/firestore'
import { assetUrl } from '../utils/assetUrl'
import { allDocumentSlots } from '../data/documents'

export default function DocumentsManager() {
  const { data: documents, loading } = useCollection('documents')
  const [slotSlug, setSlotSlug] = useState(allDocumentSlots[0]?.slug || '')
  const [customTitle, setCustomTitle] = useState('')
  const [customCategory, setCustomCategory] = useState('')
  const [useCustom, setUseCustom] = useState(false)
  const [filename, setFilename] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!filename.trim()) return
    setBusy(true)
    try {
      const slug = useCustom
        ? customTitle.trim().toLowerCase().replace(/[^a-zа-яії0-9]+/gi, '-')
        : slotSlug
      const title = useCustom
        ? customTitle
        : allDocumentSlots.find((d) => d.slug === slotSlug)?.title
      const category = useCustom ? customCategory || 'Інше' : allDocumentSlots.find((d) => d.slug === slotSlug)?.category

      const fileUrl = assetUrl('documents', filename)
      const existing = documents.find((d) => d.slug === slug)

      if (existing) {
        await updateItem('documents', existing.id, { fileUrl, title, category })
      } else {
        await addItem('documents', { slug, title, category, fileUrl })
      }

      setFilename('')
      setCustomTitle('')
      setCustomCategory('')
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete(item) {
    if (!confirm(`Видалити запис про документ «${item.title}»? (сам файл у GitHub це не видалить)`)) return
    await deleteItem('documents', item.id)
  }

  return (
    <div>
      <h1>Документи</h1>
      <p className="muted">
        Спершу завантажте файл (PDF/DOCX) у папку <code>public/documents</code> репозиторію на GitHub
        (кнопка «Add file → Upload files», прямо в браузері, без командного рядка) і зачекайте ~1 хвилину,
        поки сайт перезбереться. Потім вкажіть тут точну назву файлу — вона з'явиться на сторінці «Документи».
      </p>

      <form className="admin-panel" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>
            <input type="checkbox" checked={useCustom} onChange={(e) => setUseCustom(e.target.checked)} /> Новий
            (нестандартний) документ
          </label>
        </div>

        {useCustom ? (
          <>
            <div className="form-field">
              <label htmlFor="doc-title">Назва документа</label>
              <input id="doc-title" required value={customTitle} onChange={(e) => setCustomTitle(e.target.value)} />
            </div>
            <div className="form-field">
              <label htmlFor="doc-category">Категорія</label>
              <input id="doc-category" value={customCategory} onChange={(e) => setCustomCategory(e.target.value)} />
            </div>
          </>
        ) : (
          <div className="form-field">
            <label htmlFor="doc-slot">Розділ сайту</label>
            <select id="doc-slot" value={slotSlug} onChange={(e) => setSlotSlug(e.target.value)}>
              {allDocumentSlots.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.category} — {d.title}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-field">
          <label htmlFor="doc-file">Назва файлу в public/documents (напр. statut.pdf)</label>
          <input
            id="doc-file"
            required
            placeholder="statut.pdf"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" type="submit" disabled={busy}>
          {busy ? 'Збереження…' : 'Зберегти'}
        </button>
      </form>

      <div className="admin-panel">
        <h3>Додані документи</h3>
        {loading ? (
          <p className="muted">Завантаження…</p>
        ) : documents.length ? (
          documents.map((item) => (
            <div className="admin-item-row" key={item.id}>
              <span className="admin-item-title">
                {item.category ? `${item.category} — ` : ''}
                {item.title}
              </span>
              <div className="admin-table-actions">
                <a className="btn btn-outline btn-sm" href={item.fileUrl} target="_blank" rel="noreferrer">
                  Переглянути
                </a>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item)}>
                  Видалити
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="muted">Ще немає доданих документів.</p>
        )}
      </div>
    </div>
  )
}
