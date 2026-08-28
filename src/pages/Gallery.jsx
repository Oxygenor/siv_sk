import { useMemo, useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import PageHero from '../components/PageHero'
import { EmptyState } from '../components/Loader'
import { gallery } from '../data/gallery'
import { assetUrl } from '../utils/assetUrl'
import '../styles/gallery.css'

const photos = gallery.map((p) => ({ ...p, url: assetUrl('gallery', p.filename) }))

export default function Gallery() {
  const [active, setActive] = useState(null)
  const [albumFilter, setAlbumFilter] = useState('all')

  const albums = useMemo(() => {
    const set = new Set(photos.map((p) => p.album).filter(Boolean))
    return ['all', ...set]
  }, [])

  const visible = albumFilter === 'all' ? photos : photos.filter((p) => p.album === albumFilter)

  return (
    <>
      <PageHero eyebrow="Галерея" title="Фотогалерея" lead="Світлини зі шкільного життя, свят та подій гімназії." />
      <Breadcrumbs items={[{ label: 'Фотогалерея' }]} />

      <section className="section">
        <div className="container">
          {albums.length > 1 && (
            <div className="gallery-filters">
              {albums.map((a) => (
                <button
                  key={a}
                  className={`btn btn-sm ${albumFilter === a ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setAlbumFilter(a)}
                >
                  {a === 'all' ? 'Усі альбоми' : a}
                </button>
              ))}
            </div>
          )}

          {visible.length ? (
            <div className="gallery-grid">
              {visible.map((photo) => (
                <button key={photo.id} className="gallery-thumb" onClick={() => setActive(photo)}>
                  <img src={photo.url} alt={photo.caption || ''} loading="lazy" />
                </button>
              ))}
            </div>
          ) : (
            <EmptyState label="Фотографії з’являться тут, щойно їх додадуть." />
          )}
        </div>
      </section>

      {active && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" onClick={() => setActive(null)}>
          <button className="gallery-lightbox-close" aria-label="Закрити" onClick={() => setActive(null)}>
            ✕
          </button>
          <img src={active.url} alt={active.caption || ''} onClick={(e) => e.stopPropagation()} />
          {active.caption && <p className="gallery-lightbox-caption">{active.caption}</p>}
        </div>
      )}
    </>
  )
}
