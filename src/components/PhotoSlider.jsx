import { useState } from 'react'
import { assetUrl } from '../utils/assetUrl'
import './PhotoSlider.css'

// Слайдер для багатосторінкового скан-документа (кожна "сторінка" — окреме фото
// з public/sections/). Стрілки/крапки показуються лише якщо фото більше одного.
export default function PhotoSlider({ title, photos }) {
  const [index, setIndex] = useState(0)

  if (!photos?.length) return null

  const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length)
  const next = () => setIndex((i) => (i + 1) % photos.length)
  const url = assetUrl('sections', photos[index])

  return (
    <div className="photo-slider">
      {title && <h3 className="photo-slider-title">{title}</h3>}
      <div className="photo-slider-viewport">
        {photos.length > 1 && (
          <button
            type="button"
            className="photo-slider-arrow photo-slider-prev"
            onClick={prev}
            aria-label="Попередня сторінка"
          >
            ‹
          </button>
        )}
        <a href={url} target="_blank" rel="noreferrer">
          <img src={url} alt={`${title ?? 'Фото'} — сторінка ${index + 1}`} />
        </a>
        {photos.length > 1 && (
          <button
            type="button"
            className="photo-slider-arrow photo-slider-next"
            onClick={next}
            aria-label="Наступна сторінка"
          >
            ›
          </button>
        )}
      </div>
      {photos.length > 1 && (
        <div className="photo-slider-dots">
          {photos.map((photo, i) => (
            <button
              key={photo}
              type="button"
              className={`photo-slider-dot${i === index ? ' active' : ''}`}
              aria-label={`Сторінка ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
