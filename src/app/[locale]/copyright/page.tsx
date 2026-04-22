import { Link } from '@/i18n/navigation'
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
  const path = '/copyright'

  return {
    title: 'Copyright Notice - Dragon Quest Smash Grow Wiki',
    description:
      'Copyright and fair-use notice for Dragon Quest Smash Grow Wiki, including DMCA contact information and attribution guidelines.',
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
      title: 'Copyright Notice - Dragon Quest Smash Grow Wiki',
      description: 'Copyright ownership, fair use statement, and takedown process.',
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
      title: 'Copyright Notice - Dragon Quest Smash Grow Wiki',
      description: 'Copyright ownership, fair use statement, and takedown process.',
      images: [`${siteUrl}/images/hero.webp`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function Copyright() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Copyright Notice</h1>
          <p className="text-slate-300 text-lg mb-2">Ownership, fair use, and takedown process</p>
          <p className="text-slate-400 text-sm">Last Updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Website Content Ownership</h2>
            <p>
              Unless otherwise noted, original written content on Dragon Quest Smash Grow Wiki is owned by this site
              and protected by copyright law.
            </p>

            <h2>2. Game IP and Trademarks</h2>
            <p>
              Dragon Quest Smash/Grow game assets, names, logos, and trademarks are the property of their respective
              owners, including SQUARE ENIX and related rights holders.
            </p>

            <h2>3. Fair Use</h2>
            <p>
              We may reference limited game assets for commentary, educational explanation, and fan documentation.
              We do not claim ownership of official game property.
            </p>

            <h2>4. Attribution Requirements</h2>
            <p>If you quote our original content, please:</p>
            <ul>
              <li>Provide clear source attribution to Dragon Quest Smash Grow Wiki.</li>
              <li>Link to the original article or page.</li>
              <li>Avoid implying official endorsement or partnership.</li>
            </ul>

            <h2>5. DMCA and Takedown Requests</h2>
            <p>
              If you believe copyrighted material appears on this site without authorization, contact us with:
            </p>
            <ul>
              <li>Your name and contact information.</li>
              <li>Identification of the copyrighted work.</li>
              <li>The exact URL of the material in question.</li>
              <li>A statement of good-faith belief and authority to act.</li>
            </ul>

            <h2>6. Contact</h2>
            <p>
              Copyright inquiries: <a href="mailto:copyright@dragonquestsmashgrow.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">copyright@dragonquestsmashgrow.wiki</a>
            </p>
            <p>
              DMCA notices: <a href="mailto:dmca@dragonquestsmashgrow.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">dmca@dragonquestsmashgrow.wiki</a>
            </p>

            <h2>7. Fan-Site Disclaimer</h2>
            <p>
              Dragon Quest Smash Grow Wiki is an unofficial fan project and is not affiliated with or endorsed by
              SQUARE ENIX, KLab, or other official entities.
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
