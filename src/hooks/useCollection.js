import { useEffect, useState } from 'react'
import { subscribeToCollection } from '../firebase/firestore'

export function useCollection(name, options = {}) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const orderByField = options.orderByField
  const direction = options.direction || 'desc'

  useEffect(() => {
    setLoading(true)
    const unsub = subscribeToCollection(
      name,
      { orderByField, direction },
      (items) => {
        setData(items)
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      },
    )
    return unsub
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, orderByField, direction])

  return { data, loading, error }
}
