import type { CommitType } from '../types.js'

export const COMMIT_TYPES: CommitType[] = [
  { type: 'feat', emoji: '✨', description: 'A new feature' },
  { type: 'fix', emoji: '🐛', description: 'A bug fix' },
  { type: 'chore', emoji: '🔧', description: 'Maintenance tasks' },
  { type: 'refactor', emoji: '♻️', description: 'Code refactoring' },
  { type: 'docs', emoji: '📝', description: 'Documentation changes' },
  { type: 'style', emoji: '💄', description: 'Code style changes' },
  { type: 'test', emoji: '✅', description: 'Adding or updating tests' },
  { type: 'perf', emoji: '⚡', description: 'Performance improvements' },
  { type: 'ci', emoji: '👷', description: 'CI/CD changes' },
  { type: 'build', emoji: '📦', description: 'Build system changes' },
  { type: 'revert', emoji: '⏪', description: 'Revert a previous commit' },
  { type: 'deps', emoji: '⬆️', description: 'Dependency updates' },
  { type: 'release', emoji: '🚀', description: 'Release a new version' },
  { type: 'wip', emoji: '🚧', description: 'Work in progress' },
]
