import Layout from '../components/Layout'

const sections = [
  { title: '1. Services', content: 'Senja Studio provides mortgage broker website design and related digital services. The specific services, deliverables, and pricing for each project are agreed in writing before work commences.' },
  { title: '2. Payment terms', content: 'All projects require a 50% deposit before work begins. This deposit is non-refundable once work has started. The remaining 50% is due on delivery of the completed work, before the site goes live.' },
  { title: '3. Delivery timelines', content: 'Standard delivery timelines are: Homepage Build — 5 working days; Full Website — 7 working days. These timelines begin from the date the completed project brief is received, not from the date of payment. Timelines apply to website builds only. AI add-ons (chatbot, voice callers, outreach systems, appointment agents) are scoped and timed separately — typically 3–10 additional working days depending on complexity. All extended timelines are agreed in writing before work begins.' },
  { title: '4. Revisions', content: 'All builds include the number of revision rounds specified in the project agreement (typically 2). Revisions must be submitted as a single consolidated list. Additional revision rounds beyond those included are billed at £75/hour, agreed in advance.' },
  { title: '5. Client responsibilities', content: 'The client is responsible for providing accurate brand information, correct regulatory details (FCA number, authorisation status), and timely feedback during the revision process. Delays caused by late feedback or approval may extend the delivery timeline. Senja Studio is not liable for delays caused by the client.' },
  { title: '6. Intellectual property', content: 'On receipt of full payment, all intellectual property rights in the delivered work transfer to the client. The client owns the website, code, and content in full. Senja Studio retains the right to display the completed work in its portfolio unless otherwise agreed in writing.' },
  { title: '7. FCA compliance', content: 'Senja Studio builds sites in accordance with general FCA financial promotion requirements, but is not itself authorised or regulated by the FCA. The client is responsible for ensuring their website complies with all applicable regulatory requirements for their specific situation. We recommend clients seek independent compliance advice.' },
  { title: '8. Care Plan', content: 'The Care Plan is a monthly maintenance service at £150/month, including up to 2 hours of changes per month. The first month is provided free of charge with every build. The Care Plan has a minimum term of 3 months after the free month. Additional work beyond 2 hours per month is billed at £75/hour, agreed before any additional work starts. The Care Plan may be cancelled after the minimum term with 30 days\' written notice.' },
  { title: '9. Limitation of liability', content: 'Senja Studio\'s total liability in connection with any project shall not exceed the total fees paid for that project. We are not liable for indirect, consequential, or incidental losses, including loss of revenue or business opportunity.' },
  { title: '10. Governing law', content: 'These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the English courts.' },
  { title: '11. Contact', content: 'For any queries regarding these terms, contact dan@senjastudio.co.uk.' },
]

export default function Terms() {
  return (
    <Layout title="Terms of Service" description="Senja Studio terms of service." canonical="/terms">
      <div style={{ background: 'var(--navy)', padding: '64px 48px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 600, color: 'var(--white)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          Terms of Service
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)', marginTop: '12px' }}>Last updated: July 2025</p>
      </div>
      <div style={{ maxWidth: '740px', margin: '0 auto', padding: '56px 32px' }}>
        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom: '36px', paddingBottom: '36px', borderBottom: i < sections.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', fontWeight: 500, color: 'var(--ink)', marginBottom: '12px' }}>{s.title}</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.85 }}>{s.content}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}
