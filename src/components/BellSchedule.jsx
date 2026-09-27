import { useEffect, useState } from 'react'
import { bells } from '../data/bells'
import { sections } from '../data/sections'
import { kyivNow, toMinutes } from '../utils/kyivTime'
import './BellSchedule.css'

// Розклад дзвінків із «живим» статусом: поточний урок / перерва підсвічуються
// за київським часом. Дані — у src/data/bells.js. Навчальні дні беруться з
// режиму роботи (src/data/sections.js, `rezhym-roboty`): у вихідні статус не рахується.
const workDays = (sections.find((s) => s.slug === 'rezhym-roboty')?.hours ?? []).map((h) => !h.closed)

const lessons = bells.map((b) => ({ ...b, from: toMinutes(b.start), to: toMinutes(b.end) }))

// Урок, перерва після нього (якщо є) — в одному масиві, щоб легко підсвітити будь-який.
const rows = lessons.flatMap((l, i) => {
  const next = lessons[i + 1]
  const row = { type: 'lesson', ...l, length: l.to - l.from }
  if (!next) return [row]
  return [row, { type: 'break', from: l.to, to: next.from, length: next.from - l.to }]
})

function getStatus({ day, minutes }) {
  if (!workDays[day]) return { kind: 'off', text: 'Сьогодні вихідний — уроків немає' }
  const first = lessons[0]
  const last = lessons[lessons.length - 1]
  if (minutes < first.from) return { kind: 'before', text: `Уроки почнуться о ${first.start}` }
  if (minutes >= last.to) return { kind: 'after', text: 'Уроки на сьогодні завершено' }
  const index = rows.findIndex((r) => minutes >= r.from && minutes < r.to)
  const row = rows[index]
  const left = row.to - minutes
  const progress = (minutes - row.from) / row.length
  if (row.type === 'lesson') {
    return { kind: 'lesson', index, progress, text: `Зараз ${row.lesson} урок · до кінця ${left} хв` }
  }
  const nextLesson = rows[index + 1]
  return {
    kind: 'break',
    index,
    progress,
    text: `Перерва · ${nextLesson.lesson} урок о ${nextLesson.start} (через ${left} хв)`,
  }
}

export default function BellSchedule() {
  const [now, setNow] = useState(kyivNow)
  useEffect(() => {
    const id = setInterval(() => setNow(kyivNow()), 30_000)
    return () => clearInterval(id)
  }, [])

  const status = getStatus(now)
  const live = status.kind === 'lesson' || status.kind === 'break'

  return (
    <div className="bells">
      <p className={`bells-status is-${status.kind}`} aria-live="polite">
        <span className="bells-status-dot" aria-hidden="true" />
        {status.text}
      </p>
      <ol className="bells-list">
        {rows.map((row, i) => {
          const current = live && status.index === i
          if (row.type === 'break') {
            return (
              <li key={`b${i}`} className={`bells-break${row.length >= 20 ? ' is-long' : ''}${current ? ' is-current' : ''}`}>
                {row.length >= 20 ? 'Велика перерва' : 'Перерва'} · {row.length} хв
                {current && <span className="bells-progress" style={{ '--p': status.progress }} />}
              </li>
            )
          }
          return (
            <li key={`l${row.lesson}`} className={`bells-lesson${current ? ' is-current' : ''}`}>
              <span className="bells-num">{row.lesson}</span>
              <span className="bells-name">{row.lesson} урок</span>
              <span className="bells-time">
                {row.start} – {row.end}
              </span>
              {current && <span className="bells-progress" style={{ '--p': status.progress }} />}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
