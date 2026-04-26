import type { ContentFrontmatter, ContentType } from '@/lib/content'
import { SITE_URL } from '@/lib/site'

interface ListStructuredDataProps {
	contentType: ContentType
	locale: string
	items: Array<{ slug: string; frontmatter: ContentFrontmatter }>
}

export function ListStructuredData({ contentType, locale, items }: ListStructuredDataProps) {
	const siteUrl = SITE_URL
	const listUrl =
		locale === 'en' ? `${siteUrl}/${contentType}` : `${siteUrl}/${locale}/${contentType}`

	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		url: listUrl,
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			url:
				locale === 'en'
					? `${siteUrl}/${contentType}/${item.slug}`
					: `${siteUrl}/${locale}/${contentType}/${item.slug}`,
			name: item.frontmatter.title,
		})),
	}

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>
	)
}
