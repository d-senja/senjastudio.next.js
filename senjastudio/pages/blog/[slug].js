import Layout from '../../components/Layout'
import Link from 'next/link'

// ── ALL BLOG CONTENT IN ONE PLACE ────────────────────────────
// To add a new article: add an entry to POSTS below
// To edit an article: find it by slug and change the content array

const POSTS = {
  'why-mortgage-broker-websites-fail-to-convert': {
    title: 'Why Most Mortgage Broker Websites Fail to Convert Visitors into Enquiries',
    description: 'Most broker sites have the same three problems. Here\'s what they are — and exactly how to fix them.',
    tag: 'Conversion',
    date: 'July 2025',
    readTime: '6 min read',
    content: [
      { type: 'p', text: 'Most mortgage broker websites share the same fundamental problem: they were built to look professional, not to convert visitors into enquiries. There\'s a meaningful difference between the two, and it costs independent brokers leads every single week. Whether you\'re based in [London](/mortgage-broker-website-design-london), [Manchester](/mortgage-broker-website-design-manchester), or anywhere else, these conversion mistakes are universal.' },
      { type: 'h2', text: 'Problem 1: One generic CTA for every type of client' },
      { type: 'p', text: 'The most common conversion mistake on broker sites is a single "Get in Touch" or "Book a Free Consultation" button for every visitor. A self-employed contractor has completely different anxieties from a first-time buyer. A complex case with adverse credit needs completely different reassurance from someone remortgaging a straightforward residential property.' },
      { type: 'p', text: 'When every visitor hits the same generic button, none of them feel directly spoken to. The self-employed person thinks: "Do they actually understand my situation?" The adverse credit client thinks: "They\'ll just say no like everyone else." And both of them leave.' },
      { type: 'highlight', title: 'The fix:', text: 'Replace your single CTA with three segmented pathways. "I\'m self-employed or have complex income." "I\'m a first-time buyer." "I\'ve been turned down before." Each one speaks directly to that client\'s situation. Each one pre-qualifies the visitor before they ever reach you.' },
      { type: 'h2', text: 'Problem 2: Social proof buried where nobody sees it' },
      { type: 'p', text: 'You\'ve worked hard for your Google reviews. Some brokers have 80, 100, even 150 five-star ratings — and then put them in a carousel three scrolls down the page, or worse, in a testimonials tab that nobody clicks.' },
      { type: 'p', text: 'Social proof is most powerful at the moment of first decision. That moment happens in the first 10 seconds on your homepage — before a visitor has scrolled at all. Your star rating, your review count, and your single best client quote need to be visible in the hero section, before anyone has to do anything.' },
      { type: 'highlight', title: 'The fix:', text: '"4.9 · 103 reviews on Google" next to a real client quote, positioned in your hero section before the first scroll. It puts your strongest proof at the moment a visitor is deciding whether to trust you.' },
      { type: 'h2', text: 'Problem 3: The site doesn\'t load fast enough on mobile' },
      { type: 'p', text: 'Most mortgage research now happens on a phone. Someone is on their lunch break, or lying awake at midnight worrying about their application, and they search for a broker on their phone. If your site is slow to load, a meaningful share of those visitors leave before they see anything at all.' },
      { type: 'p', text: 'Most broker sites are "mobile responsive" in the sense that they don\'t break on a phone. But not breaking is different from actually working well. Slow load times, small tap targets, text that requires zooming — each of these loses you enquiries every day.' },
      { type: 'highlight', title: 'The fix:', text: 'Check your mobile score at pagespeed.web.dev. If it\'s below 70, you\'re losing multiple enquiries per week. A properly built broker site should score above 85 on mobile.' },
      { type: 'h2', text: 'What to do about it' },
      { type: 'p', text: 'These three problems — generic CTAs, buried social proof, and poor mobile performance — account for the majority of the conversion gap between a broker site that generates consistent enquiries and one that doesn\'t. Each is fixable. None of them require a complete rebuild if you\'re working with someone who knows what they\'re doing.' },
      { type: 'p', text: 'If you\'d like an honest assessment of how your current site performs against these three criteria, book a free 30-minute call. We\'ll look at your site together and tell you exactly what we\'d change.' },
      { type: 'h2', text: "Problem 4: The site never says who it is not for" },
      { type: 'p', text: "Most broker sites try to sound available to everyone, which reads as available to no one in particular. A page that says \"whole of market advice for all your mortgage needs\" gives a self-employed applicant with two years of accounts nothing to grab onto. A page that says \"if you have been trading under three years and a high street lender has already said no, that is the case we take most often\" tells that person they are in the right place — and tells someone who is not that they should look elsewhere. Both outcomes are good. Enquiries you cannot help cost you time and cost the client a week." },
      { type: 'h2', text: "Problem 5: There is no path for the person who is not ready yet" },
      { type: 'p', text: "A serious share of the people reading a broker site are six weeks away from being able to act. They are saving a deposit, waiting on a probation period, or gathering another year of accounts. Most broker sites offer them one option: book a call they are not ready for. So they leave, and by the time they are ready they have forgotten the name." },
      { type: 'p', text: "A guide, a checklist or a short email sequence gives that person a reason to hand over an address and a reason for you to be the name they remember. This is the single cheapest thing most broker sites are missing, and it is the difference between a site that only converts the ready and one that also converts the nearly ready." },
      { type: 'h2', text: "How to check your own site in ten minutes" },
      { type: 'p', text: "Open your homepage on your phone, not your laptop. Start a timer. Can you tell, within ten seconds and without scrolling, what kind of client this broker specialises in? Is there a review or a star rating visible in that first screen? Is there one obvious next action, or four competing ones? Can you find the FCA number without using the browser's find function? Is there anything to do other than \"contact us\" — a guide, a calculator, a checklist?" },
      { type: 'p', text: "Every no on that list is a specific, fixable leak. None of them require a rebuild. Most of them are a copy and layout decision that somebody made by default rather than on purpose." },
    ]
  },

  'fca-compliant-mortgage-broker-website': {
    title: 'FCA Compliant Mortgage Broker Website: What You Actually Need in 2025',
    description: 'The FCA rules that apply to your website — and the simple ways most broker sites get them wrong.',
    tag: 'FCA Compliance',
    date: 'July 2025',
    readTime: '7 min read',
    content: [
      { type: 'p', text: 'Every mortgage broker who operates in the UK market is subject to FCA regulation — and that regulation extends to your website. Whether you\'re an independent broker in [Birmingham](/mortgage-broker-website-design-birmingham), [Edinburgh](/mortgage-broker-website-design-edinburgh), or anywhere across the UK, many brokers are unaware of exactly what\'s required, and most generic web agencies have never thought about financial promotion rules at all.' },
      { type: 'h2', text: 'The FCA Authorisation Statement' },
      { type: 'p', text: 'This is the most basic requirement and the one most often missed. Every page of your website must clearly display that your firm is authorised and regulated by the Financial Conduct Authority, along with your FCA registration number. The statement typically goes in the footer.' },
      { type: 'p', text: 'The exact wording required: "[Firm Name] is authorised and regulated by the Financial Conduct Authority. FCA Registration Number: XXXXXX." It must be legible — not 8pt grey text that nobody can read.' },
      { type: 'highlight', title: 'Equivalent requirements outside the UK:', text: 'ASIC registration number in Australia, CFPB/state regulator disclosure in the USA, Central Bank of Ireland authorisation in Ireland. The principle is the same: your regulatory status must be clearly visible.' },
      { type: 'h2', text: 'Financial Promotion Rules' },
      { type: 'p', text: 'Under FSMA 2000 and the FCA\'s MCOB sourcebook, all financial promotions must be fair, clear, and not misleading. This applies directly to the copy on your website — including your homepage headline, your service descriptions, and any claims you make about rates or outcomes.' },
      { type: 'p', text: 'Common compliance failures on broker sites include: claiming to "guarantee" mortgage approvals, quoting specific rates without adequate context, making comparative claims against high-street banks without substantiation, and using testimonials that imply guaranteed outcomes.' },
      { type: 'h2', text: 'GDPR-Compliant Lead Capture' },
      { type: 'p', text: 'Any form on your site that collects personal data — contact forms, callback request forms, newsletter signups — must include explicit consent language, a clear statement of how data will be used, and a link to your privacy policy. Pre-ticked consent boxes are not compliant.' },
      { type: 'h2', text: 'Cookie Consent' },
      { type: 'p', text: 'Under UK GDPR and PECR, you must obtain informed consent before setting non-essential cookies. This means a cookie banner that genuinely allows visitors to decline — not a banner that only has an "Accept" button, or one that sets cookies before the visitor makes a choice.' },
      { type: 'h2', text: 'What we include in every build' },
      { type: 'p', text: 'At Senja Studio, every site we build includes: the FCA authorisation statement in the footer of every page, compliant disclaimer copy reviewed against MCOB requirements, GDPR-compliant lead forms with explicit consent language, a properly implemented cookie consent banner, and a privacy policy covering all data collection on the site.' },
      { type: 'p', text: 'We review all copy for financial promotion compliance before any site goes live. If a client wants to make a claim that could create a compliance issue, we flag it and rewrite the copy to be compliant before launch.' },
      { type: 'h2', text: "Social media and third-party content count too" },
      { type: 'p', text: "The financial promotion rules do not stop at your homepage. A LinkedIn post promoting your services, a Facebook advert, a testimonial you reshare and a page a marketing agency wrote for you are all promotions. The firm is responsible for them whether or not the firm wrote them. This is where brokers most often get caught out, because the website gets reviewed carefully and everything else gets posted in a hurry." },
      { type: 'h2', text: "Where broker sites most often slip" },
      { type: 'p', text: "In practice the same handful of issues recur. Rate figures left on a page months after they stopped being available. A testimonial that implies a guaranteed outcome — \"they got me approved when nobody else would\" reads as a promise, whether or not it was meant as one. Comparative claims against high street lenders with nothing on file to back them. An authorisation statement in 8pt grey on a light grey footer, technically present and practically invisible. And appointed representatives displaying their own name without naming the principal firm." },
      { type: 'h2', text: "Keeping a record is part of the requirement" },
      { type: 'p', text: "Compliance is not only about what the page says today. You are expected to be able to show what it said when it was published and who signed it off. A dated record of each version of your promotional copy, kept somewhere you can actually retrieve it, turns a difficult conversation into a short one." },
      { type: 'p', text: "In practice this is straightforward: keep a PDF of each significant version of your key pages with the date and the reviewer's name. It takes minutes and it is the difference between answering a question and reconstructing a year of edits from memory." },
      { type: 'h2', text: "A note on what this article is" },
      { type: 'p', text: "This is general guidance on website content, written by a studio that builds broker sites — not compliance advice, and not a substitute for it. Senja Studio is not authorised or regulated by the FCA. Confirm your own obligations with your compliance officer or your network before you publish. What we can tell you is what we build in as standard and what we flag before a site goes live." },
    ]
  },

  'how-much-does-a-mortgage-broker-website-cost': {
    title: 'How Much Does a Mortgage Broker Website Cost UK?',
    description: 'Agencies quote £3k–£8k. Freelancers quote £500. Here\'s what you actually get at each price point.',
    tag: 'Pricing',
    date: 'July 2025',
    readTime: '5 min read',
    content: [
      { type: 'p', text: 'The range of prices for mortgage broker websites in the UK is enormous — from £500 to £15,000 for what sounds like broadly the same thing. Whether you\'re a broker in [Leeds](/mortgage-broker-website-design-leeds), [Bristol](/mortgage-broker-website-design-bristol), or elsewhere, the difference between these price points is real, and understanding it will help you make a better decision about where to invest.' },
      { type: 'h2', text: '£500–£1,500: Freelancers and template builders' },
      { type: 'p', text: 'At this price point, you\'re typically getting a template — a pre-built design from Wix, Squarespace, WordPress, or a theme marketplace — with your logo and copy inserted. The designer has likely never worked with a mortgage broker before, doesn\'t know what FCA compliance looks like in practice, and won\'t have thought about conversion optimisation.' },
      { type: 'p', text: 'The result looks like a website. It won\'t, however, be built to convert mortgage clients specifically. The CTAs will be generic, the social proof placement will be an afterthought, and the mobile experience will be adequate rather than excellent.' },
      { type: 'h2', text: '£3,000–£8,000: Generic digital agencies' },
      { type: 'p', text: 'At this price point, you get a more polished result — custom design, proper development, project management. What you don\'t get is mortgage broker expertise. The agency builds websites for restaurants, solicitors, gyms, and brokers. You\'re one of many niches they serve.' },
      { type: 'p', text: 'They\'ll ask you to provide your own copy and your own brand assets. They\'ll hand you the finished site and leave you to figure out FCA compliance. Timeline is typically 6–12 weeks. And the conversion architecture — segmented CTAs, social proof placement, mobile-first lead capture — will almost certainly be generic.' },
      { type: 'highlight', title: 'The hidden cost:', text: 'Two sites can get identical traffic and produce very different numbers of enquiries. That gap compounds every month you leave it unaddressed.' },
      { type: 'h2', text: '£1,500–£3,500: Senja Studio' },
      { type: 'p', text: 'We offer three tiers. Homepage only: £1,500, delivered in 5 working days. Full website: £2,500, delivered in 7 working days. Bespoke multi-page builds from £3,500.' },
      { type: 'p', text: 'Every build includes: conversion-first layout built specifically for mortgage brokers, segmented CTAs for each client type, FCA compliance throughout, WhatsApp and Calendly integration, mobile-first build, and the first month of the Care Plan free.' },
      { type: 'p', text: 'We write all the copy. We handle all the deployment. You don\'t need to touch GitHub or DNS. The site goes live on your domain in 7 days.' },
      { type: 'h2', text: 'What to ask any provider' },
      { type: 'p', text: 'Before commissioning a website, ask: Have you built mortgage broker sites before? Do you write the copy or do I? How do you handle FCA financial promotion compliance? What\'s your mobile performance score on a typical build? Who actually builds the site — you or a subcontractor?' },
      { type: 'p', text: 'The answers will tell you a great deal about what you\'re actually buying.' },
      { type: 'h2', text: "The costs that are not in the quote" },
      { type: 'p', text: "Quotes cover the build. They rarely cover what the site costs to own. Hosting and a domain are small. The real costs are the ones that arrive later: who writes the copy, who adds the new Google reviews each month, who updates a rate or a product change, who fixes it when the contact form quietly stops delivering, and who is responsible when a compliance detail needs to change." },
      { type: 'p', text: "If the answer to all of those is \"you\", the cheap quote was not cheap. If the answer is \"an hourly rate\", ask what a typical month looks like in hours before you sign." },
      { type: 'h2', text: "What you should actually own at the end" },
      { type: 'p', text: "Ask three questions before you commit. Who owns the domain — it should be registered to you, not to the agency. Who owns the code and the content, and can you take it elsewhere without a negotiation. And what happens if you stop paying the monthly fee: does the site stay up, go read-only, or come down." },
      { type: 'p', text: "Plenty of cheap builds are cheap because the ownership sits with the builder. That is a reasonable business model and it is not always disclosed. It only becomes a problem on the day you want to leave." },
      { type: 'h2', text: "How to judge a quote in five minutes" },
      { type: 'p', text: "Ask to see two broker sites they have built and, for each, what they changed and why. Ask who writes the copy. Ask how financial promotion wording is handled, and listen for whether they have thought about it before. Ask what happens after launch, in hours per month and pounds. Ask what the site costs you to leave." },
      { type: 'p', text: "A provider who answers all five without hesitating is worth paying more for. A provider who has not considered the compliance question is quoting for a brochure, whatever the number says." },
    ]
  },

  'mortgage-broker-website-agency-vs-specialist': {
    title: 'Mortgage Broker Website: Agency vs Specialist — Which Is Right For You?',
    description: 'A generic agency has never thought about self-employed income, FCA promotion rules, or segmented CTAs. We have.',
    tag: 'Strategy',
    date: 'July 2025',
    readTime: '6 min read',
    content: [
      { type: 'p', text: 'When a mortgage broker decides to invest in a new website, they typically face a choice: use a local or regional digital agency, or find someone who specialises in their industry. The case for the generalist is familiarity and range. The case for the specialist is depth. Here\'s how those two things play out in practice.' },
      { type: 'h2', text: 'What a generic agency brings' },
      { type: 'p', text: 'A good digital agency brings design capability, technical skill, project management, and a portfolio. They\'ve built hundreds of sites across dozens of industries. They know how to make something look professional.' },
      { type: 'p', text: 'What they don\'t bring is any specific knowledge of your business. They\'ve never thought about the difference between a self-employed client\'s mortgage journey and a PAYE client\'s. They\'ve never considered what a whole-of-market access statement does for conversion. They\'ve never written an FCA-compliant financial promotion.' },
      { type: 'p', text: 'The result is a website that looks right but isn\'t built to convert mortgage clients specifically. The CTAs will be generic. The copy won\'t speak to the anxieties of your specific client types. The compliance will be either missing or bolted on as an afterthought.' },
      { type: 'h2', text: 'What a specialist brings' },
      { type: 'p', text: 'A specialist in mortgage broker websites has already solved the problems you\'re about to face. They know that self-employed clients need to self-identify within the first 5 seconds. They know that a "whole of market access" statement is a meaningful trust signal, not a piece of boilerplate. They know that Google reviews need to be in the hero, not in a testimonials section.' },
      { type: 'highlight', title: 'The compounding effect:', text: 'A site built by someone who understands mortgage broking converts better from day one. That conversion advantage compounds every month — more enquiries, more cases, more revenue — from the same marketing spend.' },
      { type: 'h2', text: 'The timeline difference' },
      { type: 'p', text: 'A generic agency needs weeks to understand your industry before they can even begin. Discovery sessions, briefing documents, stakeholder interviews — all necessary because they\'re starting from zero knowledge of your business.' },
      { type: 'p', text: 'A specialist already understands the industry. We ask you about your firm — your clients, your niche, your brand — not about what a mortgage broker does. That\'s why we deliver in 7 days while a generic agency takes 6–12 weeks.' },
      { type: 'h2', text: 'When a generic agency makes sense' },
      { type: 'p', text: 'There are situations where a generic agency is the right choice. If you need a complex bespoke web application, a custom CRM integration, or a large multi-site build — a full-service agency has the team structure for that. If you have specific brand requirements that need a large design team, a big agency makes sense.' },
      { type: 'p', text: 'For an independent mortgage broker who wants a high-converting, FCA-compliant, mobile-first site that generates consistent enquiries — a specialist will almost always deliver a better result, faster, for less money.' },
      { type: 'h2', text: "The questions that separate the two" },
      { type: 'p', text: "You do not need to take anyone's word for which you are dealing with. Ask what a self-employed applicant needs to see on a homepage that a PAYE applicant does not. Ask how they would handle a financial promotion claim a client wants to make that is not supportable. Ask what they would put above the fold and what they would cut." },
      { type: 'p', text: "A specialist answers from experience and disagrees with you occasionally. A generalist asks what you would like it to say. Neither answer is dishonest — they reflect genuinely different jobs — but only one of them saves you from having to be the expert on your own website." },
      { type: 'h2', text: "Where a generalist is genuinely the better choice" },
      { type: 'p', text: "This is not a case for specialists in every situation. If you need a complex web application, a CRM integration with unusual requirements, a multi-brand rollout or a large design system, a full-service agency has the team structure for it and a one-person studio does not. If your brand work is a project in itself, you want people who do brand work." },
      { type: 'p', text: "The case for a specialist is narrow and specific: a single conversion-focused site for an independent broker, built quickly, by someone who already understands the client types and the regulatory context. Inside that box the specialist wins on almost every axis. Outside it, they should tell you so." },
      { type: 'h2', text: "The question underneath the question" },
      { type: 'p', text: "What most brokers are really asking is whether the extra knowledge shows up in the result. It shows up in small decisions made without being asked — which client type gets the first enquiry path, where the reviews sit, what the disclaimer says, what gets left out. Individually none of them are dramatic. Together they are the difference between a site that looks professional and one that produces enquiries." },
    ]
  },

  '8-things-your-mortgage-broker-website-is-missing': {
    title: '8 Things Your Mortgage Broker Website Is Missing (And How to Fix Them)',
    description: 'Most broker sites are missing at least five of these. Each one costs you enquiries every single week.',
    tag: 'Conversion',
    date: 'July 2025',
    readTime: '8 min read',
    content: [
      { type: 'p', text: 'After reviewing dozens of mortgage broker websites, the same gaps appear over and over. Most sites are missing at least five of these eight elements. Each missing element costs enquiries. Here\'s the list — and exactly how to add each one.' },
      { type: 'h2', text: '1. Segmented CTAs for each client type' },
      { type: 'p', text: 'A single "Get in Touch" button serves no client type well. Replace it with three pathways: self-employed/complex income, first-time buyer, and been turned down before. Each one speaks directly to that visitor\'s situation and pre-qualifies them before the call.' },
      { type: 'h2', text: '2. Google reviews in the hero section' },
      { type: 'p', text: 'Your star rating and review count need to be visible before anyone scrolls. Most broker sites bury this in a testimonials section. Position it in the hero alongside your main headline — "4.9 · 87 reviews on Google" — and it becomes a trust signal at exactly the right moment.' },
      { type: 'h2', text: '3. A visible FCA authorisation statement' },
      { type: 'p', text: 'Required on every page by the FCA. Your authorisation statement and registration number must be clearly visible in the footer, in legible text, on every single page. Missing or illegible = compliance risk and lost trust.' },
      { type: 'h2', text: '4. WhatsApp integration' },
      { type: 'p', text: 'A significant proportion of mortgage enquiries start with a WhatsApp message. A direct "Chat on WhatsApp" button on your site captures these clients immediately, in the channel they prefer, without the friction of a form. Add it. Track it.' },
      { type: 'h2', text: '5. A fast mobile experience' },
      { type: 'p', text: 'Check your mobile PageSpeed score at pagespeed.web.dev right now. If it\'s below 70, you\'re losing enquiries from every mobile search. Most mortgage research now happens on a phone. Most broker sites are built desktop-first and optimised for desktop. That\'s the wrong order.' },
      { type: 'h2', text: '6. Self-employed client positioning' },
      { type: 'p', text: 'Self-employed and complex income clients are your most valuable — and they\'re specifically anxious about being turned down. Your site needs language that speaks directly to them: "We work with self-employed applicants, contractors, and limited company directors — and we know which lenders will work with your income structure." That specificity converts.' },
      { type: 'h2', text: '7. A Calendly or booking integration' },
      { type: 'p', text: 'If your site\'s only conversion mechanism is a contact form, you\'re adding friction. A direct booking link — "Book a 30-minute call" — lets motivated visitors convert immediately, on their schedule, without waiting for a response. Calendly integrates in 20 minutes and costs £8/month. The ROI is immediate.' },
      { type: 'h2', text: '8. Cookie consent that actually works' },
      { type: 'p', text: 'A banner with only an "Accept" button, or one that sets cookies before the visitor makes a choice, is not PECR-compliant. You need genuine accept/decline options, and your analytics should only run after consent is given. This isn\'t just compliance — it\'s trust.' },
      { type: 'highlight', title: 'Quick audit:', text: 'Open your site right now and check it against this list. If you\'re missing three or more of these elements, book a free call. We\'ll show you exactly what a properly built broker site looks like — and what it converts at.' },
      { type: 'h2', text: "9. A reason to come back if they are not ready" },
      { type: 'p', text: "Most broker sites give a visitor exactly one option: book now. For the sizeable group who are months away from being able to act, that is no option at all. A guide, a checklist or a short email sequence gives them a reason to leave an address and gives you a reason to still be in their inbox when they are ready." },
      { type: 'h2', text: "10. Copy that says who you are not for" },
      { type: 'p', text: "\"Whole of market advice for all your mortgage needs\" is true and it is useless. It gives no one a reason to think you are the right person for their situation. Naming the cases you take most often — and, quietly, the ones you do not — makes the right client feel recognised and stops the wrong enquiries arriving. Both save you time." },
      { type: 'h2', text: "Where to start if you only fix one" },
      { type: 'p', text: "Segmented enquiry paths. Not because the others do not matter, but because it is the change that touches everything else: it forces you to decide who the site is for, which then dictates the copy, the reviews you feature and the wording of the call to action. Most of the other items on this list follow naturally once that decision is made." },
      { type: 'p', text: "If you want an honest read on which of these your own site is missing, that is what the free thirty-minute review is for. You leave with the list whether or not you work with us." },
    ]
  },
}

// ── TEXT PARSER WITH LINK SUPPORT ────────────────────────────
// Parses text with [link text](/url) syntax
function parseTextWithLinks(text) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts = []
  let lastIndex = 0
  let match

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index))
    }
    // Add the link
    parts.push(
      <Link key={match.index} href={match[2]} style={{ color: 'var(--gold)', textDecoration: 'underline' }}>
        {match[1]}
      </Link>
    )
    lastIndex = match.index + match[0].length
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }

  return parts.length > 0 ? parts : text
}

// ── CONTENT RENDERER ──────────────────────────────────────────
function renderContent(blocks) {
  return blocks.map((block, i) => {
    switch (block.type) {
      case 'h2':
        return <h2 key={i}>{block.text}</h2>
      case 'h3':
        return <h3 key={i}>{block.text}</h3>
      case 'p':
        return <p key={i}>{parseTextWithLinks(block.text)}</p>
      case 'highlight':
        return (
          <div key={i} className="highlight-box">
            {block.title && <strong>{block.title}</strong>}
            <p>{parseTextWithLinks(block.text)}</p>
          </div>
        )
      case 'list':
        return <ul key={i}>{block.items.map((item, j) => <li key={j}>{parseTextWithLinks(item)}</li>)}</ul>
      default:
        return null
    }
  })
}

// ── PAGE ──────────────────────────────────────────────────────
export default function BlogPost({ post, slug }) {
  if (!post) return null

  return (
    <Layout
      title={post.title}
      description={post.description}
      canonical={`/blog/${slug}`}
    >
      {/* Hero */}
      <div className="hero" style={{ background: 'var(--royal)', padding: '64px 48px 56px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <span className="blog-tag">{post.tag}</span>
          <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.68)' }}>{post.date}</span>
          <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.68)' }}>{post.readTime}</span>
        </div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 600, color: 'var(--white)', lineHeight: 1.1, maxWidth: '800px', margin: '0 auto 16px', letterSpacing: '-0.02em' }}>
          {post.title}
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.78)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.8 }}>
          {post.description}
        </p>
      </div>

      {/* Article */}
      <div className="article-wrap" style={{ maxWidth: '720px', margin: '0 auto', padding: '56px 32px' }}>
        <Link href="/blog" className="back-to-blog" style={{ display: 'inline-block', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none', marginBottom: '40px' }}>
          ← Back to Blog
        </Link>
        <article className="article">
          {renderContent(post.content)}
        </article>

        {/* CTA */}
        <div className="article-cta" style={{ background: 'var(--navy)', padding: '32px', marginTop: '48px', borderLeft: '3px solid var(--gold)' }}>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', color: 'var(--white)', marginBottom: '10px' }}>
            Want a site that fixes all of this?
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.75, marginBottom: '20px' }}>
            Book a free 30-minute call. We'll review your current site, identify exactly what's costing you leads, and show you what a properly built broker site looks like.
          </p>
          <button
            className="btn-gold"
            onClick={() => document.dispatchEvent(new CustomEvent('openModal'))}
          >
            Book a Free Call
          </button>
        </div>

        {/* Related posts */}
        <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '20px' }}>More from the journal</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(POSTS)
              .filter(([s]) => s !== slug)
              .slice(0, 3)
              .map(([s, p]) => (
                <Link key={s} href={`/blog/${s}`} style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--ink)', fontFamily: 'var(--serif)' }}>{p.title}</span>
                  <span style={{ color: 'var(--gold)', fontSize: '0.8rem', flexShrink: 0, marginLeft: '12px' }}>→</span>
                </Link>
              ))}
          </div>
        </div>

        {/* Serving brokers in your area */}
        <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '20px' }}>Serving brokers in your area</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '8px' }}>
            {[
              { slug: 'mortgage-broker-website-design-london', label: 'London' },
              { slug: 'mortgage-broker-website-design-manchester', label: 'Manchester' },
              { slug: 'mortgage-broker-website-design-birmingham', label: 'Birmingham' },
              { slug: 'mortgage-broker-website-design-leeds', label: 'Leeds' },
              { slug: 'mortgage-broker-website-design-bristol', label: 'Bristol' },
            ].map(location => (
              <Link key={location.slug} href={`/${location.slug}`} style={{ textDecoration: 'none', fontSize: '0.8rem', color: 'var(--ink)', padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '4px', textAlign: 'center', transition: 'all 0.2s' }}>
                {location.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

// Tell Next.js which slugs exist
export async function getStaticPaths() {
  return {
    paths: Object.keys(POSTS).map(slug => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const post = POSTS[params.slug] || null
  return { props: { post, slug: params.slug } }
}
