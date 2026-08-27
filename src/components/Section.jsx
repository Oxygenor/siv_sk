export default function Section({ id, title, children, alt = false }) {
  return (
    <section id={id} className={`section anchor-section ${alt ? 'section-alt' : ''}`}>
      <div className="container">
        {title && <h2>{title}</h2>}
        {children}
      </div>
    </section>
  )
}
