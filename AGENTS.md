# AGENTS.md

이 프로젝트는 멀티에이전트 오케스트레이션 대시보드용 역할 정의를 담고 있다.

## 기준 문서
- `atent-team.md` : 전체 팀 구조와 운영 원칙
- `role-card.md` : 에이전트 공통 템플릿

## 에이전트 파일
- `agents/orchestrator.md` : 전체 작업 분배와 우선순위 조정
- `agents/planner.md` : 요구사항 정리, 범위 확정, 작업 분해
- `agents/designer.md` : UX/비주얼 방향과 design.md 작성
- `agents/frontend.md` : 프론트엔드 구현
- `agents/backend.md` : 백엔드 구현
- `agents/tester.md` : 로컬 배포 및 통합 테스트
- `agents/qa.md` : 품질 검증, 누락/충돌 점검

## 운영 규칙
- 각 작업은 책임 에이전트 1개를 가진다.
- 기획 → 디자인 → 구현 → 테스트 → 품질 검증 순서를 기본 흐름으로 한다.
- 모호한 요청은 `planner`가 먼저 정리한다.
- 디자인 확정 전에 프론트엔드 구현을 시작하지 않는다.
- 테스트와 품질 검증이 끝나기 전에는 완료 처리하지 않는다.

## 역할 요약
| 역할 | 책임 |
|---|---|
| orchestrator | 전체 흐름 제어, 분배, 재조정 |
| planner | PRD/IA/유저플로우/기능명세 |
| designer | 디자인 방향, 화면 톤, design.md |
| frontend | UI 구현, 타입/빌드 확인 |
| backend | API, 데이터, 비즈니스 로직 |
| tester | 로컬 실행, 통합 검증 |
| qa | 산출물 일관성, 누락, 충돌 검토 |

## 권장 핸드오프
`orchestrator` → `planner` → `designer` → `frontend`/`backend` → `tester` → `qa`

## 참고
세부 역할 정의는 각 에이전트 파일을 기준으로 한다.
