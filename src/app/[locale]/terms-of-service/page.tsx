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
  const path = '/terms-of-service'

  return {
    title: 'Terms of Service - Dragon Quest Smash Grow Wiki',
    description:
      'Read the Terms of Service for Dragon Quest Smash Grow Wiki, including acceptable use, disclaimers, and legal terms.',
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
      title: 'Terms of Service - Dragon Quest Smash Grow Wiki',
      description: 'Terms and conditions for using this Dragon Quest Smash Grow fan wiki.',
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
      title: 'Terms of Service - Dragon Quest Smash Grow Wiki',
      description: 'Terms and conditions for using this Dragon Quest Smash Grow fan wiki.',
      images: [`${siteUrl}/images/hero.webp`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-slate-300 text-lg mb-2">Terms and conditions for using this website</p>
          <p className="text-slate-400 text-sm">Last Updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using Dragon Quest Smash Grow Wiki, you agree to these Terms of Service. If you do not
              agree, do not use this website.
            </p>

            <h2>2. Service Description</h2>
            <p>
              This website is an unofficial fan-made resource for Dragon Quest Smash/Grow. We publish informational
              content such as guides, news summaries, and references to official platforms.
            </p>

            <h2>3. Fan-Site Disclaimer</h2>
            <p>
              Dragon Quest Smash Grow Wiki is not affiliated with, endorsed by, or sponsored by SQUARE ENIX, KLab,
              Apple, Google, YouTube, Discord, Reddit, or X.
            </p>

            <h2>4. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Violate applicable law or third-party rights.</li>
              <li>Attempt unauthorized access to systems or data.</li>
              <li>Use bots, scrapers, or automated abuse against the site.</li>
              <li>Distribute malware or disruptive code.</li>
              <li>Republish our original content for commercial purposes without permission.</li>
            </ul>

            <h2>5. Intellectual Property</h2>
            <p>
              Our original text, layout, and compilations are owned by this website unless noted otherwise.
              Dragon Quest Smash/Grow game assets, logos, and trademarks belong to their respective owners.
            </p>

            <h2>6. External Links</h2>
            <p>
              We link to external platforms for convenience. We are not responsible for external content,
              service availability, or privacy practices.
            </p>

            <h2>7. No Warranty</h2>
            <p>
              Content is provided on an "as is" and "as available" basis. We do not guarantee completeness,
              uninterrupted availability, or fitness for a particular purpose.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              To the fullest extent allowed by law, we are not liable for indirect or consequential damages resulting
              from use of this website or linked third-party services.
            </p>

            <h2>9. Changes</h2>
            <p>
              We may update these terms at any time. Continued use after updates means you accept the revised terms.
            </p>

            <h2>10. Contact</h2>
            <p>
              For legal questions: <a href="mailto:legal@dragonquestsmashgrow.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">legal@dragonquestsmashgrow.wiki</a>
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
