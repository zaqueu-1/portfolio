import { useEffect, useState } from "react"
import { type Profile, ProfileSchema } from "@/types/profile"

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/data/profile.json")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data: unknown) => {
        const result = ProfileSchema.safeParse(data)
        if (!result.success) {
          throw new Error(`Invalid profile data: ${result.error.issues[0]?.message ?? "unknown"}`)
        }
        setProfile(result.data)
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { profile, error, loading }
}
