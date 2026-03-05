import React from 'react'
import { Box, Text, useInput } from 'ink'
import { buildMessage } from '../utils/format.js'
import type { CommitState } from '../types.js'

interface Props {
  state: CommitState
  onConfirm: () => void
  onEdit: () => void
  onCancel: () => void
}

export default function PreviewConfirm({ state, onConfirm, onEdit, onCancel }: Props) {
  const { selectedType, scope, message, files, amended } = state

  useInput((_input, key) => {
    if (key.return) {
      onConfirm()
    } else if (_input === 'e') {
      onEdit()
    } else if (key.escape) {
      onCancel()
    }
  })

  if (!selectedType) return null

  const commitMsg = buildMessage(selectedType, scope, message)
  const stagedFiles = files.filter((f) => f.staged)

  return (
    <Box flexDirection="column" paddingX={1}>
      <Box marginBottom={1}>
        <Text bold color="cyan">Step 5/5 — Confirm</Text>
      </Box>

      {amended && (
        <Box marginBottom={1}>
          <Text color="yellow" bold>⚠  Amend mode — will rewrite last commit</Text>
        </Box>
      )}

      <Box borderStyle="round" borderColor="green" paddingX={1} marginBottom={1} flexDirection="column">
        <Text bold color="green">{commitMsg}</Text>
      </Box>

      <Box flexDirection="column" marginBottom={1}>
        <Text dimColor bold>Staged files ({stagedFiles.length}):</Text>
        {stagedFiles.map((f) => (
          <Text key={f.path} color={f.status === 'D' ? 'red' : 'green'}>
            {f.status === 'D' ? '-' : '+'} {f.path}
          </Text>
        ))}
      </Box>

      <Box>
        <Text dimColor>enter commit  e edit message  esc cancel</Text>
      </Box>
    </Box>
  )
}
