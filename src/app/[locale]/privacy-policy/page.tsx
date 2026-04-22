import Link from 'next/link'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

const LAST_UPDATED = 'April 22, 2026'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dragonquestsmashgrow.wiki'
  const path = '/privacy-policy'

  return {
    title: 'Privacy Policy - Dragon Quest Smash Grow Wiki',
    description:
      'Read the Privacy Policy for Dragon Quest Smash Grow Wiki, including analytics usage, cookies, data retention, and contact details.',
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale,
      url: locale === 'en' ? `${siteUrl}${path}` : `${siteUrl}/${locale}${path}`,
      siteName: 'Dragon Quest Smash Grow Wiki',
      title: 'Privacy Policy - Dragon Quest Smash Grow Wiki',
      description: 'How this fan-made Dragon Quest Smash Grow wiki collects and processes data.',
      images: [
        {
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          alt: 'Dragon Quest Smash Grow Wiki',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Privacy Policy - Dragon Quest Smash Grow Wiki',
      description: 'How this fan-made Dragon Quest Smash Grow wiki collects and processes data.',
      images: [`${siteUrl}/images/hero.webp`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-300 text-lg mb-2">How we collect, use, and protect your information</p>
          <p className="text-slate-400 text-sm">Last Updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Scope</h2>
            <p>
              Dragon Quest Smash Grow Wiki is an unofficial fan-made informational website. This policy explains
              what data we process when you browse this site.
            </p>

            <h2>2. Data We Collect</h2>
            <ul>
              <li>
                <strong>Technical and analytics data:</strong> IP address, browser, device type, pages viewed, and
                approximate location.
              </li>
              <li>
                <strong>Preference data:</strong> Language and theme settings stored in your browser.
              </li>
              <li>
                <strong>Contact data:</strong> Information you provide when you email us.
              </li>
            </ul>

            <h2>3. How We Use Data</h2>
            <ul>
              <li>Operate, secure, and improve the website.</li>
              <li>Understand which guides and pages are most useful.</li>
              <li>Diagnose technical issues and performance bottlenecks.</li>
              <li>Respond to user messages and requests.</li>
            </ul>

            <h2>4. Cookies and Analytics</h2>
            <p>
              We may use analytics tools and cookies for aggregate usage reporting. You can control or delete cookies
              via your browser settings.
            </p>

            <h2>5. Third-Party Links</h2>
            <p>
              This site links to third-party platforms such as the official Dragon Quest Smash/Grow website,
              App Store, Google Play, Discord, X, Reddit, and YouTube. Their privacy practices are governed by their
              own policies.
            </p>

            <h2>6. Data Retention</h2>
            <p>
              We keep analytics and operational data only as long as needed for site operations, legal compliance,
              and abuse prevention.
            </p>

            <h2>7. Children</h2>
            <p>
              This website is intended for a general audience and is not designed to knowingly collect personal data
              from children under 13.
            </p>

            <h2>8. International Access</h2>
            <p>
              By using this site, you understand that data may be processed in countries where our hosting,
              analytics, or infrastructure providers operate.
            </p>

            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. Material changes will be reflected by updating the
              "Last Updated" date above.
            </p>

            <h2>10. Fan-Site Disclaimer</h2>
            <p>
              Dragon Quest Smash Grow Wiki is not affiliated with, endorsed by, or sponsored by SQUARE ENIX, KLab,
              Apple, Google, or any official platform provider. All game-related trademarks and assets belong to
              their respective owners.
            </p>

            <h2>11. Contact</h2>
            <p>
              For privacy-related requests, contact: <a href="mailto:privacy@dragonquestsmashgrow.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">privacy@dragonquestsmashgrow.wiki</a>
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 border-t border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <Link href="/" className="text-[hsl(var(--nav-theme-light))] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}
