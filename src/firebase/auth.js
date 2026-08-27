import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import { auth, isFirebaseConfigured } from './config'

export function subscribeToAuth(callback) {
  if (!isFirebaseConfigured) {
    callback(null)
    return () => {}
  }
  return onAuthStateChanged(auth, callback)
}

export async function signIn(email, password) {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase не налаштовано. Заповніть змінні середовища VITE_FIREBASE_*.')
  }
  const cred = await signInWithEmailAndPassword(auth, email, password)
  return cred.user
}

export async function signOut() {
  if (!isFirebaseConfigured) return
  await firebaseSignOut(auth)
}
