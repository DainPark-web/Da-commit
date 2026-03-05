import React, { useState } from 'react'
import { Box, Text, useInput } from 'ink'
import TextInput from 'ink-text-input'
import { buildMessage } from '../utils/format.js'
import type { CommitState, CommitType } from '../types.js'

interface Props {
  selectedType: CommitType
  scope: string
  onNext: (partial: Partial<CommitState>) => void
  onBack: () => void
}

export default function MessageInput({ selectedType, scope, onNext, onBack }: Props) {
  const [message, setMessage] = useState('')

  useInput((_input, key) => {
    if (key.escape) {
      onBack()
    } else if (key.return && message.trim()) {
      onNext({ message: message.trim() })
    }
  })

  const preview = message
    ? buildMessage(selectedType, scope, message)
    : ''

  return (
    <Box flexDirection="column" paddingX={1}>
      <Box marginBottom={1}>
        <Text bold color="cyan">Step 4/5 — Commit message</Text>
      </Box>
      <Box marginBottom={1}>
        <Text dimColor>esc back  enter continue</Text>
      </Box>
      <Box marginBottom={1}>
        <TextInput
          value={message}
          onChange={setMessage}
          placeholder="describe your change..."
        />
      </Box>
      {preview && (
        <Box marginTop={1} borderStyle="round" borderColor="gray" paddingX={1}>
          <Text>Preview: </Text>
          <Text color="green">{preview}</Text>
        </Box>
      )}
    </Box>
  )
}
