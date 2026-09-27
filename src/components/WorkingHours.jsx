import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { sections } from '../data/sections'
import './WorkingHours.css'

// Блок «Режим роботи» на головній. Дані беруться з розділу `rezhym-roboty`
// у src/data/sections.js — змінюйте години лише там. Статус «відчинено /
// зачинено» рахується за київським часом, незалежно від часового поясу гостя.
const hours = sections.find((s) => s.slug === 'rezhym-roboty')?.hours ?? []

const SHORT_DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']
const DAY_ACCUSATIVE = ['понеділок', 'вівторок', 'середу', 'четвер', 'п’ятницю', 'суботу', 'неділю']

function parseRange(row) {
  if (!row || row.closed || !row.time) return null
  const [open, close] = row.time.split(/[–-]/).map((t) => t.trim())
  const toMinutes = (t) => {
    const [h, m] = t.split(':').map(Number)
    return h * 60 + m
  }
  return open && close ? { open, close, from: toMinutes(open), to: toMinutes(close) } : null
}

// Поточний день тижня (0 = понеділок) і хвилини від півночі в Києві.
function kyivNow() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Kyiv',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date())
  const get = (type) => parts.find((p) => p.type === type)?.value
  const day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(get('weekday'))
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) }
}

function getStatus({ day, minutes }) {
  const today = parseRange(hours[day])
  if (today && minutes >= today.from && minutes < today.to) {
    return { open: true, text: `Зараз відчинено · до ${today.close}` }
  }
  for (let offset = 0; offset < 7; offset++) {
    const d = (day + offset) % 7
    const range = parseRange(hours[d])
    if (!range || (offset === 0 && minutes >= range.from)) continue
    const when = offset === 0 ? 'сьогодні' : offset === 1 ? 'завтра' : `у ${DAY_ACCUSATIVE[d]}`
    return { open: false, text: `Зараз зачинено · відчинимося ${when} о ${range.open}` }
  }
  return { open: false, text: 'Зараз зачинено' }
}

// Стискає однакові дні поспіль: «Пн – Пт · 09:00–17:00».
function groupDays() {
  const groups = []
  hours.forEach((row, i) => {
    const value = row.closed ? null : row.time
    const last = groups[groups.length - 1]
    if (last && last.value === value) last.end = i
    else groups.push({ start: i, end: i, value })
  })
  return groups.map((g) => ({
    ...g,
    label: g.start === g.end ? SHORT_DAYS[g.start] : `${SHORT_DAYS[g.start]} – ${SHORT_DAYS[g.end]}`,
  }))
}

export default function WorkingHours() {
  const [now, setNow] = useState(kyivNow)
  useEffect(() => {
    const id = setInterval(() => setNow(kyivNow()), 60_000)
    return () => clearInterval(id)
  }, [])

  if (!hours.length) return null
  const status = getStatus(now)
  const groups = groupDays()
  const workGroup = groups.find((g) => g.value)
  const offGroups = groups.filter((g) => !g.value)

  return (
    <div className="wh">
      <div className="wh-card">
        <div className="wh-card-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        {workGroup && (
          <>
            <p className="wh-card-days">{workGroup.label}</p>
            <p className="wh-card-time">{workGroup.value.replace(/\s*[–-]\s*/, ' – ')}</p>
          </>
        )}
        {offGroups.length > 0 && (
          <p className="wh-card-off">{offGroups.map((g) => g.label).join(', ')} — вихідні</p>
        )}
        <p className={`wh-status ${status.open ? 'is-open' : 'is-closed'}`} aria-live="polite">
          <span className="wh-status-dot" aria-hidden="true" />
          {status.text}
        </p>
      </div>

      <ul className="wh-week" aria-label="Режим роботи по днях">
        {hours.map((row, i) => (
          <li key={row.day} className={`wh-day${i === now.day ? ' is-today' : ''}${row.closed ? ' is-off' : ''}`}>
            <span className="wh-day-name">
              {row.day}
              {i === now.day && <span className="wh-today-badge">Сьогодні</span>}
            </span>
            <span className="wh-day-time">{row.closed ? 'Вихідний' : row.time}</span>
          </li>
        ))}
        <li className="wh-more">
          <Link to="/rozdily/rezhym-roboty">Детальніше про режим роботи →</Link>
        </li>
      </ul>
    </div>
  )
}
