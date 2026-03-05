# Contributing to da-commit

## Getting Started

```bash
git clone https://github.com/DainPark-web/da-commit.git
cd da-commit/da-commit
npm install
npm run dev
```

## Branch & PR

- `main` 브랜치는 branch protection이 설정되어 있습니다. 직접 push 불가.
- 작업은 별도 브랜치에서 진행 후 PR을 올려주세요.

```bash
git checkout -b feat/your-feature
```

- PR 제목은 Conventional Commits 형식으로 작성해주세요.
  - 예: `feat(scope): add new commit type`

## Commit Convention

이 프로젝트는 da-commit으로 커밋합니다.

```
✨ feat(scope): 기능 추가
🐛 fix: 버그 수정
📝 docs: 문서 수정
♻️  refactor: 리팩터링
```

## Development

```bash
npm run dev      # tsx로 직접 실행 (빌드 불필요)
npm run build    # dist/ 빌드
```

## Code Style

- TypeScript strict 모드
- 불필요한 추상화, 과도한 주석 지양
- 기능 단위로 step 컴포넌트 분리 유지

## Issues

버그 리포트나 기능 제안은 GitHub Issues를 이용해주세요.
PR 전에 관련 이슈를 먼저 열어두면 좋습니다.
