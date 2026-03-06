import React, { useState, useEffect } from 'react'
import { Box, Text } from 'ink'
import FileSelector from './steps/FileSelector.js'
import TypePicker from './steps/TypePicker.js'
import ScopeInput from './steps/ScopeInput.js'
import MessageInput from './steps/MessageInput.js'
import PreviewConfirm from './steps/PreviewConfirm.js'
import Result from './steps/Result.js'
import { useGitStatus } from './hooks/useGitStatus.js'
import { getLastCommit } from './utils/git.js'
import { COMMIT_TYPES } from './utils/commitTypes.js'
import type { Step, CommitState } from './types.js'

const isAmend = process.argv.includes('--amend')
const isPush = process.argv.includes('--push')

const initialState: CommitState = {
  files: [],
  selectedType: null,
  scope: '',
  message: '',
  amended: false,
  push: isPush,
}

export default function App() {
  const { files, loading, error } = useGitStatus()
  const [step, setStep] = useState<Step>(isAmend ? 'type' : 'files')
  const [state, setState] = useState<CommitState>(initialState)

  // Pre-fill from last commit if amend mode
  useEffect(() => {
    if (!isAmend) return
    getLastCommit().then((lastMsg) => {
      // Try to parse emoji type(scope): message
      const match = lastMsg.match(/^(\S+)\s+(\w+)(?:\(([^)]+)\))?:\s+(.+)$/)
      if (match) {
        const [, , typeStr, scopeStr, msgStr] = match
        const foundType = COMMIT_TYPES.find((t) => t.type === typeStr) ?? null
        setState((s) => ({
          ...s,
          selectedType: foundType,
          scope: scopeStr ?? '',
          message: msgStr ?? lastMsg,
          amended: true,
        }))
      } else {
        setState((s) => ({ ...s, message: lastMsg, amended: true }))
      }
    })
  }, [])

  const next = (partial: Partial<CommitState>) => {
    const updated = { ...state, ...partial }
    setState(updated)
    const order: Step[] = ['files', 'type', 'scope', 'message', 'preview', 'result']
    const idx = order.indexOf(step)
    if (idx < order.length - 1) {
      setStep(order[idx + 1] as Step)
    }
  }

  const back = () => {
    const order: Step[] = ['files', 'type', 'scope', 'message', 'preview', 'result']
    const idx = order.indexOf(step)
    if (idx > 0) {
      setStep(order[idx - 1] as Step)
    }
  }

  if (loading) {
    return (
      <Box paddingX={1}>
        <Text color="cyan">Loading git status...</Text>
      </Box>
    )
  }

  if (error) {
    return (
      <Box paddingX={1}>
        <Text color="red">Git error: {error}</Text>
      </Box>
    )
  }

  if (step === 'files') {
    return (
      <FileSelector
        files={files}
        onNext={(partial) => next({ ...partial, files: partial.files ?? files })}
        onCancel={() => process.exit(0)}
      />
    )
  }

  if (step === 'type') {
    return <TypePicker onNext={next} onBack={back} />
  }

  if (step === 'scope' && state.selectedType) {
    return (
      <ScopeInput
        selectedType={state.selectedType}
        onNext={next}
        onBack={back}
      />
    )
  }

  if (step === 'message' && state.selectedType) {
    return (
      <MessageInput
        selectedType={state.selectedType}
        scope={state.scope}
        onNext={next}
        onBack={back}
      />
    )
  }

  if (step === 'preview') {
    return (
      <PreviewConfirm
        state={state}
        onConfirm={() => setStep('result')}
        onEdit={() => setStep('message')}
        onCancel={() => {
          process.exit(0)
        }}
      />
    )
  }

  if (step === 'result') {
    return <Result state={state} />
  }

  return null
}
