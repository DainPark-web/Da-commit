# da-commit

Interactive CLI for writing conventional commits — step by step, in the terminal.

## Features

- Interactive TUI built with [Ink](https://github.com/vaddigor/ink)
- Conventional Commits format with emoji (`✨ feat(scope): message`)
- Stage/unstage files before committing
- `--amend` mode to edit the last commit
- 14 commit types supported

## Install

```bash
npm install -g da-commit
```

Or run without installing:

```bash
npx da-commit
```

## Usage

```bash
da-commit          # new commit
da-commit --amend  # amend last commit
```

## Steps

1. **Stage files** — select which files to stage (`space` to toggle, `a` to toggle all)
2. **Commit type** — pick a type (feat, fix, chore, ...)
3. **Scope** — optional scope (e.g. `auth`, `api`)
4. **Message** — short description of the change
5. **Preview** — review the final commit message before committing

## Commit Types

| Type       | Emoji | Description                  |
|------------|-------|------------------------------|
| `feat`     | ✨    | A new feature                |
| `fix`      | 🐛    | A bug fix                    |
| `chore`    | 🔧    | Maintenance tasks            |
| `refactor` | ♻️    | Code refactoring             |
| `docs`     | 📝    | Documentation changes        |
| `style`    | 💄    | Code style changes           |
| `test`     | ✅    | Adding or updating tests     |
| `perf`     | ⚡    | Performance improvements     |
| `ci`       | 👷    | CI/CD changes                |
| `build`    | 📦    | Build system changes         |
| `revert`   | ⏪    | Revert a previous commit     |
| `deps`     | ⬆️    | Dependency updates           |
| `release`  | 🚀    | Release a new version        |
| `wip`      | 🚧    | Work in progress             |

## Keybindings

| Key         | Action             |
|-------------|--------------------|
| `↑` / `↓`  | Navigate           |
| `space`     | Toggle file staged |
| `a`         | Toggle all files   |
| `enter`     | Continue / confirm |
| `esc`       | Go back            |

## Requirements

| 항목 | 최소 버전 | 확인 방법 |
|------|-----------|-----------|
| Node.js | **18.0.0** 이상 | `node -v` |
| npm | **8.0.0** 이상 | `npm -v` |
| Git | **2.0.0** 이상 | `git --version` |

> Node.js 18 미만에서는 ESM 지원 문제로 실행되지 않습니다.
>
> Node.js 설치는 [nodejs.org](https://nodejs.org) 또는 [nvm](https://github.com/nvm-sh/nvm)을 권장합니다.

```bash
# nvm 사용 시
nvm install 18
nvm use 18
```

## License

MIT
