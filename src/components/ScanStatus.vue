<template>
  <div class="scan-status card">
    <div class="card-header">
      <i class="fas fa-tasks" />
      <h2>扫描状态</h2>
    </div>

    <div class="card-body">
      <div class="status-indicator">
        <div class="status-bubble" :class="statusClass" />
        <div class="status-text">{{ statusText }}</div>
      </div>

      <ul class="status-list">
        <li v-for="item in jobs" :key="item.id">
          <div class="job-name">{{ item.name }}</div>
          <div class="job-progress">
            <div class="progress-bar" :style="{ width: item.progress + '%' }" />
          </div>
          <div class="job-percent">{{ item.progress }}%</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScanStatus',
  data () {
    return {
      status: 'ready',
      jobs: [
        { id: 1, name: 'Web 目标扫描', progress: 0 },
        { id: 2, name: '端口扫描', progress: 0 }
      ]
    }
  },
  computed: {
    statusText () {
      return this.status === 'ready' ? '就绪，等待扫描开始' : '扫描进行中…'
    },
    statusClass () {
      return this.status === 'ready' ? 'ready' : 'running'
    }
  }
}
</script>

<style scoped>
.scan-status {
  width: 100%;
  height: 100%;
}

.card {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  border: 1px solid var(--border);
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.card-header {
  padding: 18px 25px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid var(--border);
}

.card-header h2 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
}

.card-body {
  padding: 25px;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 28px;
}

.status-bubble {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--warning);
}
.status-bubble.ready {
  background: var(--warning);
}
.status-bubble.running {
  background: var(--accent);
}

.status-text {
  font-weight: 600;
}

.status-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.status-list li {
  display: grid;
  grid-template-columns: 1fr 1fr 60px;
  align-items: center;
  gap: 14px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.job-progress {
  background: rgba(255, 255, 255, 0.08);
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: var(--accent);
}
</style>
