import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": "Senja Studio",
        "url": "https://senjastudio.co.uk",
        "description": "Website design studio working exclusively with independent mortgage brokers, in the UK and internationally. Conversion-first builds with the local regulator's requirements handled. Websites from £1,500, full builds from £2,500, delivered in 7 days.",
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
        "name": "Website + Leads",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Senja Studio"
        },
        "description": "Full mortgage broker website built in the first month, then 10 qualified mortgage appointments booked into your diary every month after",
        // UnitPriceSpecification with a monthly referenceQuantity, not a bare
        // price — these three are recurring, and a flat "price" would be read
        // as a one-off build fee in search results.
        "offers": {
          "@type": "Offer",
          "priceCurrency": "GBP",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "3500",
            "priceCurrency": "GBP",
            "referenceQuantity": { "@type": "QuantitativeValue", "value": 1, "unitCode": "MON" }
          }
        }
      },
      {
        "@type": "Service",
        "name": "Starter Leads",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Senja Studio"
        },
        "description": "Outbound appointment setting for mortgage brokers — 10 qualified appointments booked into your diary each month, no website required",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "GBP",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "1500",
            "priceCurrency": "GBP",
            "referenceQuantity": { "@type": "QuantitativeValue", "value": 1, "unitCode": "MON" }
          }
        }
      },
      {
        "@type": "Service",
        "name": "Pay Per Appointment",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Senja Studio"
        },
        "description": "Qualified mortgage appointments billed individually with no monthly retainer, minimum 5 to start",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "GBP",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "175",
            "priceCurrency": "GBP",
            "unitText": "appointment"
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
        "description": "Specialist in mortgage broker website design, building conversion-first websites for independent brokers"
      }
    ]
  }

  return (
    <Html lang="en">
      <Head>
        {/* Fonts are self-hosted from /public/fonts and declared in
            styles/fonts.css — no request to fonts.googleapis.com. The two
            faces above the fold are preloaded so text paints immediately. */}
        <link rel="preload" href="/fonts/playfair-display-400-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/inter-300-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
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
