import Layout from '../components/Layout'

// These terms have to cover four quite different commercial shapes: one-off
// builds, monthly retainers, per-appointment billing, and the referral
// programme. Anything stated here that also appears on a pricing card, the
// referral page or in the FAQ has to match it exactly — a term that contradicts
// the advertised offer is worse than no term at all.
const sections = [
  { title: '1. Services', content: 'Senja Studio provides website design and related services for mortgage brokers. These are: one-off website builds (Homepage Build and Full Website); Website + Leads, a monthly service combining a website build with ongoing appointment setting; standalone lead generation (Starter Leads and Pay Per Appointment); the optional Care Plan; and AI add-ons. The specific services, deliverables, fees and start date for each engagement are agreed in writing before work commences. Where a written engagement agreed with a client conflicts with these terms, that engagement takes precedence.' },

  { title: '2. Definitions', content: '“Build” means a one-off website project — a Homepage Build or a Full Website. “Subscription Service” means any service billed monthly: Website + Leads, Starter Leads, the Care Plan, and the monthly element of any AI add-on. “Qualified Appointment” means a call scheduled into the client’s nominated booking calendar with a prospective client who, at the time of booking, has confirmed both that they are seeking a UK mortgage within the following 90 days and that they wish to speak to the client. “Month” means a monthly billing cycle running from the service start date, not a calendar month.' },

  { title: '3. Fees and payment', content: [
    'Builds: 50% of the fee is payable before work begins and is non-refundable once work has started. The remaining 50% is due on delivery, before the site goes live.',
    'Website + Leads: the first month is £3,500, of which 50% is payable before work begins (non-refundable once work has started) and 50% on delivery of the website. Each subsequent month is £3,500, invoiced monthly in advance.',
    'Starter Leads: £1,500 per month, invoiced monthly in advance.',
    'Pay Per Appointment: £175 per Qualified Appointment, with a minimum initial order of 5 appointments payable in advance. Further appointments are ordered in blocks agreed in writing and invoiced in advance. There is no monthly retainer.',
    'The Care Plan and AI add-ons are covered in sections 9 and 10.',
    'Fees are stated in pounds sterling; where VAT applies it is shown on the invoice. Invoices are payable within 7 days. Senja Studio may suspend a Subscription Service where an invoice is more than 14 days overdue, having first given written notice. Suspension does not extend a minimum term or entitle the client to a refund of fees already paid.',
  ] },

  { title: '4. Delivery timelines', content: 'Standard delivery timelines are: Homepage Build — 5 working days; Full Website — 7 working days; Website + Leads — the website within 7 working days, with appointment delivery beginning in the first month. These timelines begin from the date the completed project brief is received, not from the date of payment. AI add-ons are scoped and timed separately — typically 3–10 additional working days depending on complexity. All extended timelines are agreed in writing before work begins.' },

  { title: '5. Revisions', content: 'Builds include the revision rounds specified in the project agreement: 1 round for the Homepage Build, and 2 rounds for the Full Website and for the website element of Website + Leads. Revisions must be submitted as a single consolidated list. Additional revision rounds beyond those included are billed at £75/hour, agreed in advance.' },

  { title: '6. Lead generation services', content: [
    'Where a service includes appointment setting, Senja Studio builds and runs an outbound system on the client’s behalf: a dedicated sending domain, prospect research, outreach, qualification, and booking into the client’s nominated calendar. A weekly performance report is provided.',
    'Website + Leads and Starter Leads each include 10 Qualified Appointments per month. Where fewer than 10 are delivered in a month, the shortfall carries forward and is delivered in addition to the following month’s appointments at no extra charge. Where a shortfall has not been made good by the end of that following month, the client may cancel immediately by written notice and the undelivered portion of the fee is refunded pro rata.',
    'An appointment counts as delivered when it is booked and accepted into the client’s calendar. Where a prospect does not attend and cannot be rebooked, Senja Studio will replace the appointment at no additional charge, provided the client had made the scheduled time available and attempted the call.',
    'Senja Studio does not guarantee that any appointment will result in an application, a case, or any revenue. Appointments are introductions only.',
  ] },

  { title: '7. Client responsibilities', content: 'For builds, the client is responsible for providing accurate brand information, correct regulatory details (FCA number, authorisation status), and timely feedback during the revision process. Delays caused by late feedback or approval may extend the delivery timeline, and Senja Studio is not liable for delays caused by the client. For lead generation services, the client must keep genuine availability in the booking calendar it nominates, attend booked appointments or give reasonable notice, approve outreach copy as set out in section 13, and tell Senja Studio promptly of any complaint, opt-out request or regulatory concern arising from the outreach. Appointments that cannot be booked because no availability was offered, and appointments missed by the client, count as delivered.' },

  { title: '8. Cancellation and minimum terms', content: 'Builds are one-off engagements and end on delivery. Subscription Services run month to month from the start date unless a minimum term is stated in these terms or agreed in writing. Starter Leads and Website + Leads may each be cancelled at any time after the first month; the client must give written notice before the next renewal date, and the month already in progress runs to its end and is not refunded. Pay Per Appointment carries no ongoing commitment beyond appointments already ordered. The Care Plan is subject to section 9. On cancellation of any lead generation service, Senja Studio stops outreach and the client keeps every appointment and every prospect’s details already delivered. Cancelling a Subscription Service has no effect on the client’s ownership of any website already delivered and paid for.' },

  { title: '9. Care Plan', content: 'The Care Plan is an optional monthly maintenance service at £150/month, including up to 2 hours of changes per month. It is not a condition of any build, is not included in any build price, and does not begin automatically — the client must choose to start it. The first month is provided free of charge to clients who start the plan. Once started, the Care Plan has a minimum term of 3 months after the free month. Additional work beyond 2 hours per month is billed at £75/hour, agreed before any additional work starts. The Care Plan may be cancelled after the minimum term with 30 days’ written notice. Declining the Care Plan has no effect on the client’s ownership of the delivered website.' },

  { title: '10. AI add-ons', content: 'AI add-ons are priced as a one-off setup fee plus a monthly fee where stated, and are scoped separately from website builds. The AI Lead Capture Chatbot is included at no additional monthly cost for clients on the Care Plan. Monthly add-on fees are invoiced in advance and may be cancelled with 30 days’ written notice; setup fees are non-refundable once work has started. Where an add-on depends on third-party services such as AI models, telephony or messaging, reasonable usage is included in the stated monthly fee. Usage materially above that is discussed and agreed in writing before any additional charge is made.' },

  { title: '11. Referral programme', content: 'Where a person introduces a mortgage broker who goes on to become a client, £250 is payable to the referrer once that client’s deposit has cleared, by bank transfer within 7 working days. There is no cap on the number of referrals. A referral is attributed by the tracking link issued to the referrer, or by a written introduction where Senja Studio has agreed to that in advance. Where the same broker is introduced by more than one referrer, the earliest attributable introduction is paid. No payment is due where the broker had already contacted Senja Studio or was already in discussion with it. Where the referrer is an FCA-regulated firm, payment is made to the firm on invoice rather than to an individual. At the referrer’s request the £250 may instead be paid to a charity of their choice or applied as credit against their own project. Referrers are responsible for declaring the payment where their own firm or network requires it. Senja Studio may amend or end the programme on notice, but will honour payments due on referrals already made.' },

  { title: '12. Intellectual property', content: 'On receipt of full payment, all intellectual property rights in the delivered website transfer to the client. The client owns the website, code, and content in full. Senja Studio retains the right to display the completed work in its portfolio unless otherwise agreed in writing. The systems built to run a lead generation service — sending domains, outreach infrastructure, sequences and tooling — remain the property of Senja Studio and do not transfer on cancellation. Prospect details and appointments already delivered to the client remain the client’s.' },

  { title: '13. Regulatory status and financial promotions', content: [
    'Senja Studio is not authorised or regulated by the Financial Conduct Authority. It does not give mortgage, financial or regulatory advice, does not advise or arrange on any prospect’s behalf, and does not hold itself out as doing so. An introduction is the passing of a prospect’s contact details and a booked time, and nothing more.',
    'Websites are built in accordance with general FCA financial promotion requirements, but the client is responsible for ensuring that its website and its outreach comply with the requirements applying to its own permissions and status.',
    'Outreach copy is a financial promotion where it invites or induces a person to engage in regulated activity. The client must review and approve every outreach template, sequence and material variation in writing before it is used, and must obtain its network’s approval where the client is an Appointed Representative. Senja Studio will not send copy that has not been approved. The client is responsible for obtaining that approval and for the compliance of the copy it approves.',
    'We recommend clients seek independent compliance advice.',
  ] },

  { title: '14. Data protection', content: [
    'Each party will comply with the UK GDPR, the Data Protection Act 2018 and the Privacy and Electronic Communications Regulations.',
    'For prospect data that Senja Studio sources and uses to carry out outreach, Senja Studio is the controller and is responsible for lawful sourcing, for having a valid lawful basis, and for honouring objections and opt-out requests. Once a prospect’s details are delivered to the client as a booked appointment, the client is the controller of that data and is responsible for its use, retention and any further marketing.',
    'For personal data that Senja Studio processes on the client’s instructions — for example enquiries submitted through the client’s website — Senja Studio acts as processor, and a data processing agreement is available on request.',
    'Each party will notify the other without undue delay of any complaint, objection, opt-out request or personal data breach relevant to the other, and will cooperate in responding to it.',
  ] },

  { title: '15. Limitation of liability', content: 'Senja Studio’s total liability in connection with a build shall not exceed the total fees paid for that build. Its total liability in connection with a Subscription Service shall not exceed the fees paid for that service in the 12 months preceding the claim. We are not liable for indirect, consequential or incidental losses, including loss of revenue, profit or business opportunity, nor for any regulatory action, fine or complaint arising from copy or promotions the client approved or from the client’s own use of prospect details. Nothing in these terms limits liability for death or personal injury caused by negligence, for fraud, or for any other liability that cannot lawfully be limited.' },

  { title: '16. Governing law', content: 'These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the English courts.' },

  { title: '17. Contact', content: 'For any queries regarding these terms, contact dan@senjastudio.co.uk.' },
]

export default function Terms() {
  return (
    <Layout title="Terms of Service" description="Senja Studio terms of service." canonical="/terms">
      <div style={{ background: 'var(--navy)', padding: '64px 48px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 600, color: 'var(--white)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          Terms of Service
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.78)', marginTop: '12px' }}>Last updated: August 2026</p>
      </div>
      <div style={{ maxWidth: '740px', margin: '0 auto', padding: '56px 32px' }}>
        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom: '36px', paddingBottom: '36px', borderBottom: i < sections.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', fontWeight: 500, color: 'var(--ink)', marginBottom: '12px' }}>{s.title}</h2>
            {/* The fee and lead-gen clauses run long enough that a single block
                is genuinely hard to read on a phone, so content may be an array
                of paragraphs. A plain string still renders exactly as before. */}
            {[].concat(s.content).map((para, j) => (
              <p key={j} style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.85, marginTop: j ? '14px' : 0 }}>{para}</p>
            ))}
          </div>
        ))}
      </div>
    </Layout>
  )
}
