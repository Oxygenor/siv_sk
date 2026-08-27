import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Loader from './Loader'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <Loader label="Перевірка доступу…" />
  if (!user) return <Navigate to="/admin" replace />
  return children
}
