import {
  createContext,
  type ElementType,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react"
import {
  CARET_LINGER_MS,
  getScrollDirection,
  prefersReducedMotion,
} from "@/lib/typewriter"

export interface RevealItem {
  el: HTMLElement
  start: (onComplete: () => void) => void
  reveal: () => void
  hideCaret: () => void
}

type Register = (item: RevealItem) => () => void

const RevealContext = createContext<Register | null>(null)

export function useRevealRegister(): Register | null {
  return useContext(RevealContext)
}

function orderByDom(a: RevealItem, b: RevealItem): number {
  const pos = a.el.compareDocumentPosition(b.el)
  if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1
  if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1
  return 0
}

interface RevealSectionProps {
  children: ReactNode
  as?: ElementType
  id?: string
  className?: string
}

export function RevealSection({ children, as = "div", id, className }: RevealSectionProps) {
  const nodeRef = useRef<HTMLElement | null>(null)
  const itemsRef = useRef<RevealItem[]>([])
  const triggeredRef = useRef(false)

  const setRef = useCallback((node: HTMLElement | null) => {
    nodeRef.current = node
  }, [])

  const register = useCallback<Register>((item) => {
    itemsRef.current.push(item)
    return () => {
      itemsRef.current = itemsRef.current.filter((i) => i !== item)
    }
  }, [])

  useEffect(() => {
    const el = nodeRef.current
    if (!el || prefersReducedMotion()) return

    let lingerTimer = 0
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || triggeredRef.current) continue
          triggeredRef.current = true
          io.disconnect()

          const items = [...itemsRef.current].sort(orderByDom)

          if (getScrollDirection() === "up") {
            for (const item of items) item.reveal()
            return
          }

          let i = 0
          const next = () => {
            if (i >= items.length) return
            const current = items[i]
            i += 1
            current.start(() => {
              if (i < items.length) {
                current.hideCaret()
                next()
              } else {
                lingerTimer = window.setTimeout(current.hideCaret, CARET_LINGER_MS)
              }
            })
          }
          next()
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    )
    io.observe(el)

    return () => {
      clearTimeout(lingerTimer)
      io.disconnect()
    }
  }, [])

  const Comp = as
  return (
    <RevealContext.Provider value={register}>
      <Comp ref={setRef} id={id} className={className}>
        {children}
      </Comp>
    </RevealContext.Provider>
  )
}
