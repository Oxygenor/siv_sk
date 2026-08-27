// Документи, фото та інші файли не проходять через Firebase Storage (з 2024 року
// Google вимагає платний план Blaze навіть для стандартного bucket) — адміністратор
// завантажує їх напряму у відповідну папку public/<folder> через веб-інтерфейс
// GitHub, а тут лише формується посилання на вже опублікований файл.
export function assetUrl(folder, filename) {
  const clean = filename?.trim().replace(/^\/+/, '')
  if (!clean) return null
  return `${import.meta.env.BASE_URL}${folder}/${encodeURIComponent(clean)}`
}
