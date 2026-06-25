export default function SectionTitle({ eyebrow, title, desc, center = true }) {
  return (
    <div className={`mb-12 reveal ${center ? 'mx-auto max-w-2xl text-center' : ''}`}>
      {eyebrow && (
        <span className="inline-block text-sm font-semibold uppercase tracking-widest text-accent-ink">
          {eyebrow}
        </span>
      )}
      <h2 className="heading mt-3 text-3xl font-bold sm:text-4xl">{title}</h2>
      <div className={`mt-4 h-1 w-16 rounded bg-gold ${center ? 'mx-auto' : ''}`} />
      {desc && <p className="mt-5 text-muted">{desc}</p>}
    </div>
  )
}
