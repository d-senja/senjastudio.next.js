import Layout from '../components/Layout'
import Link from 'next/link'

// ── EXPANDED LOCATIONS OBJECT ─────────────────────────────────
// 23 location-specific landing pages for mortgage broker website design
const LOCATIONS = {
  // ── UK CITIES ──────────────────────────────────────────────
  'mortgage-broker-website-design-london': {
    city: 'London',
    country: 'United Kingdom',
    regionDesc: "London's mortgage market is one of the most competitive in the world — with high property values, a huge self-employed population, and clients who research obsessively before picking up the phone.",
    clientTypes: ['Self-Employed London Professionals', 'First-Time Buyers & Remortgagers'],
    localDetail: [
      "London has one of the highest concentrations of self-employed professionals, contractors, and company directors in the UK. These clients often have complex income structures — multiple income streams, retained profits, irregular earnings — and they need a broker who signals expertise before they even make contact. A generic website loses them immediately. A site with specific self-employed CTAs, clear process copy, and visible FCA credentials converts them.",
      "First-time buyers in London face a uniquely pressured market — high deposits, intense competition, and decisions made quickly. Your website needs to build enough trust in under 10 seconds that a stressed first-time buyer picks you over the five other brokers they've found. Google reviews in the hero, a direct booking link, and mobile-first design are non-negotiable in this market.",
    ],
    faqs: [
      { q: 'Do you build websites for London mortgage brokers specifically?', a: "Yes — we build exclusively for mortgage brokers, and London is one of our most requested markets. We understand the self-employed complexity, the high-value property landscape, and the research-heavy buyer that defines the London market. Every site we build is optimised for the client types that make up the majority of London enquiries." },
      { q: 'How quickly can you build a mortgage broker website in London?', a: "Our standard Full Website is delivered in 7 working days. Homepage-only builds are delivered in 5. We work with brokers across London remotely — no in-person meetings required. From brief to live site, the process is designed to be fast and frictionless." },
    ],
  },

  'mortgage-broker-website-design-manchester': {
    city: 'Manchester',
    country: 'United Kingdom',
    regionDesc: "Manchester's property market has grown substantially over the last decade, with a large first-time buyer population and a thriving self-employed professional scene that demands brokers who understand complex income.",
    clientTypes: ['First-Time Buyers', 'Self-Employed Professionals'],
    localDetail: [
      "Manchester has one of the UK's youngest buyer demographics, with a large first-time buyer market driven by the city's growing tech and creative sectors. These clients are digitally native — they'll judge your credibility entirely on your website before they consider calling. A slow, generic site loses them before they've read your name. A conversion-focused site with instant booking and visible social proof wins the enquiry.",
      "Manchester's self-employed population spans everything from contractors and freelancers to limited company directors and sole traders. They need a broker who demonstrates understanding of their income complexity immediately — not after three email exchanges. Segmented CTAs, specific self-employed copy, and a direct WhatsApp link convert this client type significantly better than a generic 'get in touch' button.",
    ],
    faqs: [
      { q: 'Can you build a website for a Manchester-based mortgage broker?', a: "Absolutely. We work with brokers across the UK remotely. Manchester is one of our most active markets — we understand the buyer demographics, the competitive landscape, and the client types that define the Manchester mortgage market. Everything is handled online from brief to launch." },
      { q: 'What makes a good mortgage broker website in Manchester?', a: "In Manchester's competitive market, the difference between a site that converts and one that doesn't comes down to three things: instant booking options, visible Google reviews, and mobile-first design. Over 60% of Manchester mortgage searches happen on mobile — if your site isn't optimised for that, you're losing the majority of your potential clients before they've read a word." },
    ],
  },

  'mortgage-broker-website-design-birmingham': {
    city: 'Birmingham',
    country: 'United Kingdom',
    regionDesc: "Birmingham is one of the UK's fastest-growing property markets, with a diverse client base spanning first-time buyers, young families, and a significant self-employed and business-owner population.",
    clientTypes: ['Young Families & First-Time Buyers', 'Complex Case Specialists'],
    localDetail: [
      "Birmingham's first-time buyer market is one of the most active in the UK outside London, driven by relatively accessible property prices and a young, growing population. These buyers research extensively and make decisions quickly when they find a broker they trust. Your website needs to establish that trust within seconds — star ratings, visible FCA compliance, and a frictionless booking flow are what separate the sites that convert from those that don't.",
      "Birmingham has a significant population of self-employed professionals, business owners, and contractors — clients with complex income structures who need a broker that demonstrates expertise before they make contact. Sites that speak directly to these clients, with specific CTAs and copy that acknowledges their situation, consistently outperform generic sites in this market.",
    ],
    faqs: [
      { q: 'Do you build websites for Birmingham mortgage brokers?', a: "Yes — we work with brokers across Birmingham and the wider West Midlands. We understand the Birmingham property market, the client demographics, and the specific trust signals that convert buyers in this region. Everything is handled remotely from brief to launch." },
      { q: 'What should a Birmingham mortgage broker website include?', a: "The fundamentals are the same across every market: FCA compliance visible in the nav, Google reviews above the fold, segmented CTAs for different client types, and a direct booking link. In Birmingham specifically, the self-employed and complex case market is significant — if you specialise here, your site should make that clear from the first screen." },
    ],
  },

  'mortgage-broker-website-design-leeds': {
    city: 'Leeds',
    country: 'United Kingdom',
    regionDesc: "Leeds has one of the UK's most active regional property markets, with strong demand from first-time buyers, a growing tech and finance professional sector, and significant buy-to-let activity.",
    clientTypes: ['First-Time Buyers & Young Professionals', 'Buy-to-Let & Portfolio Landlords'],
    localDetail: [
      "Leeds attracts a large volume of young professionals and first-time buyers drawn by its strong job market and relatively accessible property prices compared to London. These clients are mobile-first researchers who make fast decisions based on digital trust signals. A site with instant Calendly booking, visible Google reviews, and clear FCA credentials wins this client type consistently.",
      "Leeds has a substantial buy-to-let and portfolio landlord market, particularly around the student property sector and city-centre apartments. Landlord clients are experienced, numbers-focused, and need a broker who signals expertise in investment and portfolio financing. Specific copy addressing limited company buy-to-let and portfolio restructuring converts these clients far better than generic content.",
    ],
    faqs: [
      { q: 'Can you build a mortgage broker website for a Leeds-based broker?', a: "Yes — we work with brokers across Leeds and Yorkshire remotely. We understand the Leeds market, including its strong buy-to-let sector and first-time buyer demographic, and build sites optimised for the client types that define enquiries in this region." },
      { q: 'How important is mobile design for a Leeds mortgage broker website?', a: "Critical. Over 60% of mortgage searches in Leeds happen on mobile — commuters, lunch breaks, evenings. If your site doesn't convert on mobile, you're losing the majority of your potential clients. We build every site mobile-first, not as an afterthought." },
    ],
  },

  'mortgage-broker-website-design-bristol': {
    city: 'Bristol',
    country: 'United Kingdom',
    regionDesc: "Bristol's property market combines high demand, limited supply, and a large self-employed and creative professional population that makes it one of the most competitive broker markets outside London.",
    clientTypes: ['Self-Employed & Creative Professionals', 'First-Time Buyers in a Competitive Market'],
    localDetail: [
      "Bristol has an unusually high proportion of self-employed professionals, freelancers, and creative industry workers — people with non-standard income who need a broker that understands their situation without lengthy explanation. A website that signals self-employed expertise immediately, with specific CTAs and copy that acknowledges income complexity, converts this demographic significantly better than a generic site.",
      "Bristol's first-time buyer market is intensely competitive — properties move fast and buyers are under pressure. Your website needs to build trust and enable action immediately. Google reviews in the hero, a Calendly booking link, and clear communication of your process give anxious first-time buyers the confidence to choose you over a competitor.",
    ],
    faqs: [
      { q: 'Do you build websites for Bristol mortgage brokers?', a: "Yes — Bristol is one of our most requested UK markets. We understand the self-employed professional demographic that defines much of the Bristol buyer base, and build sites with segmented CTAs and copy that speaks directly to this client type." },
      { q: 'What makes Bristol different as a mortgage market?', a: "Bristol's unusually high self-employed population and its competitive first-time buyer market mean that generic broker websites underperform significantly here. Brokers who invest in a conversion-focused site with self-employed specific messaging tend to see strong results because they're addressing a need that most competitor sites ignore." },
    ],
  },

  'mortgage-broker-website-design-edinburgh': {
    city: 'Edinburgh',
    country: 'Scotland',
    regionDesc: "Edinburgh's property market operates under Scottish conveyancing law, attracting a highly professional buyer demographic and a significant expat and international purchaser base drawn by the city's global reputation.",
    clientTypes: ['Professional & Executive Buyers', 'Expat & International Purchasers'],
    localDetail: [
      "Edinburgh attracts a high-income professional demographic — finance, legal, tech, and public sector workers who research carefully and make decisions based on credibility signals. Your website needs to look as professional as the clients you're trying to attract. Strong design, clear FCA compliance, and a professional headshot with a direct booking option convert this demographic consistently.",
      "Edinburgh draws significant international interest from expats returning to Scotland and overseas buyers attracted by its global reputation. These clients often need specialist guidance on cross-border financing and Scottish-specific regulations. A website that acknowledges international and expat cases specifically — with relevant copy and a clear process — captures enquiries that generic sites miss entirely.",
    ],
    faqs: [
      { q: 'Can you build a website for a Scottish mortgage broker?', a: "Yes — we build for brokers across Scotland. We understand the Scottish mortgage market, including the differences in conveyancing law and the international buyer interest that characterises markets like Edinburgh. All sites are built to the same conversion-first standard regardless of location." },
      { q: 'Does Scottish mortgage law affect how a broker website should be structured?', a: "It affects the compliance copy and process descriptions — the offers system in Scotland means some of your process explanation will differ from English equivalents. We account for this in our builds for Scottish brokers, ensuring your copy is accurate and your FCA compliance reflects the Scottish regulatory context." },
    ],
  },

  'mortgage-broker-website-design-glasgow': {
    city: 'Glasgow',
    country: 'Scotland',
    regionDesc: "Glasgow is Scotland's largest city with one of the UK's most active first-time buyer markets, driven by accessible property prices and a large professional population returning to the city after years of London migration.",
    clientTypes: ['First-Time Buyers & Young Professionals', 'Self-Employed & Contractor Clients'],
    localDetail: [
      "Glasgow has one of the UK's most active first-time buyer markets outside London, driven by relatively affordable property and a growing professional base. These buyers are digitally active, research-heavy, and make fast decisions when they find a broker they trust. A mobile-optimised site with instant booking and visible social proof wins this client type consistently.",
      "Glasgow has a significant contractor and self-employed population, particularly in construction, tech, and creative sectors. These clients need a broker who signals expertise in complex income situations without requiring lengthy explanation. Specific self-employed CTAs and process copy that acknowledges income complexity converts this demographic far better than generic messaging.",
    ],
    faqs: [
      { q: 'Do you build websites for Glasgow mortgage brokers?', a: "Yes — we work with brokers across Glasgow and the west of Scotland. Glasgow's first-time buyer market is one of the most active in the UK, and we build sites specifically optimised for the client types that drive the majority of enquiries in this market." },
      { q: 'What conversion elements matter most for a Glasgow broker website?', a: "In Glasgow's competitive market: instant booking options, visible Google reviews, and mobile-first design are the three highest-impact elements. The majority of Glasgow mortgage searches happen on mobile, and a site that doesn't convert on mobile is leaving most of its potential enquiries on the table." },
    ],
  },

  'mortgage-broker-website-design-liverpool': {
    city: 'Liverpool',
    country: 'United Kingdom',
    regionDesc: "Liverpool's property market combines strong first-time buyer demand, significant buy-to-let activity, and a growing professional sector that has transformed the city's financial demographics over the last decade.",
    clientTypes: ['First-Time Buyers', 'Buy-to-Let Investors'],
    localDetail: [
      "Liverpool has a large and active first-time buyer market driven by accessible property prices and a young population. These clients are mobile-first and make fast trust decisions — your website has seconds to establish credibility. Google reviews above the fold, an FCA badge in the nav, and a direct booking link are the fundamentals that convert this client type.",
      "Liverpool has a substantial buy-to-let market, particularly in the city centre and student areas. Landlord clients need a broker who understands portfolio financing, limited company structures, and investment-focused mortgage products. A website that signals this expertise specifically — not just general mortgage advice — converts investor clients significantly better.",
    ],
    faqs: [
      { q: 'Can you build a mortgage broker website for a Liverpool-based broker?', a: "Yes — we work with brokers across Liverpool and Merseyside remotely. We understand the Liverpool market, including its strong buy-to-let sector, and build sites with content that speaks to both residential and investment clients." },
      { q: 'How do I compete with large mortgage networks online in Liverpool?', a: "The answer is specialism and conversion focus. Large networks have brand recognition but generic websites. A specialist broker with a conversion-first site — specific client type CTAs, personal Google reviews, a direct booking flow — consistently outperforms generic network sites for local search and direct enquiries." },
    ],
  },

  'mortgage-broker-website-design-sheffield': {
    city: 'Sheffield',
    country: 'United Kingdom',
    regionDesc: "Sheffield's property market is driven by a large student-turned-resident population, strong first-time buyer demand, and a growing professional base that has significantly expanded the city's mortgage market.",
    clientTypes: ['First-Time Buyers & Young Families', 'Self-Employed Professionals'],
    localDetail: [
      "Sheffield has a large first-time buyer market fuelled by its university population transitioning into employment and property ownership. These buyers research extensively online and choose brokers based on digital trust signals — reviews, credentials, and how professional the website looks. A conversion-focused site wins this demographic consistently over a generic one.",
      "Sheffield's self-employed population spans manufacturing, tech, and creative sectors. These clients often have non-standard income that requires broker expertise to navigate. A website that acknowledges self-employed complexity specifically, with dedicated CTAs and process copy, converts this client type at a significantly higher rate than generic mortgage advice sites.",
    ],
    faqs: [
      { q: 'Do you build websites for Sheffield mortgage brokers?', a: "Yes — we work with brokers across Sheffield and South Yorkshire. We understand the local market demographics and build sites optimised for the client types that drive enquiries in this region." },
      { q: 'What should I include on my Sheffield mortgage broker website?', a: "The conversion fundamentals: FCA credentials visible in the nav, Google reviews above the fold, segmented CTAs for different client types, direct booking, and mobile-first design. Beyond that, if you have a specialism — self-employed, first-time buyers, complex cases — make it explicit and prominent on the homepage." },
    ],
  },

  'mortgage-broker-website-design-nottingham': {
    city: 'Nottingham',
    country: 'United Kingdom',
    regionDesc: "Nottingham combines a large student population, strong first-time buyer demand, and a growing East Midlands professional base to create one of the UK's most active regional mortgage markets.",
    clientTypes: ['First-Time Buyers & Graduates', 'Self-Employed & Small Business Owners'],
    localDetail: [
      "Nottingham has one of the UK's highest graduate retention rates — university leavers who stay, build careers, and become first-time buyers within a few years of graduating. These clients are digitally savvy, research-heavy, and choose brokers based on how professional and trustworthy a website looks. A conversion-focused site with strong social proof and instant booking wins this demographic consistently.",
      "Nottingham has a significant small business and self-employed population, particularly in retail, hospitality, and professional services. Self-employed clients with complex income need a broker who signals expertise immediately — not after multiple email exchanges. Specific self-employed copy and segmented CTAs convert this client type far more effectively than generic content.",
    ],
    faqs: [
      { q: 'Can you build a website for a Nottingham mortgage broker?', a: "Yes — we work with brokers across Nottingham and the East Midlands remotely. Nottingham has a particularly strong first-time buyer market and a significant self-employed professional base, both of which we design specifically for in every build." },
      { q: 'How do I get more first-time buyer enquiries from my Nottingham website?', a: "Three things convert first-time buyers specifically: Google reviews visible immediately without scrolling, a direct booking link rather than a contact form, and copy that acknowledges the anxiety and complexity of buying for the first time. Most broker sites address none of these directly — which is why brokers who do see a significant improvement in first-time buyer enquiries." },
    ],
  },

  'mortgage-broker-website-design-cardiff': {
    city: 'Cardiff',
    country: 'Wales',
    regionDesc: "Cardiff's property market has grown significantly as Wales's capital attracts professionals, young families, and first-time buyers drawn by its growing economy and comparatively affordable property prices.",
    clientTypes: ['First-Time Buyers & Young Professionals', 'Remortgage & Home Mover Clients'],
    localDetail: [
      "Cardiff has a large and growing first-time buyer market driven by its expanding professional base in finance, media, and public sector employment. These clients research brokers online before making contact, and a website that builds trust immediately — through visible reviews, clear FCA compliance, and an instant booking option — consistently wins enquiries over competitors with weaker digital presence.",
      "Cardiff's remortgage and home mover market is substantial, particularly as homeowners reassess their options in response to rate changes. These clients are experienced but still need a broker who demonstrates expertise and responsiveness. A clear process, direct contact options, and visible credentials convert this client type effectively.",
    ],
    faqs: [
      { q: 'Do you build websites for Welsh mortgage brokers?', a: "Yes — we work with brokers across Wales, including Cardiff, Swansea, and the surrounding areas. We understand the Welsh property market and build sites that convert the client types most active in this region." },
      { q: 'What makes Cardiff different as a mortgage market for brokers?', a: "Cardiff has a strong first-time buyer demographic and a growing professional base, but relatively fewer specialist broker websites compared to larger English cities. This means a conversion-focused site stands out more strongly here — the bar for digital credibility is lower, and brokers who invest in their online presence see strong returns." },
    ],
  },

  'mortgage-broker-website-design-newcastle': {
    city: 'Newcastle',
    country: 'United Kingdom',
    regionDesc: "Newcastle's property market offers some of the UK's best affordability outside major cities, attracting strong first-time buyer demand and a growing professional population driving significant mortgage activity.",
    clientTypes: ['First-Time Buyers', 'Remortgage Clients & Home Movers'],
    localDetail: [
      "Newcastle's affordability makes it one of the UK's strongest first-time buyer markets. These clients are typically younger, mobile-first, and research extensively before choosing a broker. A website with visible Google reviews, an FCA badge, and a direct Calendly link converts this demographic consistently — they want to feel confident before they call, and your website is where that confidence is built.",
      "Newcastle has an active remortgage market as homeowners reassess their options. These clients are experienced buyers who know what good service looks like and choose brokers based on responsiveness and expertise. A clean, professional website with clear process copy and direct contact options wins this client type over competitors with dated or generic sites.",
    ],
    faqs: [
      { q: 'Can you build a mortgage broker website for a Newcastle-based broker?', a: "Yes — we work with brokers across Newcastle and the North East remotely. Newcastle's first-time buyer market is one of the most active in the UK, and we build sites that convert this demographic specifically." },
      { q: 'Is it worth investing in a professional website as a Newcastle broker?', a: "In a market where affordability drives high first-time buyer volumes, having a website that converts effectively gives you a significant advantage. Most brokers in the North East are operating with outdated or generic sites — a conversion-first build with strong social proof and instant booking stands out significantly in local search." },
    ],
  },

  // ── INTERNATIONAL ──────────────────────────────────────────
  'mortgage-broker-website-design-usa': {
    city: 'the USA',
    country: 'the United States',
    regionDesc: "The US mortgage market is one of the world's largest and most competitive, with brokers operating in a high-disclosure regulatory environment where digital credibility and instant booking capability directly determine lead volume.",
    clientTypes: ['Self-Employed Borrowers', 'Jumbo Loan & Complex Case Clients'],
    localDetail: [
      "Self-employed borrowers in the US face significant documentation complexity — bank statement loans, profit and loss requirements, and non-QM product navigation that demands specialist expertise. A mortgage broker website that signals this expertise specifically, with dedicated self-employed CTAs and process transparency, converts this high-value client type at a significantly higher rate than generic broker sites.",
      "The US jumbo and complex case market is highly competitive but also highly lucrative. These clients — executives, business owners, investors — research extensively and choose brokers based on perceived expertise and professionalism. A website that looks and feels premium, with clear credentials and a streamlined booking flow, wins this demographic over brokers with generic digital presence.",
    ],
    faqs: [
      { q: 'Do you build websites for US mortgage brokers?', a: "Yes — we work with mortgage brokers across the United States. We understand the US regulatory environment, TILA/RESPA disclosure requirements, and the client types that drive enquiries in the American market. All sites are built to the same conversion-first standard as our UK builds." },
      { q: 'What compliance considerations apply to a US mortgage broker website?', a: "US mortgage broker websites must display NMLS licensing information, equal housing opportunity statements, and comply with state-specific disclosure requirements. We build these compliance elements in as standard, ensuring your site meets federal and state requirements without them looking like afterthoughts." },
    ],
  },

  'mortgage-broker-website-design-australia': {
    city: 'Australia',
    country: 'Australia',
    regionDesc: "Australia's mortgage broking industry is one of the most mature in the world, with brokers writing over 70% of all new home loans and competing in a digital-first environment where website quality directly impacts lead quality.",
    clientTypes: ['Self-Employed & Business Owner Clients', 'First Home Buyers'],
    localDetail: [
      "Australia has a large and growing self-employed population, particularly in construction, trade, and professional services. These clients often have complex income structures that require specialist broker expertise — and they research their broker carefully before making contact. A website with specific self-employed messaging, clear ASIC compliance credentials, and a direct booking flow converts this client type significantly better than generic sites.",
      "First home buyers in Australia face a uniquely challenging market — high property prices, FHOG and FHSS scheme complexity, and intense competition for properties. A broker website that speaks directly to first home buyer anxiety, explaining the process clearly and making it easy to book a consultation, converts this demographic consistently over competitors with generic content.",
    ],
    faqs: [
      { q: 'Do you build websites for Australian mortgage brokers?', a: "Yes — we work with brokers across Australia, from Sydney and Melbourne to Brisbane, Perth, and regional markets. We understand the Australian regulatory environment, ASIC requirements, and the client types that drive enquiries in the Australian market." },
      { q: 'What compliance elements should an Australian mortgage broker website include?', a: "Australian broker websites must display Australian Credit Licence (ACL) details, ASIC authorisation information, and comply with responsible lending obligation disclosures. We build these elements in as standard, ensuring your site is compliant without the legal disclaimers dominating the user experience." },
    ],
  },

  'mortgage-broker-website-design-dubai': {
    city: 'Dubai',
    country: 'UAE',
    regionDesc: "Dubai's mortgage market is defined by a large expat population, significant international property investment, and buyers who require specialist guidance on UAE financing requirements and cross-border transaction complexity.",
    clientTypes: ['UAE Resident Expats', 'International Property Investors'],
    localDetail: [
      "Dubai has one of the world's highest concentrations of high-net-worth expat residents, many of whom are navigating UAE property purchase for the first time. These clients are sophisticated but unfamiliar with UAE-specific financing requirements, LTV restrictions, and the differences between UAE and their home country mortgage products. A broker website that acknowledges this complexity specifically — and makes the process feel manageable — converts this client type significantly better than generic content.",
      "Dubai attracts international property investors from across Europe, Asia, and the Americas, many of whom require cross-border financing guidance alongside UAE mortgage access. These clients research extensively and choose brokers based on perceived expertise and responsiveness. A premium website with clear international client experience and direct booking converts this high-value demographic consistently.",
    ],
    faqs: [
      { q: 'Do you build websites for Dubai and UAE mortgage brokers?', a: "Yes — we work with brokers across the UAE and GCC. We understand the Dubai mortgage market, including the expat and international investor demographics that define it, and build sites that speak directly to these client types." },
      { q: 'What makes a Dubai mortgage broker website different from a UK one?', a: "The client base is more international, the compliance framework is different (CBUAE regulated), and the typical transaction involves more cross-border complexity. Your website needs to acknowledge expat and international buyer situations specifically, and your credentials should be prominent given that many clients are unfamiliar with the UAE regulatory environment." },
    ],
  },

  'mortgage-broker-website-design-canada': {
    city: 'Canada',
    country: 'Canada',
    regionDesc: "Canada's mortgage market is broker-dominated, with independent brokers offering access to a wide lender panel in a highly competitive digital environment where website quality directly determines lead quality and volume.",
    clientTypes: ['First-Time Home Buyers', 'Self-Employed & New-to-Canada Clients'],
    localDetail: [
      "Canadian first-time home buyers face a market defined by stress test requirements, CMHC insurance complexity, and significant affordability pressure in major cities. A broker website that explains these elements clearly — and makes the process feel navigable rather than overwhelming — builds the trust that converts anxious first-time buyers into booked consultations.",
      "Canada's self-employed and new-to-Canada populations both represent high-value but underserved mortgage client types. Self-employed applicants face stated income product complexity; new Canadians face credit history challenges and CMHC requirements for non-residents. A website with specific CTAs and copy for each of these situations signals the expertise these clients need to see before they make contact.",
    ],
    faqs: [
      { q: 'Do you build websites for Canadian mortgage brokers?', a: "Yes — we work with brokers across Canada, from Toronto and Vancouver to Calgary, Ottawa, and Montreal. We understand FSRA and provincial licensing requirements and build sites compliant with Canadian mortgage broker regulatory standards." },
      { q: 'What compliance elements should a Canadian mortgage broker website include?', a: "Provincial licensing information, FSRA or equivalent authorisation details, and CMHC disclosure requirements where relevant. We build these in as standard, ensuring your site is compliant while maintaining the clean, professional design that converts clients." },
    ],
  },

  'mortgage-broker-website-design-new-zealand': {
    city: 'New Zealand',
    country: 'New Zealand',
    regionDesc: "New Zealand's mortgage advising industry operates under FSLAA licensing, with brokers competing in a digital-first environment where first-time buyers and property investors represent the two largest client segments.",
    clientTypes: ['First Home Buyers', 'Property Investors & Refinance Clients'],
    localDetail: [
      "New Zealand first home buyers face a market defined by LVR restrictions, KiwiSaver first home withdrawal complexity, and significant affordability pressure in Auckland and Wellington. A broker website that speaks directly to these challenges — and makes the process feel manageable — converts first-time buyer enquiries at a significantly higher rate than generic advice content.",
      "New Zealand's property investor market has evolved significantly following LVR restriction changes and interest deductibility rule changes. Investors need brokers who demonstrate up-to-date knowledge of the regulatory environment. A website with specific investor content, clear credentials, and a direct booking option signals the expertise this client type needs before making contact.",
    ],
    faqs: [
      { q: 'Do you build websites for New Zealand mortgage advisers?', a: "Yes — we work with advisers across New Zealand. We understand FSLAA licensing requirements and the NZ mortgage market, including the KiwiSaver, LVR, and investor regulatory context that defines client needs here." },
      { q: 'What should a New Zealand mortgage adviser website include for compliance?', a: "FSLAA Financial Advice Provider (FAP) licence details, disclosure statement links, and FSPR registration information. We build these compliance elements in as standard, ensuring your site meets New Zealand regulatory requirements without them dominating the user experience." },
    ],
  },

  'mortgage-broker-website-design-singapore': {
    city: 'Singapore',
    country: 'Singapore',
    regionDesc: "Singapore's mortgage market is defined by MAS regulation, TDSR framework complexity, and a sophisticated, research-heavy buyer demographic that includes a large expat community and high-net-worth investor segment.",
    clientTypes: ['Expat & PR Buyers', 'HDB Upgraders & Private Property Investors'],
    localDetail: [
      "Singapore's expat and permanent resident population represents a significant mortgage client segment, often navigating ABSD, LTV restrictions, and the additional complexity of non-citizen property purchase rules. A broker website that acknowledges expat and PR-specific situations explicitly — with dedicated copy and a clear process explanation — converts this client type significantly better than generic content.",
      "Singapore's HDB upgrader and private property investor market is sophisticated and research-intensive. These clients understand the market well and choose brokers based on demonstrated expertise and responsiveness. A premium website with clear MAS-authorised credentials, visible client reviews, and a direct booking option positions you as the expert choice in this competitive segment.",
    ],
    faqs: [
      { q: 'Do you build websites for Singapore mortgage brokers?', a: "Yes — we work with brokers across Singapore and the wider Southeast Asia region. We understand MAS regulatory requirements, TDSR framework disclosure obligations, and the client types that define the Singapore mortgage market." },
      { q: 'What compliance elements does a Singapore mortgage broker website need?', a: "MAS authorisation details, TDSR disclosure information, and clear communication of your regulatory status as a licensed financial adviser. We build these elements in as standard, ensuring your site is compliant while maintaining the clean, conversion-focused design that wins clients." },
    ],
  },

  'mortgage-broker-website-design-hong-kong': {
    city: 'Hong Kong',
    country: 'Hong Kong',
    regionDesc: "Hong Kong's mortgage market operates under HKMA oversight, with a sophisticated buyer demographic, significant expat population, and one of the world's most competitive property markets driving demand for expert broker guidance.",
    clientTypes: ['Expat & International Buyers', 'Local Professional & Investment Buyers'],
    localDetail: [
      "Hong Kong's expat community represents a large and underserved mortgage client segment, often navigating HKMA LTV restrictions, stress test requirements, and the additional complexity of non-permanent resident mortgage rules. A broker website that speaks directly to expat and international buyer situations — with clear process explanation and direct booking — wins this client type over competitors with generic content.",
      "Hong Kong's local professional and investment buyer market is sophisticated, research-intensive, and makes decisions based on perceived expertise and digital credibility. A premium, conversion-focused website with HKMA-compliant credentials, visible client reviews, and a streamlined booking flow positions you as the credible choice in this competitive market.",
    ],
    faqs: [
      { q: 'Do you build websites for Hong Kong mortgage brokers?', a: "Yes — we work with brokers across Hong Kong. We understand HKMA regulatory requirements, the expat buyer demographic, and the high standards of digital credibility expected in the Hong Kong financial services market." },
      { q: 'What makes a Hong Kong mortgage broker website effective?', a: "In Hong Kong's sophisticated market, premium design and clear credentials are non-negotiable. Beyond that, the expat buyer segment is large and underserved by most broker sites — specific content addressing non-permanent resident mortgage complexity converts this client type at a high rate." },
    ],
  },

  'mortgage-broker-website-design-ireland': {
    city: 'Ireland',
    country: 'Ireland',
    regionDesc: "Ireland's mortgage market is experiencing strong demand driven by a housing shortage, a large diaspora returning from abroad, and a growing professional population in Dublin and regional cities.",
    clientTypes: ['First-Time Buyers', 'Returning Diaspora & Expat Buyers'],
    localDetail: [
      "Ireland's first-time buyer market is one of the most pressured in Europe, with demand significantly outstripping supply and buyers competing intensely for available properties. A broker website that builds trust immediately — through visible reviews, clear Central Bank of Ireland authorisation, and a direct booking link — gives anxious first-time buyers the confidence to choose you over competitors.",
      "Ireland has a significant returning diaspora market — Irish nationals returning from the UK, USA, Australia, and elsewhere who need to navigate Irish mortgage requirements with non-Irish employment history. A website that acknowledges this specific situation, with dedicated copy and process explanation, captures enquiries that most broker sites miss entirely.",
    ],
    faqs: [
      { q: 'Do you build websites for Irish mortgage brokers?', a: "Yes — we work with brokers across Ireland. We understand Central Bank of Ireland authorisation requirements and the Irish market, including the returning diaspora segment that represents a significant and underserved client type." },
      { q: 'What compliance elements should an Irish mortgage broker website include?', a: "Central Bank of Ireland authorisation details, Consumer Protection Code compliance statements, and clear disclosure of your regulated status. We build these elements in as standard, ensuring your site is compliant while maintaining the professional design that converts clients." },
    ],
  },

  'mortgage-broker-website-design-south-africa': {
    city: 'South Africa',
    country: 'South Africa',
    regionDesc: "South Africa's bond origination market is broker-dominated, with originators submitting applications to multiple banks simultaneously in a competitive environment where digital presence increasingly determines lead quality.",
    clientTypes: ['First-Time Home Buyers', 'Self-Employed & Business Owner Applicants'],
    localDetail: [
      "South Africa's first-time home buyer market is one of the most active segments in the bond origination industry, driven by the government's focus on first-time buyer support and relatively accessible entry-level property prices in secondary cities. A broker website that speaks directly to first-time buyer anxiety and makes the application process feel manageable converts this client type consistently.",
      "South Africa has a significant self-employed and business owner population that faces complex income documentation requirements. These clients need a broker who signals expertise in non-standard income applications — commission earners, sole traders, and company directors all have specific challenges that a specialist broker website should acknowledge directly.",
    ],
    faqs: [
      { q: 'Do you build websites for South African bond originators and mortgage brokers?', a: "Yes — we work with originators and brokers across South Africa. We understand the South African bond origination market and build sites that convert the client types most active in this market." },
      { q: 'What should a South African mortgage broker website include?', a: "NCR registration details, FAIS compliance information, and clear communication of your multi-bank submission capability — a key differentiator in the South African market. We build these elements in as standard alongside the conversion fundamentals that drive enquiries." },
    ],
  },

  'mortgage-broker-website-design-germany': {
    city: 'Germany',
    country: 'Germany',
    regionDesc: "Germany's mortgage market has a growing independent broker sector as buyers increasingly seek expert guidance through the country's complex property financing requirements and KfW subsidy landscape.",
    clientTypes: ['Expat & International Buyers', 'First-Time Buyers & KfW Applicants'],
    localDetail: [
      "Germany has a large expat population, particularly in Berlin, Munich, Frankfurt, and Hamburg, who need specialist guidance navigating German mortgage requirements as non-citizens. These clients face restrictions on LTV, additional documentation requirements, and the complexity of dealing with German banks in a second language. A broker website that speaks directly to expat buyer situations converts this underserved segment effectively.",
      "German first-time buyers increasingly seek broker guidance to navigate KfW subsidy programmes, Baukindergeld eligibility, and the complexity of buying in a market traditionally dominated by direct bank relationships. A website that explains broker value clearly — including KfW expertise — and makes the process feel accessible converts this growing client segment.",
    ],
    faqs: [
      { q: 'Do you build websites for German mortgage brokers?', a: "Yes — we work with brokers operating in Germany. We understand the expat buyer demographic that defines much of the independent broker market in Germany and build sites with content that speaks directly to this client type." },
      { q: 'What makes the expat buyer segment valuable for German mortgage brokers?', a: "Expats in Germany face specific barriers — language, unfamiliar banking systems, LTV restrictions — that most German banks don't address well. A broker who specialises in expat clients and signals this clearly on their website captures a high-value segment that is actively underserved by the mainstream German mortgage market." },
    ],
  },

  'mortgage-broker-website-design-france': {
    city: 'France',
    country: 'France',
    regionDesc: "France's mortgage market attracts significant international buyer interest, particularly from British and other European nationals purchasing second homes and investment properties, creating strong demand for English-speaking broker expertise.",
    clientTypes: ['International & British Buyers', 'Expat Residents & Property Investors'],
    localDetail: [
      "France's international property buyer market — particularly British buyers purchasing in Provence, the Dordogne, and Paris — represents a large and specialist client segment that needs English-speaking broker expertise in French mortgage products. A website that signals this cross-border expertise explicitly, with specific copy addressing international purchase complexity, captures enquiries that generic French broker sites miss.",
      "France has a significant English-speaking expat resident population who need French mortgage advice in their first language. These clients are typically professionals or retirees who have chosen France as a long-term home — they're motivated, well-researched, and choose brokers based on demonstrated expertise and professionalism. A premium website with clear credentials and a direct booking option wins this client type.",
    ],
    faqs: [
      { q: 'Do you build websites for French mortgage brokers and courtiers?', a: "Yes — we work with brokers operating in France, including those serving the international buyer and English-speaking expat markets. We understand the specific client types that drive enquiries for English-speaking mortgage brokers in France." },
      { q: 'What should a French mortgage broker website include for international clients?', a: "Clear communication that you operate in English, specific content addressing international purchase requirements, and transparency about the French mortgage process for non-French nationals. These three elements convert the international buyer segment significantly better than a generic French broker website." },
    ],
  },

  'mortgage-broker-website-design-spain': {
    city: 'Spain',
    country: 'Spain',
    regionDesc: "Spain's mortgage market is significantly driven by international property buyers, with British, German, and Scandinavian buyers purchasing in coastal and city markets, creating strong demand for multilingual specialist broker expertise.",
    clientTypes: ['British & International Property Buyers', 'Expat Residents & Investors'],
    localDetail: [
      "Spain remains one of the most popular international property purchase destinations, with British buyers in particular driving significant demand across the Costa del Sol, Alicante, and the Balearic Islands. These buyers need specialist guidance on Spanish mortgage requirements as non-residents — NIE requirements, LTV restrictions, and the specific documentation complexity of cross-border purchase. A broker website that speaks to this situation directly converts far better than generic content.",
      "Spain's expat resident population includes a large community of British, Northern European, and Latin American professionals who need Spanish mortgage products explained in their first language. A premium website with specific expat resident content, clear LCCI-compliant credentials, and an English-language booking flow captures this underserved segment effectively.",
    ],
    faqs: [
      { q: 'Do you build websites for Spanish mortgage brokers?', a: "Yes — we work with brokers operating in Spain, including those serving the international buyer and expat resident markets. We understand the client types that drive demand for English-speaking mortgage brokers in Spain." },
      { q: 'What compliance elements should a Spanish mortgage broker website include?', a: "LCCI (Ley de Contratos de Crédito Inmobiliario) compliance information, Banco de España registration details, and clear disclosure of your regulated status. We build these elements in as standard alongside the conversion-focused design that wins international buyers." },
    ],
  },

  'mortgage-broker-website-design-portugal': {
    city: 'Portugal',
    country: 'Portugal',
    regionDesc: "Portugal's mortgage market has grown significantly with international buyer interest, particularly post-NHR scheme popularity, attracting British, American, and Northern European buyers who need specialist English-speaking broker guidance.",
    clientTypes: ['International & Expat Buyers', 'NHR & Digital Nomad Residents'],
    localDetail: [
      "Portugal has attracted a large wave of international buyers — British post-Brexit, Americans seeking European base, Northern Europeans drawn by climate and affordability. These buyers face non-resident mortgage complexity, banco de Portugal requirements, and the documentation challenges of cross-border purchase. A broker website that speaks to these specific challenges converts this growing and high-value client segment.",
      "Portugal's NHR (Non-Habitual Resident) programme attracted significant numbers of remote workers and digital nomads who subsequently transitioned into property buyers. This client segment is typically well-educated, research-intensive, and chooses brokers based on digital credibility. A premium website with specific NHR and international resident content performs strongly in this niche.",
    ],
    faqs: [
      { q: 'Do you build websites for Portuguese mortgage brokers and intermediários?', a: "Yes — we work with brokers operating in Portugal, including those serving the large international buyer market. We understand the client types driving demand for English-speaking mortgage expertise in Portugal." },
      { q: 'What should a Portugal mortgage broker website include for international buyers?', a: "Clear English-language content explaining the Portuguese mortgage process for non-residents, ASF (Autoridade de Supervisão de Seguros e Fundos de Pensões) compliance information, and specific content addressing NHR and Golden Visa buyer complexity. These elements convert international buyers significantly better than generic broker content." },
    ],
  },
}

export default function LocationPage({ location, slug }) {
  if (!location) return null
  const { city, country, regionDesc, clientTypes, localDetail, faqs } = location

  return (
    <Layout
      title={`Mortgage Broker Website Design ${city}`}
      description={`Specialist mortgage broker website design for independent advisers in ${city}. Conversion-first, FCA-compliant, delivered in 7 days from £2,500.`}
      canonical={`/${slug}`}
    >
      {/* Hero */}
      <div style={{ background: '#1A1428', padding: '80px 48px', textAlign: 'center' }}>
        <span className="section-label" style={{ display: 'block', marginBottom: '16px' }}>
          Mortgage broker website design {city}
        </span>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.1, marginBottom: '16px', letterSpacing: '-0.02em' }}>
          The mortgage broker website<br /><em style={{ color: '#E2C46A' }}>{city} independents trust.</em>
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)', maxWidth: '560px', margin: '0 auto 32px', lineHeight: 1.85 }}>
          {regionDesc}. Senja Studio builds conversion-first, FCA-compliant mortgage broker websites exclusively for independent advisers — worldwide. Delivered in 7 days from £2,500.
        </p>
        <button className="btn-gold" onClick={() => document.dispatchEvent(new CustomEvent('openModal'))}>
          Book a Free Call — It's Free
        </button>
      </div>

      {/* Why section */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 48px' }}>
        <span className="section-label" style={{ display: 'block', textAlign: 'center', marginBottom: '16px' }}>
          Why brokers in {city} choose Senja Studio
        </span>
        <h2 className="section-heading">
          Built for the way {city}<br />mortgage clients <em>actually search.</em>
        </h2>
        <div className="grid-2col" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {[
            { title: `Segmented for ${clientTypes[0]}`, body: localDetail[0] },
            { title: `Segmented for ${clientTypes[1]}`, body: localDetail[1] },
            { title: 'FCA Compliance Built In', body: `Every site we deliver includes a compliant authorisation statement, regulatory disclosure, and cookie consent — built correctly from day one. Not bolted on as an afterthought.` },
            { title: `Live in 7 Working Days`, body: `From brief to live site in 7 days. While a generic agency in ${city} takes 6–10 weeks and charges £5,000+, we deliver a higher-converting site at a fraction of the cost.` },
          ].map((card, i) => (
            <div key={i} className="card" style={{ background: 'var(--white)', padding: '36px 28px' }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', fontWeight: 500, color: 'var(--navy)', marginBottom: '10px' }}>{card.title}</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.85 }}>{card.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="stat-row" style={{ background: 'var(--navy)', padding: '40px 48px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', textAlign: 'center' }}>
        {[['7', 'Day delivery'], ['£2,500', 'Full website from'], ['100%', 'Mortgage broker niche']].map(([num, label]) => (
          <div key={label} style={{ padding: '20px' }}>
            <div className="stat-num" style={{ fontFamily: 'var(--serif)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--gold-light)', marginBottom: '6px' }}>{num}</div>
            <div className="stat-label" style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div style={{ maxWidth: '740px', margin: '0 auto', padding: '72px 48px' }}>
        <h2 className="section-heading">Questions from {city}<br />mortgage brokers</h2>
        <div style={{ border: '1px solid var(--border)' }}>
          {faqs.map((faq, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-q">{faq.q}</summary>
              <div className="faq-a">{faq.a}</div>
            </details>
          ))}
        </div>
      </div>

      {/* Related articles */}
      <div style={{ maxWidth: '740px', margin: '0 auto', padding: '0 48px 72px' }}>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', fontWeight: 500, color: 'var(--navy)', marginBottom: '24px' }}>
          Related articles
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { slug: 'fca-compliant-mortgage-broker-website', title: 'FCA Compliant Mortgage Broker Website: What You Actually Need in 2025' },
            { slug: 'why-mortgage-broker-websites-fail-to-convert', title: 'Why Most Mortgage Broker Websites Fail to Convert' },
            { slug: 'how-much-does-a-mortgage-broker-website-cost', title: 'How Much Does a Mortgage Broker Website Cost UK?' },
          ].map(article => (
            <Link key={article.slug} href={`/blog/${article.slug}`} style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--navy)', fontFamily: 'var(--serif)' }}>{article.title}</span>
              <span style={{ color: 'var(--gold)', fontSize: '0.8rem', flexShrink: 0, marginLeft: '12px' }}>→</span>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: 'var(--navy)', padding: '80px 48px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 600, color: 'var(--white)', lineHeight: 1.1, marginBottom: '16px', letterSpacing: '-0.02em' }}>
          Ready to build the best<br />broker site in <em style={{ color: 'var(--gold-light)' }}>{city}?</em>
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)', maxWidth: '500px', margin: '0 auto 32px', lineHeight: 1.85 }}>
          Book a free 30-minute call. We'll review your current site, show you a live example, and tell you exactly what your next site should look like. No commitment required.
        </p>
        <button className="btn-gold" onClick={() => document.dispatchEvent(new CustomEvent('openModal'))}>
          Book Your Free Call
        </button>
        <p style={{ marginTop: '16px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)' }}>
          Typically responds within 2 hours · dan@senjastudio.co.uk
        </p>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(LOCATIONS).map(slug => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const location = LOCATIONS[params.slug] || null
  return { props: { location, slug: params.slug } }
}
