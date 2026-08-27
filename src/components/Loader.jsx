export default function Loader({ label = 'Завантаження…' }) {
  return <p className="muted loader">{label}</p>
}

export function EmptyState({ label }) {
  return <p className="muted empty-state">{label}</p>
}
