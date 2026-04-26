import { MetadataRoute } from 'next'
import { DEFAULT_SITE_URL } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '')

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
