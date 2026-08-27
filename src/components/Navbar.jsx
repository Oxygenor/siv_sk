import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { navItems } from '../data/nav'
import { school } from '../data/school'
import './Navbar.css'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSearch(e) {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/poshuk?q=${encodeURIComponent(query.trim())}`)
    setQuery('')
    setOpen(false)
  }

  return (
    <header className="navbar">
      <div className="navbar-top">
        <div className="container navbar-top-inner">
          <span>{school.address}</span>
          <span className="navbar-top-sep">•</span>
          <a href={school.phoneHref}>{school.phone}</a>
          <span className="navbar-top-sep">•</span>
          <a href={`mailto:${school.email}`}>{school.email}</a>
        </div>
      </div>

      <div className="container navbar-main">
        <Link to="/" className="navbar-brand" onClick={() => setOpen(false)}>
          <span className="navbar-brand-badge">СГ</span>
          <span className="navbar-brand-text">
            Сиваковецька
            <br />
            гімназія
          </span>
        </Link>

        <button
          className="navbar-toggle"
          aria-label={open ? 'Закрити меню' : 'Відкрити меню'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navbar-nav ${open ? 'is-open' : ''}`} aria-label="Основна навігація">
          <ul>
            {navItems.map((item) => (
              <li
                key={item.to}
                className={item.anchors ? 'has-dropdown' : ''}
                onMouseEnter={() => item.anchors && setOpenMenu(item.to)}
                onMouseLeave={() => item.anchors && setOpenMenu(null)}
              >
                <div className="navbar-nav-row">
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => (isActive ? 'is-active' : '')}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                  {item.anchors && (
                    <button
                      type="button"
                      className="navbar-caret"
                      aria-label={`Показати підрозділи: ${item.label}`}
                      onClick={() => setOpenMenu(openMenu === item.to ? null : item.to)}
                    >
                      ▾
                    </button>
                  )}
                </div>
                {item.anchors && (
                  <ul className={`navbar-dropdown ${openMenu === item.to ? 'is-open' : ''}`}>
                    {item.anchors.map((a) => (
                      <li key={a.id}>
                        <Link to={`${item.to}#${a.id}`} onClick={() => setOpen(false)}>
                          {a.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <form className="navbar-search" onSubmit={handleSearch} role="search">
            <input
              type="search"
              placeholder="Пошук по сайту…"
              aria-label="Пошук по сайту"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" aria-label="Шукати">
              🔍
            </button>
          </form>
        </nav>
      </div>
    </header>
  )
}
