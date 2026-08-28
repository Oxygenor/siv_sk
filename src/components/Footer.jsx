import { Link } from 'react-router-dom'
import { navItems } from '../data/nav'
import { school, externalPortals } from '../data/school'
import { assetUrl } from '../utils/assetUrl'
import './Footer.css'

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="currentColor">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">{school.shortName}</div>
          <p className="muted">{school.fullName}</p>
          <p className="muted">{school.address}</p>
          <p>
            <a href={school.phoneHref}>{school.phone}</a>
          </p>
          <p>
            <a href={`mailto:${school.email}`}>{school.email}</a>
          </p>
          <p>
            <a href={school.facebook} target="_blank" rel="noreferrer" className="footer-facebook-link">
              <FacebookIcon />
              Facebook-група гімназії
            </a>
          </p>
        </div>

        <div>
          <h3 className="footer-heading">Карта сайту</h3>
          <ul className="footer-list">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
                {item.anchors && (
                  <ul className="footer-sublist">
                    {item.anchors.map((a) => (
                      <li key={a.id}>
                        <Link to={`${item.to}#${a.id}`}>{a.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="footer-heading">Освітні портали</h3>
          <div className="footer-portals">
            {externalPortals.map((p) => {
              const logoUrl = p.logo ? assetUrl('portals', p.logo) : null
              return (
                <a
                  key={p.url}
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  title={p.title}
                  className={logoUrl ? '' : 'footer-portal-text'}
                >
                  {logoUrl ? <img src={logoUrl} alt={p.title} loading="lazy" /> : p.title}
                </a>
              )
            })}
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {year} {school.shortName}. Усі права захищено.</span>
      </div>
    </footer>
  )
}
