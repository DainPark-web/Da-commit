import React, { useEffect, useState } from 'react'
import { Box, Text } from 'ink'
import Spinner from 'ink-spinner'
import { commitMessage, amendCommit, pushAfterCommit } from '../utils/git.js'
import { addScope } from '../hooks/useScopes.js'
import { buildMessage } from '../utils/format.js'
import type { CommitState } from '../types.js'

interface Props {
  state: CommitState
}

export default function Result({ state }: Props) {
  const [done, setDone] = useState(false)
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const run = async () => {
      try {
        const { selectedType, scope, message, amended, push } = state
        if (!selectedType) throw new Error('No commit type selected')
        const msg = buildMessage(selectedType, scope, message)
        const out = amended ? await amendCommit(msg) : await commitMessage(msg)
        if (scope) addScope(scope)
        let fullOutput = out
        if (push) {
          const pushOut = await pushAfterCommit()
          fullOutput = [out, pushOut].filter(Boolean).join('\n')
        }
        setOutput(fullOutput)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        setDone(true)
      }
    }
    run()
  }, [])

  if (!done) {
    return (
      <Box paddingX={1}>
        <Text color="green">
          <Spinner type="dots" />
        </Text>
        <Text>  Committing...</Text>
      </Box>
    )
  }

  if (error) {
    return (
      <Box flexDirection="column" paddingX={1}>
        <Text color="red" bold>✗ Commit failed</Text>
        <Text color="red">{error}</Text>
      </Box>
    )
  }

  return (
    <Box flexDirection="column" paddingX={1}>
      <Text color="green" bold>✓ Committed!</Text>
      {output && <Text dimColor>{output}</Text>}
    </Box>
  )
}
