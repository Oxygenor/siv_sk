import { useState } from 'react'
import { useCollection } from '../hooks/useCollection'
import { addItem, deleteItem } from '../firebase/firestore'
import { assetUrl } from '../utils/assetUrl'

export default function GalleryManager() {
  const { data: photos, loading } = useCollection('gallery', { orderByField: 'createdAt' })
  const [album, setAlbum] = useState('')
  const [caption, setCaption] = useState('')
  const [filenames, setFilenames] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const names = filenames
      .split('\n')
      .map((n) => n.trim())
      .filter(Boolean)
    if (!names.length) return
    setBusy(true)
    try {
      for (const name of names) {
        const url = assetUrl('gallery', name)
        await addItem('gallery', { url, album: album || 'Без альбому', caption })
      }
      setFilenames('')
      setCaption('')
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete(photo) {
    if (!confirm('Видалити цей запис з галереї? (сам файл у GitHub це не видалить)')) return
    await deleteItem('gallery', photo.id)
  }

  return (
    <div>
      <h1>Фотогалерея</h1>
      <p className="muted">
        Спершу завантажте фото у папку <code>public/gallery</code> репозиторію на GitHub («Add file → Upload
        files», можна одразу декілька файлів) і зачекайте ~1 хвилину, поки сайт перезбереться. Потім вкажіть
        тут точні назви файлів (по одній на рядок) — вони одразу з'являться на сторінці «Фотогалерея».
      </p>

      <form className="admin-panel" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="album">Альбом (напр. «День Знань 2025»)</label>
          <input id="album" value={album} onChange={(e) => setAlbum(e.target.value)} />
        </div>
        <div className="form-field">
          <label htmlFor="caption">Підпис (необов’язково, для всіх фото цієї партії)</label>
          <input id="caption" value={caption} onChange={(e) => setCaption(e.target.value)} />
        </div>
        <div className="form-field">
          <label htmlFor="photos">Назви файлів у public/gallery (по одній на рядок)</label>
          <textarea
            id="photos"
            rows={4}
            required
            placeholder={'den-znan-1.jpg\nden-znan-2.jpg'}
            value={filenames}
            onChange={(e) => setFilenames(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={busy}>
          {busy ? 'Збереження…' : 'Додати'}
        </button>
      </form>

      <div className="admin-panel">
        <h3>Фото в галереї ({photos.length})</h3>
        {loading ? (
          <p className="muted">Завантаження…</p>
        ) : (
          photos.map((photo) => (
            <div className="admin-item-row" key={photo.id}>
              <img src={photo.url} alt="" />
              <span className="admin-item-title">{photo.album}</span>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(photo)}>
                Видалити
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
