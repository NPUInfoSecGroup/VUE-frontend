<template>
  <div class="scan-status card">
    <div class="card-header">
      <i class="fas fa-tasks"></i>
      <h2>扫描状态</h2>
    </div>

    <div class="card-body">
      <div class="status-indicator">
        <div class="status-bubble"></div>
        <div class="status-text">就绪，等待扫描开始</div>
      </div>

      <div class="progress-container">
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
        <div class="progress-text">0%</div>
      </div>

      <div class="scan-summary">
        <div class="section-title">
          <i class="fas fa-chart-bar"></i>
          <span>扫描概览</span>
        </div>

        <div class="summary-content">
          <p class="waiting-text">
            <i class="fas fa-hourglass-half"></i>
            等待扫描开始...
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  border: 1px solid var(--border);
  overflow: hidden;
}

.card-header {
  padding: 18px 25px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid var(--border);
}

.card-header i {
  font-size: 1.5rem;
  color: var(--warning);
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
  margin-bottom: 25px;
}

.status-bubble {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--success);
  position: relative;
}

.status-text {
  font-size: 1.1rem;
  font-weight: 500;
}

.progress-container {
  margin-bottom: 30px;
}

.progress-bar {
  height: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(to right, var(--warning), var(--success));
  width: 0%;
  border-radius: 5px;
  transition: width 0.5s ease;
}

.progress-text {
  text-align: right;
  margin-top: 8px;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.scan-summary {
  margin-top: 25px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--warning);
}

.section-title i {
  font-size: 1.2rem;
}

.summary-content {
  background: rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 20px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.waiting-text {
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-secondary);
}
</style>