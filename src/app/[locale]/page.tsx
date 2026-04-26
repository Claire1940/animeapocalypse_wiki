import { getLatestArticles } from '@/lib/getLatestArticles'
import { buildModuleLinkMap } from '@/lib/buildModuleLinkMap'
import type { Language } from '@/lib/content'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import type { Locale } from '@/i18n/routing'
import {
  EXTERNAL_LINKS,
  FEATURED_VIDEO,
  GAME_NAME,
  HOME_SEO,
  LOGO_IMAGE_URL,
  SITE_NAME,
  SITE_URL,
} from '@/lib/site'
import HomePageClient from './HomePageClient'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const heroImageUrl = new URL('/images/hero.webp', SITE_URL).toString()

  return {
    title: HOME_SEO.title,
    description: HOME_SEO.description,
    openGraph: {
      type: 'website',
      locale,
      url: locale === 'en' ? SITE_URL : `${SITE_URL}/${locale}`,
      siteName: SITE_NAME,
      title: HOME_SEO.title,
      description: HOME_SEO.ogDescription,
      images: [
        {
          url: heroImageUrl,
          width: 1280,
          height: 720,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: HOME_SEO.title,
      description: HOME_SEO.twitterDescription,
      images: [heroImageUrl],
    },
    alternates: buildLanguageAlternates('/', locale as Locale, SITE_URL),
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params

  // 服务器端获取最新文章数据
  const latestArticles = await getLatestArticles(locale as Language, 30)
  const moduleLinkMap = await buildModuleLinkMap(locale as Language)
  const heroImageUrl = new URL('/images/hero.webp', SITE_URL).toString()
  const homeStructuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: HOME_SEO.description,
        image: {
          '@type': 'ImageObject',
          url: heroImageUrl,
          width: 1280,
          height: 720,
          caption: SITE_NAME,
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: GAME_NAME,
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: LOGO_IMAGE_URL,
          width: 512,
          height: 512,
        },
        image: {
          '@type': 'ImageObject',
          url: heroImageUrl,
          width: 1280,
          height: 720,
          caption: SITE_NAME,
        },
        sameAs: [
          EXTERNAL_LINKS.robloxGame,
          EXTERNAL_LINKS.robloxGroup,
          EXTERNAL_LINKS.discord,
          EXTERNAL_LINKS.youtube,
        ],
      },
      {
        '@type': 'VideoGame',
        name: GAME_NAME,
        url: EXTERNAL_LINKS.robloxGame,
        image: heroImageUrl,
        gamePlatform: ['Roblox'],
        applicationCategory: 'Game',
        genre: ['Anime', 'Zombie', 'Wave Survival', 'Roguelike'],
        numberOfPlayers: {
          minValue: 1,
          maxValue: 30,
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: EXTERNAL_LINKS.robloxGame,
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData) }}
      />
      <HomePageClient
        latestArticles={latestArticles}
        moduleLinkMap={moduleLinkMap}
        locale={locale}
        featuredVideo={FEATURED_VIDEO}
      />
    </>
  )
}
