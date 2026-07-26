import Layout from '../components/Layout'

const terms = [
  { letter: 'C', term: 'Call to Action (CTA)', definition: 'A button, link, or prompt that tells a website visitor what to do next. On a mortgage broker site, this is typically a "Book a Free Call" button. The placement, wording, and design of your CTA is one of the single biggest factors in whether visitors become enquiries.' },
  { letter: 'C', term: 'Conversion Rate', definition: 'The percentage of website visitors who take a desired action — typically booking a call or submitting an enquiry. A typical broker site converts at 1–2%. A well-built, conversion-optimised site can reach 4–8% or higher.' },
  { letter: 'C', term: 'Conversion Rate Optimisation (CRO)', definition: 'The practice of improving a website to increase the percentage of visitors who take action. This includes testing headlines, restructuring layouts, improving CTAs, adding social proof, and reducing friction in the booking process.' },
  { letter: 'F', term: 'FCA Authorisation Statement', definition: 'A declaration required on every page of a mortgage broker\'s website confirming that the firm is authorised and regulated by the Financial Conduct Authority. It must include the firm\'s FCA registration number and typically appears in the footer.' },
  { letter: 'L', term: 'Lead Capture', definition: 'Any mechanism on a website that collects contact information from visitors. This includes contact forms, callback request forms, free guide downloads, qualification quizzes, and AI chatbots.' },
  { letter: 'M', term: 'Mobile-First Design', definition: 'An approach to web design where the mobile experience is designed before the desktop version. Over 60% of mortgage-related searches happen on mobile.' },
  { letter: 'S', term: 'Segmented CTA', definition: 'A call-to-action system that directs different types of visitors to different booking flows based on their situation. Rather than one generic "Get in Touch" button, a segmented CTA might offer three paths: "I\'m self-employed", "I\'m a first-time buyer", "I\'ve been turned down before".' },
  { letter: 'S', term: 'Social Proof', definition: 'Evidence that other people have trusted you and had a positive experience. On a mortgage broker website, social proof includes Google reviews and star ratings, client testimonials, and case study outcomes.' },
]

export default function Glossary() {
  return (
    <Layout
      title="Mortgage Broker Website Glossary"
      description="Clear definitions of mortgage broker website terms — from segmented CTAs to FCA compliance and conversion rate optimisation."
      canonical="/glossary"
    >
      <div style={{ background: 'var(--navy)', padding: '72px 48px 64px', textAlign: 'center' }}>
        <span className="section-label" style={{ display: 'block', marginBottom: '16px' }}>Broker website terminology</span>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 600, color: 'var(--white)', lineHeight: 1.1, marginBottom: '16px', letterSpacing: '-0.02em' }}>
          The mortgage broker<br /><em style={{ color: 'var(--gold-light)' }}>website glossary.</em>
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.85 }}>
          Clear definitions of the terms that matter when building a high-converting mortgage broker website.
        </p>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '72px 48px' }}>
        {terms.map((t, i) => (
          <div key={i} className="term">
            <h3>{t.term}</h3>
            <p>{t.definition}</p>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--navy)', padding: '56px 48px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: '2rem', fontWeight: 500, color: 'var(--white)', marginBottom: '12px' }}>
          Want a site built around<br /><em style={{ color: 'var(--gold-light)' }}>these principles?</em>
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.45)', maxWidth: '480px', margin: '0 auto 28px', lineHeight: 1.8 }}>
          Every Senja Studio build is built around conversion fundamentals. Book a call and see the difference.
        </p>
        <button className="btn-gold" onClick={() => document.querySelector('button.nav-cta')?.click()}>
          Book a Free Call
        </button>
      </div>
    </Layout>
  )
}
