import { Link } from 'react-router-dom'
import { navItems } from '../data/nav'
import { school, externalPortals } from '../data/school'
import './Footer.css'

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
            <a href={school.facebook} target="_blank" rel="noreferrer">
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
          <ul className="footer-list">
            {externalPortals.map((p) => (
              <li key={p.url}>
                <a href={p.url} target="_blank" rel="noreferrer">
                  {p.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {year} {school.shortName}. Усі права захищено.</span>
        <Link to="/admin">Вхід для адміністратора</Link>
      </div>
    </footer>
  )
}
