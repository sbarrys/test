// ===== 전역 상태 =====
const state = { selectedAgentId: null };

// ===== 헬퍼 함수 =====
function getAgentById(id) {
  return window.mockData.agents.find(a => a.id === id);
}

function statusLabel(s) {
  const map = {
    idle: '대기중', running: '실행중', error: '오류',
    pending: '대기', in_progress: '진행중', done: '완료', failed: '실패'
  };
  return map[s] || s;
}

function panel(name) {
  return document.querySelector('[data-panel="' + name + '"]');
}

// ===== 에이전트 클릭 인터랙션 =====
function onAgentClick(id) {
  state.selectedAgentId = (state.selectedAgentId === id) ? null : id;
  renderAgentCards();
  renderTaskList(state.selectedAgentId);
  renderLogs(state.selectedAgentId);
  // renderModelStrategy()는 필터링 없음 — 항상 전체 표시
}

// ===== 에이전트 카드 렌더링 =====
function renderAgentCards() {
  var el = panel('agent-cards');
  var agents = window.mockData.agents;

  if (!agents.length) {
    el.innerHTML = '<h2>에이전트</h2><p class="no-data">에이전트 없음</p>';
    return;
  }

  var grid = document.createElement('div');
  grid.className = 'agent-grid';

  agents.forEach(function(agent) {
    var card = document.createElement('div');
    card.className = 'agent-card' + (state.selectedAgentId === agent.id ? ' selected' : '');
    card.dataset.agentId = agent.id;
    card.innerHTML =
      '<div class="agent-name">' + agent.name + '</div>' +
      '<div class="agent-role">' + agent.role + '</div>' +
      '<span class="badge status-' + agent.status + '">' + statusLabel(agent.status) + '</span>' +
      '<div class="agent-model">' + agent.model + '</div>';
    card.addEventListener('click', function() { onAgentClick(agent.id); });
    grid.appendChild(card);
  });

  el.innerHTML = '<h2>에이전트</h2>';
  el.appendChild(grid);
}

// ===== 작업 목록 렌더링 =====
function renderTaskList(agentId) {
  var el = panel('task-status');
  var tasks = window.mockData.tasks;

  if (agentId) {
    tasks = tasks.filter(function(t) { return t.assignedAgentId === agentId; });
  }

  if (!tasks.length) {
    el.innerHTML = '<h2>작업 목록</h2><p class="no-data">작업 없음</p>';
    return;
  }

  var list = document.createElement('div');
  list.className = 'task-list';

  tasks.forEach(function(t) {
    var agentName = (getAgentById(t.assignedAgentId) || {}).name || '미배정';
    var item = document.createElement('div');
    item.className = 'task-item';
    item.innerHTML =
      '<div class="task-info">' +
        '<div class="task-title">' + t.title + '</div>' +
        '<div class="task-agent-name">' + agentName + '</div>' +
      '</div>' +
      '<span class="badge status-' + t.status + '">' + statusLabel(t.status) + '</span>';
    list.appendChild(item);
  });

  el.innerHTML = '<h2>작업 목록</h2>';
  el.appendChild(list);
}

// ===== 로그 + 메모 렌더링 =====
function renderLogs(agentId) {
  var el = panel('logs');
  var logs = window.mockData.logs;

  if (agentId) {
    logs = logs.filter(function(l) { return l.agentId === agentId; });
  }

  logs = logs.slice(-50);

  var logDiv = document.createElement('div');
  logDiv.className = 'log-list';

  if (!logs.length) {
    logDiv.innerHTML = '<p class="no-data">로그 없음</p>';
  } else {
    logs.forEach(function(l) {
      var agentName = (getAgentById(l.agentId) || {}).name || '?';
      var entry = document.createElement('div');
      entry.className = 'log-entry';
      entry.innerHTML =
        '<span class="log-time">' + l.timestamp + '</span>' +
        '<span class="log-agent">' + agentName + '</span>' +
        '<span class="log-' + l.level + '">' + l.message + '</span>';
      logDiv.appendChild(entry);
    });
  }

  var memo = document.createElement('textarea');
  memo.className = 'memo-area';
  memo.placeholder = '메모 입력...';

  el.innerHTML = '<h2>로그 / 메모</h2>';
  el.appendChild(logDiv);
  el.appendChild(memo);
}

// ===== 전략 카드 렌더링 =====
function renderModelStrategy() {
  var el = panel('model-strategy');
  var strategies = window.mockData.strategies;

  if (!strategies.length) {
    el.innerHTML = '<h2>모델 전략</h2><p class="no-data">전략 없음</p>';
    return;
  }

  var list = document.createElement('div');
  list.className = 'strategy-list';

  strategies.forEach(function(s) {
    var featureItems = s.features.map(function(f) {
      return '<li>' + f + '</li>';
    }).join('');

    var card = document.createElement('div');
    card.className = 'strategy-card';
    card.innerHTML =
      '<div class="strategy-name">' + s.name + '</div>' +
      '<div class="strategy-desc">' + s.description + '</div>' +
      '<ul class="strategy-features">' + featureItems + '</ul>';
    list.appendChild(card);
  });

  el.innerHTML = '<h2>모델 전략</h2>';
  el.appendChild(list);
}

// ===== 초기화 =====
function init() {
  if (!window.mockData) {
    console.error('mockData.js가 로드되지 않았습니다.');
    return;
  }
  renderAgentCards();
  renderTaskList();
  renderLogs();
  renderModelStrategy();
}

document.addEventListener('DOMContentLoaded', init);
