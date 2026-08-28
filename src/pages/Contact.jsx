import { useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import PageHero from '../components/PageHero'
import { school } from '../data/school'
import '../styles/contact.css'

const initialForm = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    const subject = `Повідомлення з сайту від ${form.name}`
    const body = `${form.message}\n\nВідповідь надсилайте на: ${form.email}`
    window.location.href = `mailto:${school.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <>
      <PageHero eyebrow="Контакти" title="Зв’яжіться з нами" lead="Напишіть нам, зателефонуйте або завітайте особисто." />
      <Breadcrumbs items={[{ label: 'Контакти' }]} />

      <section className="section">
        <div className="container contact-grid">
          <div className="card contact-info">
            <h2>Реквізити</h2>
            <p>
              <strong>Адреса:</strong> {school.address}
            </p>
            <p>
              <strong>Телефон:</strong> <a href={school.phoneHref}>{school.phone}</a>
            </p>
            <p>
              <strong>Email:</strong> <a href={`mailto:${school.email}`}>{school.email}</a>
            </p>
            <p>
              <strong>Facebook:</strong>{' '}
              <a href={school.facebook} target="_blank" rel="noreferrer">
                Група гімназії
              </a>
            </p>
            <div className="contact-map">
              <iframe
                title="Карта — Сиваковецька гімназія"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(school.address)}&z=15&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <form className="card contact-form" onSubmit={handleSubmit}>
            <h2>Написати повідомлення</h2>
            <p className="muted">Кнопка нижче відкриє вашу поштову програму з готовим листом до школи.</p>
            <div className="form-field">
              <label htmlFor="name">Ім’я</label>
              <input id="name" required value={form.name} onChange={(e) => update('name', e.target.value)} />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="message">Повідомлення</label>
              <textarea
                id="message"
                rows={5}
                required
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Надіслати
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
