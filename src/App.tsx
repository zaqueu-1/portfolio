import { useCallback } from "react"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { GlassBackground } from "@/components/glass/GlassBackground"
import { AppShell } from "@/components/layout/AppShell"
import { Footer } from "@/components/layout/Footer"
import { AboutSection } from "@/components/sections/AboutSection"
import { CtaSection } from "@/components/sections/CtaSection"
import { ExperienceSection } from "@/components/sections/ExperienceSection"
import { TestimonialsSection } from "@/components/sections/TestimonialsSection"
import { HeroSection } from "@/components/sections/HeroSection"
import { LocaleProvider, useLocale } from "@/context/LocaleContext"
import { useHashNav } from "@/hooks/useHashNav"
import { usePageMeta } from "@/hooks/usePageMeta"
import { useProfile } from "@/hooks/useProfile"

function ProfileSkeleton() {
  return (
    <div className="animate-pulse space-y-6 py-12">
      <div className="mx-auto size-28 rounded-full bg-white/10 md:mx-0" />
      <div className="h-10 w-64 rounded-lg bg-white/10" />
      <div className="h-32 w-full rounded-xl bg-white/10" />
    </div>
  )
}

function PortfolioContent() {
  const { profile, loading, error } = useProfile()
  const { locale } = useLocale()
  usePageMeta(profile, locale)
  useHashNav()

  const onNavigate = useCallback((section: string) => {
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  if (loading) {
    return (
      <AppShell onNavigate={onNavigate} socialLinks={[]}>
        <ProfileSkeleton />
      </AppShell>
    )
  }

  if (error || !profile) {
    return (
      <AppShell onNavigate={onNavigate} socialLinks={[]}>
        <p className="text-destructive">{error ?? "Failed to load profile"}</p>
      </AppShell>
    )
  }

  return (
    <AppShell onNavigate={onNavigate} socialLinks={profile.socialLinks}>
      <HeroSection profile={profile} />
      <AboutSection profile={profile} />
      <ExperienceSection profile={profile} />
      <TestimonialsSection profile={profile} />
      <CtaSection />
      <Footer socialLinks={profile.socialLinks} />
    </AppShell>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <LocaleProvider>
        <GlassBackground />
        <PortfolioContent />
      </LocaleProvider>
    </ErrorBoundary>
  )
}
