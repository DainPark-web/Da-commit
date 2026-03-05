import type { CommitType } from '../types.js'

export function buildMessage(
  commitType: CommitType,
  scope: string,
  message: string,
): string {
  const scopePart = scope ? `(${scope})` : ''
  return `${commitType.emoji} ${commitType.type}${scopePart}: ${message}`
}
