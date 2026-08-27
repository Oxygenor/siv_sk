import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from './config'

export async function uploadFile(path, file) {
  const fileRef = ref(storage, path)
  await uploadBytes(fileRef, file)
  const url = await getDownloadURL(fileRef)
  return { url, path }
}

export async function removeFile(path) {
  if (!path) return
  try {
    await deleteObject(ref(storage, path))
  } catch {
    // файл вже міг бути видалений — ігноруємо
  }
}
