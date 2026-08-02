import Layout from '../components/Layout'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Layout title="Page Not Found">
      <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 20px', background: 'var(--royal)' }}>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(6rem,15vw,10rem)', fontWeight: 700, color: 'transparent', WebkitTextStroke: '1px var(--gold)', opacity: 0.3, lineHeight: 1, marginBottom: '8px', letterSpacing: '-0.04em' }}>
          404
        </div>
        <div style={{ width: '60px', height: '2px', background: 'var(--gold)', margin: '24px auto', opacity: 0.5 }} />
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.5rem,4vw,2.5rem)', fontWeight: 500, color: 'var(--white)', marginBottom: '16px', lineHeight: 1.2 }}>
          This page doesn't exist.<br /><em style={{ color: 'var(--gold-light)' }}>Your next client could.</em>
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.78)', maxWidth: '420px', lineHeight: 1.8, marginBottom: '40px' }}>
          The page you're looking for has moved or never existed. But while you're here — if you're a mortgage broker who wants a site that converts, you're in the right place.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn-gold">Back to Homepage</Link>
          <Link href="/#audit" className="btn-ghost">Get a Free Site Audit</Link>
        </div>
      </div>
    </Layout>
  )
}
