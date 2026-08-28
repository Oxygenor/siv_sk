// Документи, фото та інші файли завантажуються напряму у відповідну папку
// public/<folder> через веб-інтерфейс GitHub, а тут лише формується посилання
// на вже опублікований файл.
export function assetUrl(folder, filename) {
  const clean = filename?.trim().replace(/^\/+/, '')
  if (!clean) return null
  return `${import.meta.env.BASE_URL}${folder}/${encodeURIComponent(clean)}`
}
