import { useState } from 'react'
import { useCollection } from '../hooks/useCollection'
import { addItem, deleteItem } from '../firebase/firestore'
import { removeFile, uploadFile } from '../firebase/storage'

export default function GalleryManager() {
  const { data: photos, loading } = useCollection('gallery', { orderByField: 'createdAt' })
  const [album, setAlbum] = useState('')
  const [caption, setCaption] = useState('')
  const [files, setFiles] = useState([])
  const [busy, setBusy] = useState(false)
  const [progress, setProgress] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!files.length) return
    setBusy(true)
    try {
      for (let i = 0; i < files.length; i += 1) {
        const file = files[i]
        setProgress(`Завантаження ${i + 1} з ${files.length}…`)
        const uploaded = await uploadFile(`gallery/${Date.now()}_${file.name}`, file)
        await addItem('gallery', {
          url: uploaded.url,
          storagePath: uploaded.path,
          album: album || 'Без альбому',
          caption,
        })
      }
      setFiles([])
      setCaption('')
    } finally {
      setBusy(false)
      setProgress('')
    }
  }

  async function handleDelete(photo) {
    if (!confirm('Видалити це фото?')) return
    await removeFile(photo.storagePath)
    await deleteItem('gallery', photo.id)
  }

  return (
    <div>
      <h1>Фотогалерея</h1>
      <p className="muted">Завантажуйте фото подій. Можна одразу декілька файлів в один альбом.</p>

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
          <label htmlFor="photos">Фото</label>
          <input
            id="photos"
            type="file"
            accept="image/*"
            multiple
            required
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={busy}>
          {busy ? progress || 'Завантаження…' : 'Завантажити'}
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
