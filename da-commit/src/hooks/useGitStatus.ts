import { useState, useEffect } from 'react'
import { getStatus } from '../utils/git.js'
import type { GitFile } from '../types.js'

export function useGitStatus() {
  const [files, setFiles] = useState<GitFile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getStatus()
      .then(setFiles)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { files, loading, error }
}
