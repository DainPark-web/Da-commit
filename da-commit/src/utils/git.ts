import { execa } from 'execa'
import type { GitFile } from '../types.js'

export async function getStatus(): Promise<GitFile[]> {
  const { stdout } = await execa('git', ['status', '--porcelain'])
  if (!stdout.trim()) return []

  return stdout
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const xy = line.slice(0, 2)
      const path = line.slice(3).trim()
      const x = xy[0] // index (staged)
      const y = xy[1] // working tree

      // Staged if index has a change (not space or ?)
      const staged = x !== ' ' && x !== '?'

      // Determine display status
      let status: string
      if (x === '?' && y === '?') {
        status = '?'
      } else if (staged) {
        status = x
      } else {
        status = y
      }

      return { status, path, staged }
    })
}

export async function stageFiles(paths: string[]): Promise<void> {
  if (paths.length === 0) return
  await execa('git', ['add', '--', ...paths])
}

export async function unstageFiles(paths: string[]): Promise<void> {
  if (paths.length === 0) return
  await execa('git', ['restore', '--staged', '--', ...paths])
}

export async function commitMessage(msg: string): Promise<string> {
  const { stdout } = await execa('git', ['commit', '-m', msg])
  return stdout
}

export async function amendCommit(msg: string): Promise<string> {
  const { stdout } = await execa('git', ['commit', '--amend', '-m', msg])
  return stdout
}

export async function getLastCommit(): Promise<string> {
  const { stdout } = await execa('git', ['log', '-1', '--pretty=%s'])
  return stdout.trim()
}
