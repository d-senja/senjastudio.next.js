import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": "Senja Studio",
        "url": "https://senjastudio.co.uk",
        "description": "Mortgage broker website design agency building conversion-first, FCA-compliant websites exclusively for independent mortgage brokers worldwide. Delivered in 7 days from £2,500.",
        "priceRange": "££",
        "email": "dan@senjastudio.co.uk",
        "areaServed": "Worldwide",
        "serviceType": "Mortgage Broker Website Design",
        "founder": {
          "@type": "Person",
          "name": "Dan Senja",
          "jobTitle": "Founder",
          "email": "dan@senjastudio.co.uk"
        }
      },
      {
        "@type": "Service",
        "name": "Homepage Build",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Senja Studio"
        },
        "description": "Single-page high-converting mortgage broker website",
        "offers": {
          "@type": "Offer",
          "price": "1500",
          "priceCurrency": "GBP"
        }
      },
      {
        "@type": "Service",
        "name": "Full Website",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Senja Studio"
        },
        "description": "Complete mortgage broker website with homepage, about, services, and contact pages",
        "offers": {
          "@type": "Offer",
          "price": "2500",
          "priceCurrency": "GBP"
        }
      },
      {
        "@type": "Service",
        "name": "Bespoke Website",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Senja Studio"
        },
        "description": "Custom multi-page mortgage broker website tailored to specific requirements",
        "offers": {
          "@type": "Offer",
          "price": "3500",
          "priceCurrency": "GBP",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "minPrice": "3500",
            "priceCurrency": "GBP"
          }
        }
      },
      {
        "@type": "WebSite",
        "name": "Senja Studio",
        "url": "https://senjastudio.co.uk",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://senjastudio.co.uk/blog?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Person",
        "name": "Dan Senja",
        "jobTitle": "Founder",
        "worksFor": {
          "@type": "LocalBusiness",
          "name": "Senja Studio"
        },
        "email": "dan@senjastudio.co.uk",
        "description": "Specialist in mortgage broker website design, building conversion-first, FCA-compliant websites for independent brokers"
      }
    ]
  }

  return (
    <Html lang="en">
      <Head>
        {/* Google Fonts — lives here so it's in the real document head, not per-page */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
