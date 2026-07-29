import Layout from '../components/Layout'

const terms = [
  { letter: 'A', term: 'Agreement in Principle (AIP)', definition: 'Also known as a Decision in Principle (DIP) or mortgage in principle. A statement from a lender indicating how much they would be willing to lend you, based on an initial assessment of your financial situation. Not a guarantee, but helps buyers demonstrate they are serious and can afford the property.' },
  { letter: 'C', term: 'Call to Action (CTA)', definition: 'A button, link, or prompt that tells a website visitor what to do next. On a mortgage broker site, this is typically a "Book a Free Call" button. The placement, wording, and design of your CTA is one of the single biggest factors in whether visitors become enquiries.' },
  { letter: 'C', term: 'Conversion Rate', definition: 'The percentage of website visitors who take a desired action — typically booking a call or submitting an enquiry. A typical broker site converts at 1–2%. A well-built, conversion-optimised site can reach 4–8% or higher.' },
  { letter: 'C', term: 'Conversion Rate Optimisation (CRO)', definition: 'The practice of improving a website to increase the percentage of visitors who take action. This includes testing headlines, restructuring layouts, improving CTAs, adding social proof, and reducing friction in the booking process.' },
  { letter: 'D', term: 'Debt-to-Income Ratio (DTI)', definition: 'A measure of how much of your gross monthly income goes toward paying debts. UK lenders typically look at this alongside loan-to-income multiples when assessing affordability. A lower DTI ratio makes it easier to qualify for a mortgage.' },
  { letter: 'E', term: 'Early Repayment Charge (ERC)', definition: 'A fee charged by lenders if you repay your mortgage (or a significant portion of it) before the end of a fixed or discounted rate period. Common on fixed-rate deals, typically a percentage of the outstanding balance. Can be substantial — worth understanding before committing to a product.' },
  { letter: 'E', term: 'Equity Release', definition: 'A way for homeowners aged 55+ to access the equity tied up in their property without having to move. Can be a lifetime mortgage or a home reversion plan. Specialist product requiring regulated advice.' },
  { letter: 'F', term: 'FCA Authorisation Statement', definition: 'A declaration required on every page of a mortgage broker\'s website confirming that the firm is authorised and regulated by the Financial Conduct Authority. It must include the firm\'s FCA registration number and typically appears in the footer.' },
  { letter: 'H', term: 'Help to Buy', definition: 'A UK government scheme designed to help first-time buyers and existing homeowners purchase a new-build property with a smaller deposit. The scheme has evolved over the years and was closed to new applications in 2023, but legacy loans remain in place.' },
  { letter: 'I', term: 'Interest-Only Mortgage', definition: 'A mortgage where monthly payments only cover the interest on the loan, not the capital. The full loan amount is due at the end of the term. Less common now than in the past, and requires a credible repayment strategy acceptable to the lender.' },
  { letter: 'L', term: 'Lead Capture', definition: 'Any mechanism on a website that collects contact information from visitors. This includes contact forms, callback request forms, free guide downloads, qualification quizzes, and AI chatbots.' },
  { letter: 'L', term: 'Loan-to-Value (LTV)', definition: 'The ratio of your mortgage loan to the value of the property, expressed as a percentage. A £180,000 mortgage on a £200,000 property is 90% LTV. Lower LTV generally means access to better interest rates. The deposit is the inverse — a 90% LTV loan requires a 10% deposit.' },
  { letter: 'M', term: 'Mobile-First Design', definition: 'An approach to web design where the mobile experience is designed before the desktop version. Over 60% of mortgage-related searches happen on mobile.' },
  { letter: 'M', term: 'Mortgage for Unique or Borderline (MUFB)', definition: 'A lender category for cases that fall outside standard lending criteria — self-employed with complex income, adverse credit history, non-standard construction properties, or other factors that make the case harder to place. Requires a broker with specialist knowledge.' },
  { letter: 'O', term: 'Offset Mortgage', definition: 'A mortgage linked to your savings account. Instead of earning interest on your savings, the balance is offset against your mortgage, reducing the interest you pay. Can save significant amounts over the term and offers flexibility, though the mortgage rate is often slightly higher than standard products.' },
  { letter: 'P', term: 'Porting', definition: 'The ability to transfer your existing mortgage deal to a new property when you move. Not all mortgages are portable, and even those that are may require additional underwriting. Worth checking before assuming you can take your current rate with you.' },
  { letter: 'P', term: 'Product Transfer', definition: 'Switching to a new mortgage deal with your existing lender when your current deal ends. Often simpler and quicker than remortgaging to a new lender, as it typically requires less paperwork and no new valuation. However, you\'re limited to that lender\'s available products, which may not be the most competitive on the market.' },
  { letter: 'R', term: 'Remortgage', definition: 'Switching your existing mortgage to a new deal, either with your current lender or a different one. Common reasons include securing a better interest rate when a fixed term ends, releasing equity, or consolidating debts. A good broker will review your options several months before your current deal expires.' },
  { letter: 'S', term: 'Segmented CTA', definition: 'A call-to-action system that directs different types of visitors to different booking flows based on their situation. Rather than one generic "Get in Touch" button, a segmented CTA might offer three paths: "I\'m self-employed", "I\'m a first-time buyer", "I\'ve been turned down before".' },
  { letter: 'S', term: 'Shared Ownership', definition: 'A government-backed scheme allowing buyers to purchase a share of a property (typically 25% to 75%) and pay rent on the remaining share. Aimed at first-time buyers and those who cannot afford to buy outright. You can usually increase your share over time (staircasing).' },
  { letter: 'S', term: 'Social Proof', definition: 'Evidence that other people have trusted you and had a positive experience. On a mortgage broker website, social proof includes Google reviews and star ratings, client testimonials, and case study outcomes.' },
  { letter: 'S', term: 'Standard Variable Rate (SVR)', definition: 'The default interest rate your mortgage reverts to when a fixed, tracker, or discounted deal ends. Set by the lender and can be changed at their discretion. Usually significantly higher than new fixed-rate deals, which is why remortgaging before your deal expires is usually advisable.' },
  { letter: 'T', term: 'Tracker Mortgage', definition: 'A variable rate mortgage where the interest rate tracks a specified benchmark — usually the Bank of England base rate — at a set margin above it (e.g., base rate + 1.5%). The rate moves up or down in line with the base rate, so monthly payments can fluctuate.' },
].sort((a, b) => a.term.localeCompare(b.term))

export default function Glossary() {
  return (
    <Layout
      title="Mortgage Broker Website Glossary"
      description="Complete mortgage broker website glossary — key terms every independent broker needs to know."
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
