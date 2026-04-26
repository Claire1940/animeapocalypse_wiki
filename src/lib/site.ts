import type { Locale } from '@/i18n/routing'

export const GAME_NAME = 'Anime Apocalypse'
export const SITE_NAME = 'Anime Apocalypse Wiki'
export const SITE_DOMAIN = 'animeapocalypse.wiki'
export const DEFAULT_SITE_URL = `https://www.${SITE_DOMAIN}`
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '')
export const HERO_IMAGE_PATH = '/images/hero.webp'
export const HERO_IMAGE_URL = `${SITE_URL}${HERO_IMAGE_PATH}`
export const LOGO_IMAGE_URL = `${SITE_URL}/android-chrome-512x512.png`

export const EXTERNAL_LINKS = {
	robloxGame: 'https://www.roblox.com/games/140409475718339/Anime-Apocalypse',
	robloxGroup: 'https://www.roblox.com/communities/534034976/Anime-Apocalypse-Dev',
	discord: 'https://discord.com/servers/anime-apocalypse-323339406562033675',
	youtube: 'https://www.youtube.com/watch?v=00xfKk5oin8',
}

export const HOME_SEO = {
	title: 'Anime Apocalypse Wiki - Codes, Tier List & Beginner Guide',
	description:
		'Anime Apocalypse Wiki covers latest codes, abilities, gadgets, weapons, bosses, farming routes, tier lists, maps, controls, and beginner tips for Roblox.',
	ogDescription:
		'Anime Apocalypse Wiki covers Roblox codes, abilities, gadgets, bosses, farming routes, maps, tier lists, controls, and beginner tips.',
	twitterDescription:
		'Anime Apocalypse Wiki covers Roblox codes, abilities, gadgets, bosses, tier lists, maps, and beginner tips.',
}

export const FEATURED_VIDEO = {
	videoId: '00xfKk5oin8',
	title: 'Anime Apocalypse Release Gameplay',
	posterImage: HERO_IMAGE_PATH,
}

export type FeaturedVideo = typeof FEATURED_VIDEO

export function getLocalizedUrl(path: string, locale: Locale | string, baseUrl = SITE_URL) {
	const normalizedPath = path === '/' ? '' : path.replace(/\/$/, '')
	return locale === 'en' ? `${baseUrl}${normalizedPath}` : `${baseUrl}/${locale}${normalizedPath}`
}

export function getAbsoluteUrl(pathOrUrl?: string) {
	if (!pathOrUrl) {
		return HERO_IMAGE_URL
	}
	if (/^https?:\/\//i.test(pathOrUrl)) {
		return pathOrUrl
	}
	return `${SITE_URL}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`
}
