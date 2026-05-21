const agents = [
  { id: 'agent-1', name: 'Orchestrator', role: '오케스트레이터', model: 'claude-opus-4', status: 'running' },
  { id: 'agent-2', name: 'Researcher', role: '리서처', model: 'claude-sonnet-4', status: 'idle' },
  { id: 'agent-3', name: 'Coder', role: '코더', model: 'gpt-4o', status: 'error' },
  { id: 'agent-4', name: 'Reviewer', role: '리뷰어', model: 'gemini-pro', status: 'idle' }
];

const tasks = [
  { id: 'task-1', title: '요구사항 분석', summary: '사용자 요구사항 수집 및 정리', status: 'done', assignedAgentId: 'agent-2' },
  { id: 'task-2', title: '아키텍처 설계', summary: '시스템 구조 설계', status: 'done', assignedAgentId: 'agent-1' },
  { id: 'task-3', title: 'API 구현', summary: 'REST API 엔드포인트 개발', status: 'in_progress', assignedAgentId: 'agent-3' },
  { id: 'task-4', title: '프론트엔드 개발', summary: 'UI 컴포넌트 구현', status: 'in_progress', assignedAgentId: 'agent-3' },
  { id: 'task-5', title: '코드 리뷰', summary: '구현 코드 품질 검토', status: 'pending', assignedAgentId: 'agent-4' },
  { id: 'task-6', title: '테스트 작성', summary: '단위 및 통합 테스트', status: 'pending', assignedAgentId: 'agent-2' },
  { id: 'task-7', title: '배포 준비', summary: '프로덕션 배포 설정', status: 'failed', assignedAgentId: 'agent-1' }
];

const logs = [
  { id: 'log-1',  agentId: 'agent-1', timestamp: '06:00:01', level: 'info',  message: '오케스트레이션 세션 시작' },
  { id: 'log-2',  agentId: 'agent-2', timestamp: '06:00:05', level: 'info',  message: '요구사항 문서 로드 완료' },
  { id: 'log-3',  agentId: 'agent-1', timestamp: '06:00:12', level: 'info',  message: 'agent-2에 리서치 태스크 배정' },
  { id: 'log-4',  agentId: 'agent-2', timestamp: '06:01:03', level: 'info',  message: '요구사항 분석 완료 — 7개 항목 추출' },
  { id: 'log-5',  agentId: 'agent-1', timestamp: '06:01:15', level: 'info',  message: '아키텍처 설계 시작' },
  { id: 'log-6',  agentId: 'agent-3', timestamp: '06:02:00', level: 'info',  message: 'API 구현 태스크 수신' },
  { id: 'log-7',  agentId: 'agent-3', timestamp: '06:03:22', level: 'warn',  message: '의존성 버전 충돌 감지됨' },
  { id: 'log-8',  agentId: 'agent-1', timestamp: '06:03:45', level: 'info',  message: '아키텍처 설계 완료' },
  { id: 'log-9',  agentId: 'agent-3', timestamp: '06:04:10', level: 'error', message: '빌드 실패: 모듈 해석 오류' },
  { id: 'log-10', agentId: 'agent-1', timestamp: '06:04:30', level: 'warn',  message: 'agent-3 오류 감지 — 재시도 대기 중' },
  { id: 'log-11', agentId: 'agent-4', timestamp: '06:05:00', level: 'info',  message: '리뷰 큐 대기 중' },
  { id: 'log-12', agentId: 'agent-2', timestamp: '06:05:20', level: 'info',  message: '테스트 케이스 초안 작성 중' }
];

const strategies = [
  {
    id: 'strategy-committee',
    name: '위원회형 (Committee)',
    description: '여러 에이전트가 동등한 권한으로 협의하여 의사결정을 내리는 방식',
    features: [
      '모든 에이전트가 투표권 보유',
      '다수결 또는 합의 기반 결정',
      '단일 장애점 없음',
      '느리지만 높은 신뢰도',
      '복잡한 판단이 필요한 태스크에 적합'
    ]
  },
  {
    id: 'strategy-leader',
    name: '리더형 (Leader)',
    description: '리더 에이전트가 전체 흐름을 지휘하고 하위 에이전트에게 태스크를 위임하는 방식',
    features: [
      '명확한 지휘 체계',
      '빠른 의사결정 속도',
      '리더 에이전트가 병목 가능',
      '태스크 분배 및 우선순위 관리',
      '대규모 병렬 작업에 적합'
    ]
  }
];

window.mockData = { agents, tasks, logs, strategies };
