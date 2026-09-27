// Поточний день тижня (0 = понеділок) і хвилини від півночі за київським часом,
// незалежно від часового поясу відвідувача.
export function kyivNow() {
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

// '09:45' -> 585
export function toMinutes(time) {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}
