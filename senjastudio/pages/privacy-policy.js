import Layout from '../components/Layout'

const sections = [
  { title: 'Who we are', content: 'Senja Studio is a specialist mortgage broker website design agency. Our website address is senjastudio.co.uk. We can be contacted at dan@senjastudio.co.uk.' },
  { title: 'What data we collect', content: 'We collect information you voluntarily provide when you submit a contact form, book a free call, or request a site audit. This includes your name, email address, and any information you provide about your mortgage broking firm. We also collect standard analytics data through Google Analytics, including pages visited, time on site, and general location data.' },
  { title: 'How we use your data', content: 'We use the information you provide to respond to your enquiry, provide the services you\'ve requested, and send you information relevant to your enquiry. We do not sell your data to third parties. We do not use your data for automated decision-making or profiling.' },
  { title: 'Legal basis for processing', content: 'We process your personal data on the basis of legitimate interest (responding to business enquiries) and, where you have given explicit consent, for marketing communications. You can withdraw consent at any time by contacting us at dan@senjastudio.co.uk.' },
  { title: 'Data retention', content: 'We retain enquiry data for up to 24 months after last contact. Analytics data is retained in accordance with Google Analytics\' standard retention policies. You can request deletion of your personal data at any time.' },
  { title: 'Cookies', content: 'We use cookies to analyse site traffic and improve your experience. Analytics cookies are only set after you provide consent via our cookie banner. You can decline cookies and the site will continue to function. Essential cookies (required for the site to function) are set regardless of consent.' },
  { title: 'Third parties', content: 'We use Google Analytics for website analytics, Formspree for form processing, and Calendly for booking management. Each of these services has its own privacy policy governing how they process data on our behalf.' },
  { title: 'Your rights', content: 'Under UK GDPR, you have the right to access, correct, or delete your personal data. You have the right to object to processing and to data portability. To exercise any of these rights, contact us at dan@senjastudio.co.uk. You also have the right to lodge a complaint with the Information Commissioner\'s Office (ICO) at ico.org.uk.' },
  { title: 'Governing law', content: 'This privacy policy is governed by the laws of England and Wales.' },
  { title: 'Contact', content: 'For any privacy-related queries, contact Dan Senja at dan@senjastudio.co.uk.' },
]

export default function PrivacyPolicy() {
  return (
    <Layout title="Privacy Policy" description="Senja Studio privacy policy." canonical="/privacy-policy">
      <div style={{ background: 'var(--navy)', padding: '64px 48px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 600, color: 'var(--white)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)', marginTop: '12px' }}>Last updated: July 2025</p>
      </div>
      <div style={{ maxWidth: '740px', margin: '0 auto', padding: '56px 32px' }}>
        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom: '36px', paddingBottom: '36px', borderBottom: i < sections.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', fontWeight: 500, color: 'var(--navy)', marginBottom: '12px' }}>{s.title}</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.85 }}>{s.content}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}
