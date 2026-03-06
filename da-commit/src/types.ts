export type Step = 'files' | 'type' | 'scope' | 'message' | 'preview' | 'result'

export interface GitFile {
  status: string
  path: string
  staged: boolean
}

export interface CommitType {
  type: string
  emoji: string
  description: string
}

export interface CommitState {
  files: GitFile[]
  selectedType: CommitType | null
  scope: string
  message: string
  amended: boolean
  push: boolean
}
