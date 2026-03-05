import React, { useState } from 'react'
import { Box, Text, useInput } from 'ink'
import { COMMIT_TYPES } from '../utils/commitTypes.js'
import type { CommitState } from '../types.js'

interface Props {
  onNext: (partial: Partial<CommitState>) => void
  onBack: () => void
}

export default function TypePicker({ onNext, onBack }: Props) {
  const [cursor, setCursor] = useState(0)

  useInput((_input, key) => {
    if (key.upArrow) {
      setCursor((c) => Math.max(0, c - 1))
    } else if (key.downArrow) {
      setCursor((c) => Math.min(COMMIT_TYPES.length - 1, c + 1))
    } else if (key.return) {
      onNext({ selectedType: COMMIT_TYPES[cursor] })
    } else if (key.escape) {
      onBack()
    }
  })

  return (
    <Box flexDirection="column" paddingX={1}>
      <Box marginBottom={1}>
        <Text bold color="cyan">Step 2/5 — Commit type</Text>
      </Box>
      <Box marginBottom={1}>
        <Text dimColor>↑↓ navigate  enter select  esc back</Text>
      </Box>
      {COMMIT_TYPES.map((ct, i) => (
        <Box key={ct.type}>
          <Text color={cursor === i ? 'cyan' : undefined}>
            {cursor === i ? '❯ ' : '  '}
          </Text>
          <Text bold={cursor === i}>
            {ct.emoji}{' '}
            <Text color="yellow">{ct.type.padEnd(10)}</Text>
            <Text dimColor>{ct.description}</Text>
          </Text>
        </Box>
      ))}
    </Box>
  )
}
