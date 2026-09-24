import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Pause, Play } from "lucide-react"
import { RevealSection } from "@/components/ui/RevealSection"
import { RevealText } from "@/components/ui/RevealText"
import { ScrambleText } from "@/components/ui/ScrambleText"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { useLocale } from "@/context/LocaleContext"
import { copy } from "@/lib/copy"
import { PROJECTS, type Project } from "@/lib/projects"
import { SECTION_PATHS } from "@/lib/sections"
import { prefersReducedMotion } from "@/lib/typewriter"

/** Loops only while on screen; the user's pause always wins. */
function usePreviewPlayback() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const userPausedRef = useRef(prefersReducedMotion())

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPausedRef.current) {
          video.play().catch(() => setIsPlaying(false))
        } else {
          video.pause()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])

  const toggle = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      userPausedRef.current = false
      video.play().catch(() => setIsPlaying(false))
    } else {
      userPausedRef.current = true
      video.pause()
    }
  }

  return { videoRef, isPlaying, setIsPlaying, toggle }
}

function ProjectItem({ project }: { project: Project }) {
  const { t } = useLocale()
  const { videoRef, isPlaying, setIsPlaying, toggle } = usePreviewPlayback()
  const ToggleIcon = isPlaying ? Pause : Play
  const { preview } = project

  return (
    <RevealSection as="article" className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <ScrambleText as="h3" className="ds-display" text={project.name} />
          <RevealText as="p" className="ds-body max-w-2xl" text={t(project.description)} />
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="ds-link inline-flex shrink-0 items-center gap-1 self-start md:self-auto"
          aria-label={`${t(copy.project.open)}: ${project.urlLabel}`}
        >
          {project.urlLabel}
          <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
        </a>
      </div>

      <figure className="border border-border">
        <div className="flex items-center justify-between gap-4 border-b border-border px-3 py-2">
          <span className="ds-label truncate">
            <span className="ds-prompt">$</span> open {project.urlLabel}
          </span>
          <button
            type="button"
            onClick={toggle}
            className="ds-link inline-flex shrink-0 cursor-pointer items-center gap-1.5"
            aria-label={`${t(isPlaying ? copy.project.pause : copy.project.play)}: ${project.name}`}
            aria-pressed={!isPlaying}
          >
            <ToggleIcon className="size-3" strokeWidth={1.5} />
            <span aria-hidden>{isPlaying ? "pause" : "play"}</span>
          </button>
        </div>
        <video
          ref={videoRef}
          className="block h-auto w-full bg-background"
          width={preview.width}
          height={preview.height}
          poster={preview.poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={t(preview.label)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={preview.src} type="video/webm" />
        </video>
      </figure>
    </RevealSection>
  )
}

export function ProjectSection() {
  const { t } = useLocale()

  return (
    <section id="project" className="scroll-mt-24 space-y-10 py-16">
      <RevealSection>
        <SectionHeading path={SECTION_PATHS.project} title={t(copy.project.title)} />
      </RevealSection>

      <div className="space-y-24">
        {PROJECTS.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
