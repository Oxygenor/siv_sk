import { useEffect } from 'react'

const SITE_NAME = 'Сиваковецька гімназія'
const SITE_URL = 'https://syvakovetska.vn.ua'

function setMeta(name, content) {
  if (!content) return
  let tag = document.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

// Sets the tab title, meta description and canonical link for the current page.
// GitHub Pages has no server-side rendering, so this runs client-side after mount —
// good enough for Googlebot (which executes JS) even if it briefly shows the default title.
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE_NAME}` : SITE_NAME
    setMeta('description', description)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `${SITE_URL}${window.location.pathname}`)
  }, [title, description])
}
