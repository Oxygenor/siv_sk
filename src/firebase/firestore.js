import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { db, isFirebaseConfigured } from './config'

// Підписка в реальному часі на колекцію. Повертає функцію відписки.
// Якщо Firebase не налаштовано — одразу віддає порожній масив.
export function subscribeToCollection(name, { orderByField, direction = 'desc' } = {}, onData, onError) {
  if (!isFirebaseConfigured) {
    onData([])
    return () => {}
  }
  const ref = collection(db, name)
  const q = orderByField ? query(ref, orderBy(orderByField, direction)) : ref
  return onSnapshot(
    q,
    (snap) => onData(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    (err) => onError?.(err),
  )
}

export async function addItem(collectionName, data) {
  return addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
  })
}

export async function updateItem(collectionName, id, data) {
  return updateDoc(doc(db, collectionName, id), data)
}

export async function deleteItem(collectionName, id) {
  return deleteDoc(doc(db, collectionName, id))
}
