'use client'

import { useEffect, useState, Suspense, lazy } from 'react'
import {
  ArrowRight,
  BookOpen,
  Check,
  ClipboardCheck,
  Copy,
  ExternalLink,
  Gamepad2,
  Gift,
  MessageCircle,
  RotateCcw,
  Sparkles,
  Star,
  Swords,
  Target,
  Ticket,
  Trophy,
  Zap,
} from 'lucide-react'
import { useMessages } from 'next-intl'
import { VideoFeature } from '@/components/home/VideoFeature'
import { LatestGuidesAccordion } from '@/components/home/LatestGuidesAccordion'
import { NativeBannerAd, AdBanner } from '@/components/ads'
import { SidebarAd } from '@/components/ads/SidebarAd'
import { scrollToSection } from '@/lib/scrollToSection'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import type { ContentItemWithType } from '@/lib/getLatestArticles'
import { EXTERNAL_LINKS, type FeaturedVideo } from '@/lib/site'

const HeroStats = lazy(() => import('@/components/home/HeroStats'))
const FAQSection = lazy(() => import('@/components/home/FAQSection'))
const CTASection = lazy(() => import('@/components/home/CTASection'))

const LoadingPlaceholder = ({ height = 'h-64' }: { height?: string }) => (
  <div className={`${height} bg-muted/40 border border-border rounded-xl animate-pulse`} />
)

interface HomePageClientProps {
  latestArticles: ContentItemWithType[]
  locale: string
  featuredVideo: FeaturedVideo
}

export default function HomePageClient({ latestArticles, locale, featuredVideo }: HomePageClientProps) {
  const t = useMessages() as any
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyCode = async (code: string) => {
    await navigator.clipboard.writeText(code)
    setCopiedCode(code)
    window.setTimeout(() => setCopiedCode(null), 1600)
  }

  const toolCards = t.tools.cards
  const codeModule = t.modules.animeApocalypseCodes
  const activeCodes = codeModule.items.filter((code: any) => code.status === 'Active')
  const expiredCodes = codeModule.items.filter((code: any) => code.status === 'Expired')
  const beginnerModule = t.modules.animeApocalypseBeginnerGuide
  const tierModule = t.modules.animeApocalypseAbilityTierList
  const abilitiesModule = t.modules.animeApocalypseAbilitiesGuide
  const abilitySystemItems = abilitiesModule.items.filter((item: any) => item.type === 'system')
  const abilityRosterItems = abilitiesModule.items.filter((item: any) => item.type === 'ability')

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
      <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ left: 'calc((100vw - 896px) / 2 - 180px)' }}
      >
        <SidebarAd type="sidebar-160x300" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300} />
      </aside>

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-6">
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{t.hero.badge}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t.hero.title}
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href={EXTERNAL_LINKS.robloxGame}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)] text-primary-foreground rounded-lg font-semibold text-lg transition-colors"
              >
                <Gamepad2 className="w-5 h-5" />
                {t.hero.playOnRobloxCTA || t.hero.playOnSteamCTA}
              </a>
              <a
                href={EXTERNAL_LINKS.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border hover:bg-muted/60 rounded-lg font-semibold text-lg transition-colors"
              >
                {t.hero.getFreeCodesCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

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
              videoId={featuredVideo.videoId}
              title={featuredVideo.title}
              posterImage={featuredVideo.posterImage}
            />
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <LatestGuidesAccordion articles={latestArticles} locale={locale} max={30} />

      {/* 广告位 3: 标准横幅 728×90 */}
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} />

      {/* Tools Grid - 4 Navigation Cards */}
      <section className="px-4 py-20 bg-muted/20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.tools.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="#anime-apocalypse-codes"
              onClick={(event) => {
                event.preventDefault()
                scrollToSection('anime-apocalypse-codes')
              }}
              className="scroll-reveal group p-6 rounded-xl border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
            >
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={toolCards[0].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{toolCards[0].title}</h3>
              <p className="text-sm text-muted-foreground">{toolCards[0].description}</p>
            </a>

            <a
              href="#anime-apocalypse-beginner-guide"
              onClick={(event) => {
                event.preventDefault()
                scrollToSection('anime-apocalypse-beginner-guide')
              }}
              className="scroll-reveal group p-6 rounded-xl border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
            >
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={toolCards[1].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{toolCards[1].title}</h3>
              <p className="text-sm text-muted-foreground">{toolCards[1].description}</p>
            </a>

            <a
              href="#anime-apocalypse-ability-tier-list"
              onClick={(event) => {
                event.preventDefault()
                scrollToSection('anime-apocalypse-ability-tier-list')
              }}
              className="scroll-reveal group p-6 rounded-xl border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
            >
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={toolCards[2].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{toolCards[2].title}</h3>
              <p className="text-sm text-muted-foreground">{toolCards[2].description}</p>
            </a>

            <a
              href="#anime-apocalypse-abilities-guide"
              onClick={(event) => {
                event.preventDefault()
                scrollToSection('anime-apocalypse-abilities-guide')
              }}
              className="scroll-reveal group p-6 rounded-xl border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
            >
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={toolCards[3].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{toolCards[3].title}</h3>
              <p className="text-sm text-muted-foreground">{toolCards[3].description}</p>
            </a>
          </div>
        </div>
      </section>

      {/* 广告位 4: 方形广告 300×250 */}
      <AdBanner type="banner-300x250" adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250} />

      {/* Module 1: Anime Apocalypse Codes */}
      <section id="anime-apocalypse-codes" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm mb-4">
              <Gift className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              {codeModule.eyebrow}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{codeModule.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-4">{codeModule.subtitle}</p>
            <p className="text-muted-foreground max-w-4xl mx-auto">{codeModule.intro}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            <div className="space-y-8">
              <div className="scroll-reveal">
                <div className="flex items-center gap-3 mb-4">
                  <ClipboardCheck className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
                  <h3 className="text-2xl font-bold">{codeModule.activeTitle}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeCodes.map((code: any) => (
                    <div key={code.code} className="p-5 rounded-xl border border-[hsl(var(--nav-theme)/0.35)] bg-[hsl(var(--nav-theme)/0.06)]">
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div>
                          <span className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.12)] border border-[hsl(var(--nav-theme)/0.35)] text-xs text-[hsl(var(--nav-theme-light))]">
                            <Check className="w-3 h-3" />
                            {code.status}
                          </span>
                          <p className="mt-3 font-mono text-lg font-bold tracking-normal">{code.code}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => void copyCode(code.code)}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:border-[hsl(var(--nav-theme)/0.5)] hover:bg-muted/50 transition-colors text-sm"
                        >
                          {copiedCode === code.code ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          {copiedCode === code.code ? codeModule.copiedLabel : codeModule.copyLabel}
                        </button>
                      </div>
                      <p className="font-semibold mb-3">{code.rewardSummary}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {code.rewards.map((reward: string) => (
                          <span key={reward} className="px-2 py-1 rounded-md bg-card border border-border text-xs text-muted-foreground">
                            {reward}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{code.bestUse}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="scroll-reveal">
                <div className="flex items-center gap-3 mb-4">
                  <RotateCcw className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
                  <h3 className="text-2xl font-bold">{codeModule.expiredTitle}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {expiredCodes.map((code: any) => (
                    <div key={code.code} className="p-5 rounded-xl border border-border bg-card">
                      <span className="inline-flex px-2 py-1 rounded-full bg-muted/50 border border-border text-xs text-muted-foreground">
                        {code.status}
                      </span>
                      <p className="mt-3 font-mono font-bold tracking-normal">{code.code}</p>
                      <p className="text-sm text-muted-foreground mt-2">{code.rewardSummary}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="scroll-reveal p-6 rounded-xl border border-border bg-card h-fit">
              <div className="flex items-center gap-3 mb-4">
                <Ticket className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
                <h3 className="font-bold text-lg">{codeModule.redeemTitle}</h3>
              </div>
              <ol className="space-y-3">
                {codeModule.redeemSteps.map((step: string, index: number) => (
                  <li key={step} className="flex gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[hsl(var(--nav-theme)/0.12)] border border-[hsl(var(--nav-theme)/0.35)] text-[hsl(var(--nav-theme-light))] flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-sm text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </div>
      </section>

      {/* 广告位 5: 中型横幅 468×60 */}
      <AdBanner type="banner-468x60" adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60} />

      {/* Module 2: Anime Apocalypse Beginner Guide */}
      <section id="anime-apocalypse-beginner-guide" className="scroll-mt-24 px-4 py-20 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm mb-4">
              <BookOpen className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              {beginnerModule.eyebrow}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{beginnerModule.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-4">{beginnerModule.subtitle}</p>
            <p className="text-muted-foreground max-w-4xl mx-auto">{beginnerModule.intro}</p>
          </div>

          <div className="scroll-reveal space-y-5">
            {beginnerModule.items.map((step: any) => (
              <div key={step.step} className="grid grid-cols-1 lg:grid-cols-[84px_1fr] gap-4 p-6 rounded-xl border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.45)] transition-colors">
                <div className="flex lg:block items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[hsl(var(--nav-theme)/0.12)] border border-[hsl(var(--nav-theme)/0.35)] text-[hsl(var(--nav-theme-light))] flex items-center justify-center text-xl font-bold">
                    {step.step}
                  </div>
                </div>
                <div>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-2xl font-bold">{step.title}</h3>
                      <p className="mt-2 text-sm text-[hsl(var(--nav-theme-light))]">{step.goal}</p>
                    </div>
                    <Target className="hidden md:block w-6 h-6 text-[hsl(var(--nav-theme-light))] flex-shrink-0" />
                  </div>
                  <p className="text-muted-foreground mb-4">{step.details}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="space-y-2">
                      {step.actions.map((action: string) => (
                        <li key={action} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                          {action}
                        </li>
                      ))}
                    </ul>
                    <div className="rounded-lg border border-[hsl(var(--nav-theme)/0.25)] bg-[hsl(var(--nav-theme)/0.06)] p-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2 mb-2 font-semibold text-foreground">
                        <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                        {beginnerModule.tipLabel}
                      </div>
                      {step.beginnerTip}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 6: 移动端横幅 320×50 */}
      <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />

      {/* Module 3: Anime Apocalypse Ability Tier List */}
      <section id="anime-apocalypse-ability-tier-list" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm mb-4">
              <Trophy className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              {tierModule.eyebrow}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{tierModule.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-4">{tierModule.subtitle}</p>
            <p className="text-muted-foreground max-w-4xl mx-auto">{tierModule.intro}</p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 lg:grid-cols-2 gap-5">
            {tierModule.items.map((tier: any) => (
              <div key={tier.tier} className="p-6 rounded-xl border border-border bg-card">
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[hsl(var(--nav-theme)/0.12)] border border-[hsl(var(--nav-theme)/0.35)] flex items-center justify-center text-[hsl(var(--nav-theme-light))] font-bold">
                      {tier.tier}
                    </div>
                    <h3 className="text-xl font-bold">{tier.label}</h3>
                  </div>
                  <Star className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                </div>

                <div className="space-y-4">
                  {tier.abilities.map((ability: any) => (
                    <div key={ability.name} className="rounded-lg border border-border bg-background/60 p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                        <h4 className="text-lg font-bold">{ability.name}</h4>
                        <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]">
                          {ability.role}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {ability.bestFor.map((tag: string) => (
                          <span key={tag} className="px-2 py-1 rounded-md bg-muted/50 border border-border text-xs text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{ability.rankingReason}</p>
                      <p className="text-sm border-l-2 border-[hsl(var(--nav-theme)/0.45)] pl-3 text-muted-foreground">
                        {ability.tradeoff}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 4: Anime Apocalypse Abilities Guide */}
      <section id="anime-apocalypse-abilities-guide" className="scroll-mt-24 px-4 py-20 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm mb-4">
              <Zap className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              {abilitiesModule.eyebrow}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{abilitiesModule.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-4">{abilitiesModule.subtitle}</p>
            <p className="text-muted-foreground max-w-4xl mx-auto">{abilitiesModule.intro}</p>
          </div>

          <div className="scroll-reveal mb-10">
            <div className="flex items-center gap-3 mb-5">
              <Swords className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="text-2xl font-bold">{abilitiesModule.systemTitle}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {abilitySystemItems.map((item: any) => (
                <div key={item.name} className="p-5 rounded-xl border border-border bg-card">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h4 className="font-bold text-lg">{item.name}</h4>
                    <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{item.details}</p>
                  {item.controls && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.controls.map((control: string) => (
                        <span key={control} className="px-2 py-1 rounded-md bg-muted/50 border border-border text-xs">
                          {control}
                        </span>
                      ))}
                    </div>
                  )}
                  {item.rates && (
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {item.rates.map((rate: any) => (
                        <div key={rate.rarity} className="rounded-md border border-border bg-muted/30 p-2 text-sm">
                          <span className="font-semibold">{rate.rarity}</span>
                          <span className="text-muted-foreground"> - {rate.chance}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {item.milestones && (
                    <div className="space-y-2 mb-4">
                      {item.milestones.map((milestone: string) => (
                        <div key={milestone} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                          {milestone}
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-sm border-l-2 border-[hsl(var(--nav-theme)/0.45)] pl-3 text-muted-foreground">
                    {item.playerUse}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="scroll-reveal">
            <div className="flex items-center gap-3 mb-5">
              <Zap className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="text-2xl font-bold">{abilitiesModule.rosterTitle}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {abilityRosterItems.map((item: any) => (
                <div key={item.name} className="p-5 rounded-xl border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.45)] transition-colors">
                  <div className="mb-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-lg mb-2">{item.name}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{item.obtainMethod}</p>
                  <p className="text-sm text-muted-foreground mb-4">{item.details}</p>
                  <p className="text-sm border-l-2 border-[hsl(var(--nav-theme)/0.45)] pl-3 text-muted-foreground">
                    {item.playerUse}
                  </p>
                </div>
              ))}
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
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} />

      {/* Footer */}
      <footer className="bg-muted/20 border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">{t.footer.description}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href={EXTERNAL_LINKS.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href={EXTERNAL_LINKS.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href={EXTERNAL_LINKS.robloxGroup}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamCommunity}
                  </a>
                </li>
                <li>
                  <a
                    href={EXTERNAL_LINKS.robloxGame}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamStore}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>{t.footer.about}</li>
                <li>{t.footer.privacy}</li>
                <li>{t.footer.terms}</li>
                <li>{t.footer.copyrightNotice}</li>
              </ul>
            </div>

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
