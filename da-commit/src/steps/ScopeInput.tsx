import React, { useState } from 'react'
import { Box, Text, useInput } from 'ink'
import TextInput from 'ink-text-input'
import { getScopes } from '../hooks/useScopes.js'
import type { CommitState, CommitType } from '../types.js'

interface Props {
  selectedType: CommitType
  onNext: (partial: Partial<CommitState>) => void
  onBack: () => void
}

export default function ScopeInput({ selectedType, onNext, onBack }: Props) {
  const [scope, setScope] = useState('')
  const [tabIndex, setTabIndex] = useState(-1)
  const recentScopes = getScopes()

  useInput((input, key) => {
    if (key.tab) {
      if (recentScopes.length === 0) return
      const next = (tabIndex + 1) % recentScopes.length
      setTabIndex(next)
      setScope(recentScopes[next] ?? '')
    } else if (key.escape) {
      onBack()
    } else if (key.return) {
      onNext({ scope })
    } else {
      setTabIndex(-1)
    }
  })

  return (
    <Box flexDirection="column" paddingX={1}>
      <Box marginBottom={1}>
        <Text bold color="cyan">Step 3/5 — Scope</Text>
        <Text dimColor> (optional)</Text>
      </Box>
      <Box marginBottom={1}>
        <Text dimColor>tab cycle suggestions  esc skip  enter continue</Text>
      </Box>
      <Box marginBottom={1}>
        <Text>{selectedType.emoji} {selectedType.type}(</Text>
        <TextInput
          value={scope}
          onChange={(val) => {
            setScope(val)
            setTabIndex(-1)
          }}
          placeholder="scope..."
        />
        <Text>)</Text>
      </Box>
      {recentScopes.length > 0 && (
        <Box flexDirection="column" marginTop={1}>
          <Text dimColor>Recent scopes:</Text>
          {recentScopes.map((s, i) => (
            <Text key={s} color={i === tabIndex ? 'cyan' : 'gray'}>
              {i === tabIndex ? '❯ ' : '  '}{s}
            </Text>
          ))}
        </Box>
      )}
    </Box>
  )
}
