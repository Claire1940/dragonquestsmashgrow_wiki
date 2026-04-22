'use client'

import { useEffect, Suspense, lazy } from 'react'
import {
  ArrowRight,
  BookOpen,
  Check,
  ClipboardCheck,
  Clock,
  ExternalLink,
  Gamepad2,
  Hammer,
  Home,
  MessageCircle,
  Package,
  Settings,
  Sparkles,
  Star,
  TrendingUp,
} from 'lucide-react'
import Link from 'next/link'
import { useMessages } from 'next-intl'
import { VideoFeature } from '@/components/home/VideoFeature'
import { LatestGuidesAccordion } from '@/components/home/LatestGuidesAccordion'
import { NativeBannerAd, AdBanner } from '@/components/ads'
import { SidebarAd } from '@/components/ads/SidebarAd'
import { scrollToSection } from '@/lib/scrollToSection'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import type { ContentItemWithType } from '@/lib/getLatestArticles'
import type { ModuleLinkMap } from '@/lib/buildModuleLinkMap'

// Lazy load heavy components
const HeroStats = lazy(() => import('@/components/home/HeroStats'))
const FAQSection = lazy(() => import('@/components/home/FAQSection'))
const CTASection = lazy(() => import('@/components/home/CTASection'))

// Loading placeholder
const LoadingPlaceholder = ({ height = 'h-64' }: { height?: string }) => (
  <div className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`} />
)

// Conditionally render text as a link or plain span
function LinkedTitle({
  linkData: _linkData,
  children,
  className,
  locale: _locale,
}: {
  linkData: { url: string; title: string } | null | undefined
  children: React.ReactNode
  className?: string
  locale: string
}) {
  return <span className={className}>{children}</span>
}

interface HomePageClientProps {
  latestArticles: ContentItemWithType[]
  moduleLinkMap: ModuleLinkMap
  locale: string
  featuredVideo: {
    id: string
    title: string
  }
  externalLinks: {
    officialSite: string
    appStore: string
    googlePlay: string
    discord: string
    x: string
    reddit: string
    youtube: string
  }
}

export default function HomePageClient({
  latestArticles,
  moduleLinkMap,
  locale,
  featuredVideo,
  externalLinks,
}: HomePageClientProps) {
  const t = useMessages() as any
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dragonquestsmashgrow.wiki'

  // Structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Dragon Quest Smash Grow Wiki',
        description:
          'Dragon Quest Smash Grow guide hub with reroll tips, blessing combos, vocation guides, and official mobile download links.',
        image: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: 'Dragon Quest Smash Grow Official Key Visual',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Dragon Quest Smash Grow Wiki',
        alternateName: 'Dragon Quest Smash Grow',
        url: siteUrl,
        description:
          'Unofficial fan hub for Dragon Quest Smash Grow news, guides, and official platform links.',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: 'Dragon Quest Smash Grow Wiki Hero Image',
        },
        sameAs: [
          externalLinks.officialSite,
          externalLinks.appStore,
          externalLinks.googlePlay,
          externalLinks.discord,
          externalLinks.x,
          externalLinks.reddit,
          externalLinks.youtube,
        ],
      },
      {
        '@type': 'VideoGame',
        name: 'Dragon Quest Smash Grow',
        gamePlatform: ['iOS', 'Android'],
        applicationCategory: 'Game',
        genre: ['Roguelite', 'RPG', 'Action'],
        numberOfPlayers: {
          minValue: 1,
          maxValue: 4,
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: externalLinks.officialSite,
        },
      },
    ],
  }

  const formatColumnLabel = (column: string) =>
    column
      .replace(/_/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b\w/g, (char) => char.toUpperCase())

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal-visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 左侧广告容器 - Fixed 定位 */}
      <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ left: 'calc((100vw - 896px) / 2 - 180px)' }}
      >
        <SidebarAd type="sidebar-160x300" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300} />
      </aside>

      {/* 右侧广告容器 - Fixed 定位 */}
      <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ right: 'calc((100vw - 896px) / 2 - 180px)' }}
      >
        <SidebarAd type="sidebar-160x600" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600} />
      </aside>

      {/* 广告位 1: 移动端横幅 Sticky */}
      {/* <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div> */}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border border-[hsl(var(--nav-theme)/0.3)] mb-6">
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{t.hero.badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href={externalLinks.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-lg transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </a>
              <a
                href={externalLinks.googlePlay}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-lg transition-colors"
              >
                {t.hero.playOnSteamCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* 广告位 2: 原生横幅 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ''} />

      {/* Video Section */}
      <section className="px-4 py-12">
        <div className="scroll-reveal container mx-auto max-w-4xl">
          <div className="relative rounded-2xl overflow-hidden">
            <VideoFeature
              videoId={featuredVideo.id}
              title={featuredVideo.title}
              posterImage="/images/hero.webp"
            />
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <LatestGuidesAccordion articles={latestArticles} locale={locale} max={30} />

      {/* 广告位 3: 标准横幅 728×90 */}
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} />

      {/* Tools Grid - 16 Navigation Cards */}
      <section className="px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.tools.title}{' '}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {t.tools.cards.map((card: any, index: number) => {
              // 映射卡片索引到 section ID
              const sectionIds = [
                'reroll-guide', 'beginner-guide', 'best-weapons', 'best-classes',
                'retry-gacha', 'gacha-guide', 'best-party', 'release-date',
                'codes', 'story-walkthrough', 'best-memory', 'adventure-skills',
                'gems-farming', 'daily-checklist', 'leveling-guide', 'co-op-guide'
              ]
              const sectionId = sectionIds[index]

              return (
                <a
                  key={index}
                  href={`#${sectionId}`}
                  onClick={(event) => {
                    event.preventDefault()
                    scrollToSection(sectionId)
                  }}
                  className="scroll-reveal group p-6 rounded-xl border border-border
                             bg-card hover:border-[hsl(var(--nav-theme)/0.5)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-12 h-12 rounded-lg mb-4
                                  bg-[hsl(var(--nav-theme)/0.1)]
                                  flex items-center justify-center
                                  group-hover:bg-[hsl(var(--nav-theme)/0.2)]
                                  transition-colors">
                    <DynamicIcon
                      name={card.icon}
                      className="w-6 h-6 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <h3 className="font-semibold mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* 广告位 4: 方形广告 300×250 */}
      <AdBanner type="banner-300x250" adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250} />

      {/* Module 1: Reroll Guide */}
      <section id="reroll-guide" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['lucidBlocksBeginnerGuide']} locale={locale}>
                {t.modules.lucidBlocksBeginnerGuide.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.lucidBlocksBeginnerGuide.intro}
            </p>
          </div>

          {/* Steps */}
          <div className="scroll-reveal space-y-4 mb-10">
            {t.modules.lucidBlocksBeginnerGuide.steps.map((step: any, index: number) => (
              <div key={index} className="flex gap-4 p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[hsl(var(--nav-theme)/0.2)] border-2 border-[hsl(var(--nav-theme)/0.5)] flex items-center justify-center">
                  <span className="text-xl font-bold text-[hsl(var(--nav-theme-light))]">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    <LinkedTitle linkData={moduleLinkMap[`lucidBlocksBeginnerGuide::steps::${index}`]} locale={locale}>
                      {step.title}
                    </LinkedTitle>
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Tips */}
          <div className="scroll-reveal p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold text-lg">Quick Tips</h3>
            </div>
            <ul className="space-y-2">
              {t.modules.lucidBlocksBeginnerGuide.quickTips.map((tip: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 广告位 5: 中型横幅 468×60 */}
      <AdBanner type="banner-468x60" adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60} />

      {/* Module 2: Beginner Guide */}
      <section id="beginner-guide" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4"><LinkedTitle linkData={moduleLinkMap['lucidBlocksApotheosisCrafting']} locale={locale}>{t.modules.lucidBlocksApotheosisCrafting.title}</LinkedTitle></h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.lucidBlocksApotheosisCrafting.intro}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {t.modules.lucidBlocksApotheosisCrafting.cards.map((card: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <h3 className="font-bold text-lg mb-2 text-[hsl(var(--nav-theme-light))]">
                  <LinkedTitle linkData={moduleLinkMap[`lucidBlocksApotheosisCrafting::cards::${index}`]} locale={locale}>
                    {card.name}
                  </LinkedTitle>
                </h3>
                <p className="text-muted-foreground text-sm">{card.description}</p>
              </div>
            ))}
          </div>
          <div className="scroll-reveal flex flex-wrap gap-3 justify-center">
            {t.modules.lucidBlocksApotheosisCrafting.milestones.map((m: string, i: number) => (
              <span key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm">
                <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />{m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Module 3: Best Weapons */}
      <section id="best-weapons" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4"><LinkedTitle linkData={moduleLinkMap['lucidBlocksToolsAndWeapons']} locale={locale}>{t.modules.lucidBlocksToolsAndWeapons.title}</LinkedTitle></h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.lucidBlocksToolsAndWeapons.intro}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.lucidBlocksToolsAndWeapons.items.map((item: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <Hammer className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">{item.type}</span>
                </div>
                <h3 className="font-bold mb-2">
                  <LinkedTitle linkData={moduleLinkMap[`lucidBlocksToolsAndWeapons::items::${index}`]} locale={locale}>
                    {item.name}
                  </LinkedTitle>
                </h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 4: Best Classes */}
      <section id="best-classes" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4"><LinkedTitle linkData={moduleLinkMap['lucidBlocksStorageAndInventory']} locale={locale}>{t.modules.lucidBlocksStorageAndInventory.title}</LinkedTitle></h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.lucidBlocksStorageAndInventory.intro}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {t.modules.lucidBlocksStorageAndInventory.solutions.map((s: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-bold">
                    <LinkedTitle linkData={moduleLinkMap[`lucidBlocksStorageAndInventory::solutions::${index}`]} locale={locale}>
                      {s.name}
                    </LinkedTitle>
                  </h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">{s.role}</span>
                </div>
                <p className="text-muted-foreground text-sm">{s.description}</p>
              </div>
            ))}
          </div>
          <div className="scroll-reveal p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold">Management Tips</h3>
            </div>
            <ul className="space-y-2">
              {t.modules.lucidBlocksStorageAndInventory.managementTips.map((tip: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Module 5: Retry Gacha */}
      <section id="retry-gacha" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))] mb-4">
              {t.modules.lucidBlocksQualiaAndBaseBuilding.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['lucidBlocksQualiaAndBaseBuilding']} locale={locale}>
                {t.modules.lucidBlocksQualiaAndBaseBuilding.title}
              </LinkedTitle>
            </h2>
            <p className="text-lg max-w-3xl mx-auto mb-4 text-foreground/90">
              {t.modules.lucidBlocksQualiaAndBaseBuilding.subtitle}
            </p>
            <p className="text-muted-foreground text-base md:text-lg max-w-4xl mx-auto">
              {t.modules.lucidBlocksQualiaAndBaseBuilding.intro}
            </p>
          </div>

          <div className="scroll-reveal hidden md:block mb-8 overflow-x-auto rounded-xl border border-border bg-card/60 backdrop-blur-sm">
            <table className="w-full min-w-[760px] text-left">
              <thead className="bg-[hsl(var(--nav-theme)/0.1)]">
                <tr>
                  <th className="px-4 py-3 text-sm font-semibold">Pick</th>
                  <th className="px-4 py-3 text-sm font-semibold">Category</th>
                  <th className="px-4 py-3 text-sm font-semibold">Verdict</th>
                  <th className="px-4 py-3 text-sm font-semibold">Details</th>
                </tr>
              </thead>
              <tbody>
                {t.modules.lucidBlocksQualiaAndBaseBuilding.items.map((item: any, index: number) => (
                  <tr key={index} className="border-t border-border hover:bg-white/5 transition-colors">
                    <td className="px-4 py-4 font-semibold text-[hsl(var(--nav-theme-light))] align-top">
                      <LinkedTitle
                        linkData={moduleLinkMap[`lucidBlocksQualiaAndBaseBuilding::items::${index}`]}
                        locale={locale}
                      >
                        {item.entry}
                      </LinkedTitle>
                    </td>
                    <td className="px-4 py-4 text-sm align-top">{item.category}</td>
                    <td className="px-4 py-4 text-sm align-top">
                      <span className="inline-flex px-2 py-1 rounded-full border bg-[hsl(var(--nav-theme)/0.12)] border-[hsl(var(--nav-theme)/0.35)]">
                        {item.verdict}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">{item.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="scroll-reveal md:hidden space-y-4">
            {t.modules.lucidBlocksQualiaAndBaseBuilding.items.map((item: any, index: number) => {
              const mobileIcons = [Home, Hammer, Sparkles, Check, Clock, Package]
              const MobileIcon = mobileIcons[index % mobileIcons.length]
              return (
                <div
                  key={index}
                  className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[hsl(var(--nav-theme)/0.12)] border border-[hsl(var(--nav-theme)/0.3)] flex items-center justify-center flex-shrink-0">
                      <MobileIcon className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        <LinkedTitle
                          linkData={moduleLinkMap[`lucidBlocksQualiaAndBaseBuilding::items::${index}`]}
                          locale={locale}
                        >
                          {item.entry}
                        </LinkedTitle>
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">{item.category}</p>
                    </div>
                  </div>
                  <p className="text-xs mb-2 text-[hsl(var(--nav-theme-light))]">{item.verdict}</p>
                  <p className="text-sm text-muted-foreground">{item.details}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Module 6: Gacha Guide */}
      <section id="gacha-guide" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))] mb-4">
              {t.modules.lucidBlocksWorldRegions.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['lucidBlocksWorldRegions']} locale={locale}>
                {t.modules.lucidBlocksWorldRegions.title}
              </LinkedTitle>
            </h2>
            <p className="text-lg max-w-3xl mx-auto mb-4 text-foreground/90">{t.modules.lucidBlocksWorldRegions.subtitle}</p>
            <p className="text-muted-foreground text-base md:text-lg max-w-4xl mx-auto">{t.modules.lucidBlocksWorldRegions.intro}</p>
          </div>

          <div className="scroll-reveal hidden md:block overflow-x-auto rounded-xl border border-border bg-card/60 backdrop-blur-sm">
            <table className="w-full min-w-[980px] text-left">
              <thead className="bg-[hsl(var(--nav-theme)/0.1)]">
                <tr>
                  <th className="px-4 py-3 text-sm font-semibold">Banner</th>
                  <th className="px-4 py-3 text-sm font-semibold">Priority</th>
                  <th className="px-4 py-3 text-sm font-semibold">Best For</th>
                  <th className="px-4 py-3 text-sm font-semibold">Details</th>
                  <th className="px-4 py-3 text-sm font-semibold">Pull Rule</th>
                </tr>
              </thead>
              <tbody>
                {t.modules.lucidBlocksWorldRegions.items.map((item: any, index: number) => (
                  <tr key={index} className="border-t border-border hover:bg-white/5 transition-colors">
                    <td className="px-4 py-4 font-semibold text-[hsl(var(--nav-theme-light))] align-top">
                      <LinkedTitle linkData={moduleLinkMap[`lucidBlocksWorldRegions::items::${index}`]} locale={locale}>
                        {item.entry}
                      </LinkedTitle>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <span className="inline-flex px-2 py-1 rounded-full border bg-[hsl(var(--nav-theme)/0.12)] border-[hsl(var(--nav-theme)/0.35)] text-xs font-semibold">
                        {item.priority}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm align-top">{item.bestFor}</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">{item.details}</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">{item.pullRule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="scroll-reveal md:hidden space-y-4">
            {t.modules.lucidBlocksWorldRegions.items.map((item: any, index: number) => {
              const mobileIcons = [TrendingUp, Star, Gamepad2, Settings, ClipboardCheck, ArrowRight]
              const MobileIcon = mobileIcons[index % mobileIcons.length]
              return (
                <div
                  key={index}
                  className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[hsl(var(--nav-theme)/0.12)] border border-[hsl(var(--nav-theme)/0.3)] flex items-center justify-center flex-shrink-0">
                        <MobileIcon className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          <LinkedTitle linkData={moduleLinkMap[`lucidBlocksWorldRegions::items::${index}`]} locale={locale}>
                            {item.entry}
                          </LinkedTitle>
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">{item.bestFor}</p>
                      </div>
                    </div>
                    <span className="inline-flex px-2 py-1 rounded-full border bg-[hsl(var(--nav-theme)/0.12)] border-[hsl(var(--nav-theme)/0.35)] text-xs font-semibold flex-shrink-0">
                      {item.priority}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{item.details}</p>
                  <p className="text-xs text-[hsl(var(--nav-theme-light))]">{item.pullRule}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Module 7: Best Party */}
      <section id="best-party" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))] mb-4">
              {t.modules.lucidBlocksCreaturesAndEnemies.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['lucidBlocksCreaturesAndEnemies']} locale={locale}>
                {t.modules.lucidBlocksCreaturesAndEnemies.title}
              </LinkedTitle>
            </h2>
            <p className="text-lg max-w-3xl mx-auto mb-4 text-foreground/90">{t.modules.lucidBlocksCreaturesAndEnemies.subtitle}</p>
            <p className="text-muted-foreground text-base md:text-lg max-w-4xl mx-auto">{t.modules.lucidBlocksCreaturesAndEnemies.intro}</p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 lg:grid-cols-3 gap-4">
            {t.modules.lucidBlocksCreaturesAndEnemies.items.map((item: any, index: number) => {
              const partyIcons = [BookOpen, Star, Hammer]
              const PartyIcon = partyIcons[index % partyIcons.length]
              return (
                <div
                  key={index}
                  className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <PartyIcon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                      <h3 className="font-bold">
                        <LinkedTitle
                          linkData={moduleLinkMap[`lucidBlocksCreaturesAndEnemies::items::${index}`]}
                          locale={locale}
                        >
                          {item.title}
                        </LinkedTitle>
                      </h3>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full border bg-[hsl(var(--nav-theme)/0.12)] border-[hsl(var(--nav-theme)/0.35)]">
                      {item.tag}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{item.bestFor}</p>

                  <div className="space-y-2 mb-4">
                    {item.party.map((line: string, lineIndex: number) => (
                      <p key={lineIndex} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 mt-0.5 text-[hsl(var(--nav-theme-light))] flex-shrink-0" />
                        <span>{line}</span>
                      </p>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border/60">
                    <p className="text-xs uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))] mb-2">Notes</p>
                    <ul className="space-y-2">
                      {item.notes.map((note: string, noteIndex: number) => (
                        <li key={noteIndex} className="text-xs text-muted-foreground">{note}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Module 8: Release Date */}
      <section id="release-date" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))] mb-4">
              {t.modules.lucidBlocksMobilityGear.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['lucidBlocksMobilityGear']} locale={locale}>
                {t.modules.lucidBlocksMobilityGear.title}
              </LinkedTitle>
            </h2>
            <p className="text-lg max-w-3xl mx-auto mb-4 text-foreground/90">{t.modules.lucidBlocksMobilityGear.subtitle}</p>
            <p className="text-muted-foreground text-base md:text-lg max-w-4xl mx-auto">{t.modules.lucidBlocksMobilityGear.intro}</p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.lucidBlocksMobilityGear.items.map((item: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">{item.date}</span>
                  <span className="text-xs px-2 py-1 rounded-full border bg-[hsl(var(--nav-theme)/0.12)] border-[hsl(var(--nav-theme)/0.35)]">{item.label}</span>
                </div>
                <div className="flex items-start gap-3">
                  {index % 6 === 0 && <Clock className="w-5 h-5 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />}
                  {index % 6 === 1 && <BookOpen className="w-5 h-5 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />}
                  {index % 6 === 2 && <ArrowRight className="w-5 h-5 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />}
                  {index % 6 === 3 && <Sparkles className="w-5 h-5 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />}
                  {index % 6 === 4 && <TrendingUp className="w-5 h-5 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />}
                  {index % 6 === 5 && <Package className="w-5 h-5 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />}
                  <div>
                    <h3 className="font-bold mb-2">
                      <LinkedTitle linkData={moduleLinkMap[`lucidBlocksMobilityGear::items::${index}`]} locale={locale}>
                        {item.title}
                      </LinkedTitle>
                    </h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 6: 移动端横幅 320×50 */}
      <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />

      {/* Module 9: Codes */}
      <section id="codes" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))] mb-4">
              {t.modules.lucidBlocksFarmingAndGrowth.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['lucidBlocksFarmingAndGrowth']} locale={locale}>
                {t.modules.lucidBlocksFarmingAndGrowth.title}
              </LinkedTitle>
            </h2>
            <p className="text-lg max-w-3xl mx-auto mb-4 text-foreground/90">
              {t.modules.lucidBlocksFarmingAndGrowth.subtitle}
            </p>
            <p className="text-muted-foreground text-base md:text-lg max-w-4xl mx-auto">
              {t.modules.lucidBlocksFarmingAndGrowth.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.lucidBlocksFarmingAndGrowth.items.map((item: any, index: number) => {
              const codeIcons = [TrendingUp, Clock, BookOpen, MessageCircle, Sparkles, ArrowRight]
              const CodeIcon = codeIcons[index]
              const statusStyleMap: Record<string, string> = {
                active: 'bg-[hsl(var(--nav-theme)/0.18)] border-[hsl(var(--nav-theme)/0.42)]',
                expired: 'bg-[hsl(var(--nav-theme)/0.08)] border-[hsl(var(--nav-theme)/0.28)]',
                guide: 'bg-[hsl(var(--nav-theme)/0.14)] border-[hsl(var(--nav-theme)/0.35)]',
                channel: 'bg-[hsl(var(--nav-theme)/0.12)] border-[hsl(var(--nav-theme)/0.32)]',
              }
              return (
                <div
                  key={index}
                  className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <CodeIcon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                      <h3 className="font-bold">
                        <LinkedTitle
                          linkData={moduleLinkMap[`lucidBlocksFarmingAndGrowth::items::${index}`]}
                          locale={locale}
                        >
                          {item.title}
                        </LinkedTitle>
                      </h3>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full border ${statusStyleMap[item.status] || statusStyleMap.channel}`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[hsl(var(--nav-theme-light))] mb-2">{item.value}</p>
                  <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                  {item.href && (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-[hsl(var(--nav-theme-light))] hover:underline"
                    >
                      Open official channel <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Module 10: Story Walkthrough */}
      <section id="story-walkthrough" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))] mb-4">
              {t.modules.lucidBlocksBestEarlyUnlocks.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['lucidBlocksBestEarlyUnlocks']} locale={locale}>
                {t.modules.lucidBlocksBestEarlyUnlocks.title}
              </LinkedTitle>
            </h2>
            <p className="text-lg max-w-3xl mx-auto mb-4 text-foreground/90">
              {t.modules.lucidBlocksBestEarlyUnlocks.subtitle}
            </p>
            <p className="text-muted-foreground text-base md:text-lg max-w-4xl mx-auto">
              {t.modules.lucidBlocksBestEarlyUnlocks.intro}
            </p>
          </div>

          <div className="scroll-reveal space-y-6">
            {t.modules.lucidBlocksBestEarlyUnlocks.sections.map((storySection: any, index: number) => {
              const sectionIcons = [BookOpen, Star, Check, ArrowRight]
              const SectionIcon = sectionIcons[index]
              const columns =
                Array.isArray(storySection.rows) && storySection.rows.length > 0
                  ? Object.keys(storySection.rows[0])
                  : []

              return (
                <div key={index} className="p-6 bg-white/5 border border-border rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <SectionIcon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                    <h3 className="font-bold text-xl">
                      <LinkedTitle
                        linkData={moduleLinkMap[`lucidBlocksBestEarlyUnlocks::sections::${index}`]}
                        locale={locale}
                      >
                        {storySection.section}
                      </LinkedTitle>
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm md:text-base mb-4">{storySection.summary}</p>

                  {columns.length > 0 && (
                    <>
                      <div className="hidden md:block overflow-x-auto rounded-lg border border-border/70 mb-4">
                        <table className="w-full min-w-[640px] text-left">
                          <thead className="bg-[hsl(var(--nav-theme)/0.1)]">
                            <tr>
                              {columns.map((column) => (
                                <th key={column} className="px-3 py-2 text-xs md:text-sm font-semibold">
                                  {formatColumnLabel(column)}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {storySection.rows.map((row: any, rowIndex: number) => (
                              <tr key={rowIndex} className="border-t border-border/60">
                                {columns.map((column) => (
                                  <td key={column} className="px-3 py-2 text-xs md:text-sm text-muted-foreground align-top">
                                    {row[column]}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="md:hidden space-y-2 mb-4">
                        {storySection.rows.map((row: any, rowIndex: number) => (
                          <div key={rowIndex} className="rounded-lg border border-border/70 p-3 bg-white/5">
                            {columns.map((column) => (
                              <p key={column} className="text-xs mb-1">
                                <span className="font-semibold">{formatColumnLabel(column)}: </span>
                                <span className="text-muted-foreground">{row[column]}</span>
                              </p>
                            ))}
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  <div className="pt-4 border-t border-border/60">
                    <p className="text-xs uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))] mb-2">Notes</p>
                    <ul className="space-y-2">
                      {storySection.notes.map((note: string, noteIndex: number) => (
                        <li key={noteIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 mt-0.5 text-[hsl(var(--nav-theme-light))] flex-shrink-0" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Module 11: Best Memory */}
      <section id="best-memory" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))] mb-4">
              {t.modules.lucidBlocksAchievementTracker.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['lucidBlocksAchievementTracker']} locale={locale}>
                {t.modules.lucidBlocksAchievementTracker.title}
              </LinkedTitle>
            </h2>
            <p className="text-lg max-w-3xl mx-auto mb-4 text-foreground/90">
              {t.modules.lucidBlocksAchievementTracker.subtitle}
            </p>
            <p className="text-muted-foreground text-base md:text-lg max-w-4xl mx-auto">
              {t.modules.lucidBlocksAchievementTracker.intro}
            </p>
          </div>

          <div className="scroll-reveal space-y-6">
            {t.modules.lucidBlocksAchievementTracker.tiers.map((tierBlock: any, tierIndex: number) => (
              <div key={tierIndex} className="p-6 bg-white/5 border border-border rounded-xl">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <ClipboardCheck className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                    <h3 className="font-bold text-lg">
                      <LinkedTitle
                        linkData={moduleLinkMap[`lucidBlocksAchievementTracker::tiers::${tierIndex}`]}
                        locale={locale}
                      >
                        {tierBlock.tier} Tier
                      </LinkedTitle>
                    </h3>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full border bg-[hsl(var(--nav-theme)/0.12)] border-[hsl(var(--nav-theme)/0.35)]">
                    {tierBlock.entries.length} Entries
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{tierBlock.summary}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tierBlock.entries.map((entry: any, entryIndex: number) => {
                    const memoryIcons = [Sparkles, Star, Hammer, Package, TrendingUp, BookOpen]
                    const MemoryIcon = memoryIcons[entryIndex]
                    return (
                      <div key={entryIndex} className="p-4 bg-white/5 border border-border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <MemoryIcon className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                          <p className="font-semibold text-sm text-[hsl(var(--nav-theme-light))]">{entry.name}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">{entry.summary}</p>
                        <p className="text-xs mb-1">
                          <span className="font-semibold">Best for: </span>
                          <span className="text-muted-foreground">{entry.best_for}</span>
                        </p>
                        <p className="text-xs mb-1">
                          <span className="font-semibold">Slot tip: </span>
                          <span className="text-muted-foreground">{entry.slot_tip}</span>
                        </p>
                        {entry.where_to_get && (
                          <p className="text-xs">
                            <span className="font-semibold">Where to get: </span>
                            <span className="text-muted-foreground">{entry.where_to_get}</span>
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 12: Adventure Skills */}
      <section id="adventure-skills" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))] mb-4">
              {t.modules.lucidBlocksSingleplayerAndPlatformFAQ.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['lucidBlocksSingleplayerAndPlatformFAQ']} locale={locale}>
                {t.modules.lucidBlocksSingleplayerAndPlatformFAQ.title}
              </LinkedTitle>
            </h2>
            <p className="text-lg max-w-3xl mx-auto mb-4 text-foreground/90">
              {t.modules.lucidBlocksSingleplayerAndPlatformFAQ.subtitle}
            </p>
            <p className="text-muted-foreground text-base md:text-lg max-w-4xl mx-auto">
              {t.modules.lucidBlocksSingleplayerAndPlatformFAQ.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.lucidBlocksSingleplayerAndPlatformFAQ.items.map((build: any, index: number) => {
              const buildIcons = [MessageCircle, Hammer, Star, Sparkles, Gamepad2]
              const BuildIcon = buildIcons[index]
              return (
                <div
                  key={index}
                  className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[hsl(var(--nav-theme)/0.12)] border border-[hsl(var(--nav-theme)/0.3)] flex items-center justify-center flex-shrink-0">
                      <BuildIcon className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">
                        <LinkedTitle
                          linkData={moduleLinkMap[`lucidBlocksSingleplayerAndPlatformFAQ::items::${index}`]}
                          locale={locale}
                        >
                          {build.name}
                        </LinkedTitle>
                      </h3>
                      <p className="text-sm text-muted-foreground">{build.summary}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))] mb-2">Core Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {build.core_skills.map((skill: string, skillIndex: number) => (
                        <span
                          key={skillIndex}
                          className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.12)] border border-[hsl(var(--nav-theme)/0.32)]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))] mb-2">Best With</p>
                    <div className="flex flex-wrap gap-2">
                      {build.best_with.map((weapon: string, weaponIndex: number) => (
                        <span key={weaponIndex} className="text-xs px-2 py-1 rounded-full border border-border/80 bg-white/5">
                          {weapon}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/60">
                    <p className="text-xs uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))] mb-1">When to Pick</p>
                    <p className="text-sm text-muted-foreground">{build.when_to_pick}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Module 13: Gems Farming */}
      <section id="gems-farming" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))] mb-4">
              {t.modules.lucidBlocksSteamDeckAndController.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['lucidBlocksSteamDeckAndController']} locale={locale}>
                {t.modules.lucidBlocksSteamDeckAndController.title}
              </LinkedTitle>
            </h2>
            <p className="text-lg max-w-3xl mx-auto mb-4 text-foreground/90">
              {t.modules.lucidBlocksSteamDeckAndController.subtitle}
            </p>
            <p className="text-muted-foreground text-base md:text-lg max-w-4xl mx-auto">
              {t.modules.lucidBlocksSteamDeckAndController.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.lucidBlocksSteamDeckAndController.items.map((item: any, index: number) => {
              const routeIcons = [TrendingUp, Sparkles, ClipboardCheck, Star, BookOpen, ArrowRight]
              const RouteIcon = routeIcons[index] || Check
              return (
                <div
                  key={index}
                  className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[hsl(var(--nav-theme)/0.14)] border border-[hsl(var(--nav-theme)/0.35)] flex items-center justify-center flex-shrink-0">
                      <RouteIcon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-[hsl(var(--nav-theme-light))] mb-1">
                        Step {item.step}
                      </p>
                      <h3 className="font-bold mb-1">
                        <LinkedTitle
                          linkData={moduleLinkMap[`lucidBlocksSteamDeckAndController::items::${index}`]}
                          locale={locale}
                        >
                          {item.title}
                        </LinkedTitle>
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.highlights.map((highlight: string, highlightIndex: number) => (
                      <span
                        key={highlightIndex}
                        className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.12)] border border-[hsl(var(--nav-theme)/0.3)]"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Module 14: Daily Checklist */}
      <section id="daily-checklist" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))] mb-4">
              {t.modules.lucidBlocksSettingsAndAccessibility.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['lucidBlocksSettingsAndAccessibility']} locale={locale}>
                {t.modules.lucidBlocksSettingsAndAccessibility.title}
              </LinkedTitle>
            </h2>
            <p className="text-lg max-w-3xl mx-auto mb-4 text-foreground/90">
              {t.modules.lucidBlocksSettingsAndAccessibility.subtitle}
            </p>
            <p className="text-muted-foreground text-base md:text-lg max-w-4xl mx-auto">
              {t.modules.lucidBlocksSettingsAndAccessibility.intro}
            </p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.modules.lucidBlocksSettingsAndAccessibility.items.map((item: any, index: number) => (
              <div
                key={index}
                className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[hsl(var(--nav-theme)/0.14)] border border-[hsl(var(--nav-theme)/0.35)] flex items-center justify-center">
                    <DynamicIcon name={item.icon} className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-bold text-sm mb-2">
                  <LinkedTitle
                    linkData={moduleLinkMap[`lucidBlocksSettingsAndAccessibility::items::${index}`]}
                    locale={locale}
                  >
                    {item.title}
                  </LinkedTitle>
                </h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 15: Leveling Guide */}
      <section id="leveling-guide" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))] mb-4">
              {t.modules.lucidBlocksUpdatesAndPatchNotes.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['lucidBlocksUpdatesAndPatchNotes']} locale={locale}>
                {t.modules.lucidBlocksUpdatesAndPatchNotes.title}
              </LinkedTitle>
            </h2>
            <p className="text-lg max-w-3xl mx-auto mb-4 text-foreground/90">
              {t.modules.lucidBlocksUpdatesAndPatchNotes.subtitle}
            </p>
            <p className="text-muted-foreground text-base md:text-lg max-w-4xl mx-auto">
              {t.modules.lucidBlocksUpdatesAndPatchNotes.intro}
            </p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.lucidBlocksUpdatesAndPatchNotes.items.map((item: any, index: number) => (
              <div
                key={index}
                className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[hsl(var(--nav-theme)/0.14)] border border-[hsl(var(--nav-theme)/0.35)] flex items-center justify-center flex-shrink-0">
                    <DynamicIcon name={item.icon} className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-[hsl(var(--nav-theme-light))] mb-1">
                      Step {item.step}
                    </p>
                    <h3 className="font-bold mb-1">
                      <LinkedTitle
                        linkData={moduleLinkMap[`lucidBlocksUpdatesAndPatchNotes::items::${index}`]}
                        locale={locale}
                      >
                        {item.title}
                      </LinkedTitle>
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.highlights.map((highlight: string, highlightIndex: number) => (
                    <span
                      key={highlightIndex}
                      className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.12)] border border-[hsl(var(--nav-theme)/0.3)]"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 16: Co-Op Guide */}
      <section id="co-op-guide" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))] mb-4">
              {t.modules.lucidBlocksCrashFixAndTroubleshooting.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['lucidBlocksCrashFixAndTroubleshooting']} locale={locale}>
                {t.modules.lucidBlocksCrashFixAndTroubleshooting.title}
              </LinkedTitle>
            </h2>
            <p className="text-lg max-w-3xl mx-auto mb-4 text-foreground/90">
              {t.modules.lucidBlocksCrashFixAndTroubleshooting.subtitle}
            </p>
            <p className="text-muted-foreground text-base md:text-lg max-w-4xl mx-auto">
              {t.modules.lucidBlocksCrashFixAndTroubleshooting.intro}
            </p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {t.modules.lucidBlocksCrashFixAndTroubleshooting.items.map((item: any, index: number) => (
              <div
                key={index}
                className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[hsl(var(--nav-theme)/0.14)] border border-[hsl(var(--nav-theme)/0.35)] flex items-center justify-center">
                    <DynamicIcon name={item.icon} className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-bold text-sm mb-2">
                  <LinkedTitle
                    linkData={moduleLinkMap[`lucidBlocksCrashFixAndTroubleshooting::items::${index}`]}
                    locale={locale}
                  >
                    {item.title}
                  </LinkedTitle>
                </h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="scroll-reveal p-6 bg-[hsl(var(--nav-theme)/0.08)] border border-[hsl(var(--nav-theme)/0.32)] rounded-xl">
            <h3 className="font-bold text-[hsl(var(--nav-theme-light))] mb-2">Official Dragon Quest Smash Grow Co-Op Channels</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Use official channels for room-number recruiting, event announcements, and platform support.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={externalLinks.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Discord
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={externalLinks.officialSite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors"
              >
                Official Site
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={externalLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors"
              >
                Opening Trailer
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
          communityUrl={externalLinks.discord}
          gameUrl={externalLinks.officialSite}
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} />

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">{t.footer.description}</p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href={externalLinks.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href={externalLinks.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href={externalLinks.reddit}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.reddit}
                  </a>
                </li>
                <li>
                  <a
                    href={externalLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.youtube}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">{t.footer.copyright}</p>
              <p className="text-xs text-muted-foreground">{t.footer.disclaimer}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
