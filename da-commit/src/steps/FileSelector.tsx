import React, { useState } from 'react'
import { Box, Text, useInput } from 'ink'
import { stageFiles, unstageFiles } from '../utils/git.js'
import type { GitFile, CommitState } from '../types.js'

interface Props {
  files: GitFile[]
  onNext: (partial: Partial<CommitState>) => void
}

function statusColor(status: string): string {
  switch (status) {
    case 'M': return 'yellow'
    case 'A': return 'green'
    case 'D': return 'red'
    case '?': return 'gray'
    default: return 'white'
  }
}

function statusLabel(status: string): string {
  switch (status) {
    case 'M': return 'M'
    case 'A': return 'A'
    case 'D': return 'D'
    case '?': return '?'
    default: return status
  }
}

export default function FileSelector({ files: initialFiles, onNext }: Props) {
  const [files, setFiles] = useState<GitFile[]>(initialFiles)
  const [cursor, setCursor] = useState(0)
  const [busy, setBusy] = useState(false)

  useInput(async (input, key) => {
    if (busy) return

    if (key.upArrow) {
      setCursor((c) => Math.max(0, c - 1))
    } else if (key.downArrow) {
      setCursor((c) => Math.min(files.length - 1, c + 1))
    } else if (input === ' ') {
      const file = files[cursor]
      if (!file) return
      setBusy(true)
      try {
        if (file.staged) {
          await unstageFiles([file.path])
        } else {
          await stageFiles([file.path])
        }
        setFiles((prev) =>
          prev.map((f, i) =>
            i === cursor ? { ...f, staged: !f.staged } : f,
          ),
        )
      } finally {
        setBusy(false)
      }
    } else if (input === 'a') {
      const allStaged = files.every((f) => f.staged)
      setBusy(true)
      try {
        if (allStaged) {
          await unstageFiles(files.map((f) => f.path))
          setFiles((prev) => prev.map((f) => ({ ...f, staged: false })))
        } else {
          await stageFiles(files.map((f) => f.path))
          setFiles((prev) => prev.map((f) => ({ ...f, staged: true })))
        }
      } finally {
        setBusy(false)
      }
    } else if (key.return) {
      const staged = files.filter((f) => f.staged)
      if (staged.length === 0) return
      onNext({ files })
    }
  })

  const staged = files.filter((f) => f.staged)

  return (
    <Box flexDirection="column" paddingX={1}>
      <Box marginBottom={1}>
        <Text bold color="cyan">Step 1/5 — Stage files</Text>
      </Box>
      <Box marginBottom={1}>
        <Text dimColor>↑↓ navigate  space toggle  a toggle all  enter continue</Text>
      </Box>
      {files.length === 0 ? (
        <Text color="red">No changes detected. Make some changes first.</Text>
      ) : (
        files.map((file, i) => (
          <Box key={file.path}>
            <Text color={cursor === i ? 'cyan' : undefined}>
              {cursor === i ? '❯ ' : '  '}
            </Text>
            <Text color={file.staged ? 'green' : 'gray'}>
              {file.staged ? '[x]' : '[ ]'}
            </Text>
            <Text> </Text>
            <Text color={statusColor(file.status) as any} bold>
              {statusLabel(file.status)}
            </Text>
            <Text> {file.path}</Text>
          </Box>
        ))
      )}
      {staged.length > 0 && (
        <Box marginTop={1}>
          <Text color="green">{staged.length} file(s) staged — press enter to continue</Text>
        </Box>
      )}
    </Box>
  )
}
