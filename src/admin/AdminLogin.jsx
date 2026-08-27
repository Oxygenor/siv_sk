import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { signIn } from '../firebase/auth'
import { isFirebaseConfigured } from '../firebase/config'
import { useAuth } from '../hooks/useAuth'
import './admin.css'

export default function AdminLogin() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && user) return <Navigate to="/admin/dashboard" replace />

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await signIn(email, password)
      navigate('/admin/dashboard')
    } catch {
      setError('Не вдалося увійти. Перевірте email і пароль.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="admin-login">
      <form className="card admin-login-card" onSubmit={handleSubmit}>
        <h1>Вхід для адміністратора</h1>
        {!isFirebaseConfigured && (
          <p className="muted">
            Firebase ще не налаштовано. Додайте змінні середовища <code>VITE_FIREBASE_*</code>, щоб
            увімкнути адмін-панель.
          </p>
        )}
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-field">
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="contact-status contact-status-error">{error}</p>}
        <button className="btn btn-primary" type="submit" disabled={submitting || !isFirebaseConfigured}>
          {submitting ? 'Вхід…' : 'Увійти'}
        </button>
      </form>
    </section>
  )
}
