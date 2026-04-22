import { Link } from '@/i18n/navigation'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dragonquestsmashgrow.wiki'
  const path = '/about'

  return {
    title: 'About Dragon Quest Smash Grow Wiki',
    description:
      'Learn about Dragon Quest Smash Grow Wiki, our editorial goals, coverage scope, and how to contact the team.',
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
      title: 'About Dragon Quest Smash Grow Wiki',
      description: 'Who runs this fan-made Dragon Quest Smash Grow guide hub and what we cover.',
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
      title: 'About Dragon Quest Smash Grow Wiki',
      description: 'Who runs this fan-made Dragon Quest Smash Grow guide hub and what we cover.',
      images: [`${siteUrl}/images/hero.webp`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Dragon Quest Smash Grow Wiki</h1>
          <p className="text-slate-300 text-lg mb-2">Unofficial fan-made guides, references, and launch tracking</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>What This Site Is</h2>
            <p>
              Dragon Quest Smash Grow Wiki is a fan-run information hub focused on helping players find accurate,
              up-to-date references for Dragon Quest Smash/Grow.
            </p>
            <p>
              We aggregate starter guidance, reroll notes, update tracking, and direct links to official resources.
            </p>

            <h2>What We Cover</h2>
            <ul>
              <li>Beginner flow and launch-day setup.</li>
              <li>Reroll and early progression references.</li>
              <li>Blessings, vocations, and co-op basics.</li>
              <li>Official trailer and update tracking.</li>
              <li>Platform links for iOS and Android.</li>
            </ul>

            <h2>Editorial Principles</h2>
            <ul>
              <li>Prioritize official announcements and verifiable sources.</li>
              <li>Mark speculation clearly and avoid rumor-only claims.</li>
              <li>Update pages quickly after major patches or live events.</li>
              <li>Keep guides practical and easy to scan.</li>
            </ul>

            <h2>Community and Feedback</h2>
            <p>
              If you spot outdated information or missing details, send feedback and source links so we can review and
              update quickly.
            </p>

            <h2>Contact</h2>
            <p>
              General inquiries: <a href="mailto:contact@dragonquestsmashgrow.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">contact@dragonquestsmashgrow.wiki</a>
            </p>
            <p>
              Content corrections: <a href="mailto:editor@dragonquestsmashgrow.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">editor@dragonquestsmashgrow.wiki</a>
            </p>

            <h2>Important Disclaimer</h2>
            <p>
              Dragon Quest Smash Grow Wiki is an unofficial fan website and is not affiliated with, endorsed by,
              or associated with SQUARE ENIX, KLab, Apple, Google, or other official entities.
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
