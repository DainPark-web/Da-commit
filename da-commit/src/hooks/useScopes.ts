import Conf from 'conf'

interface StoreSchema {
  recentScopes: string[]
}

const store = new Conf<StoreSchema>({
  projectName: 'da-commit',
  defaults: { recentScopes: [] },
})

export function getScopes(): string[] {
  return store.get('recentScopes')
}

export function addScope(scope: string): void {
  if (!scope.trim()) return
  const current = store.get('recentScopes')
  const updated = [scope, ...current.filter((s) => s !== scope)].slice(0, 10)
  store.set('recentScopes', updated)
}
