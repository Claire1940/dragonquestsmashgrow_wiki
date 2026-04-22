import { getLatestArticles } from '@/lib/getLatestArticles'
import { buildModuleLinkMap } from '@/lib/buildModuleLinkMap'
import type { Language } from '@/lib/content'
import HomePageClient from './HomePageClient'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params

  // 服务器端获取最新文章数据
  const latestArticles = await getLatestArticles(locale as Language, 30)
  const moduleLinkMap = await buildModuleLinkMap(locale as Language)

  const featuredVideo = {
    id: 'NZhM8l8B8sY',
    title: 'DRAGON QUEST Smash/Grow | Opening Trailer',
  }

  const externalLinks = {
    officialSite: 'https://smashgrow.dragonquest.com/en/',
    appStore: 'https://apps.apple.com/us/app/dragon-quest-smash-grow/id6747737418',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.square_enix.android_googleplay.dqsgw',
    discord: 'https://discord.gg/MmxDbG42cP',
    x: 'https://x.com/DQSG_EN',
    reddit: 'https://www.reddit.com/r/dragonquest/',
    youtube: 'https://www.youtube.com/watch?v=NZhM8l8B8sY',
  }

  return (
    <HomePageClient
      latestArticles={latestArticles}
      moduleLinkMap={moduleLinkMap}
      locale={locale}
      featuredVideo={featuredVideo}
      externalLinks={externalLinks}
    />
  )
}
