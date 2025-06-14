<template>
  <div class="dashboard-container">
    <!-- 顶部标题栏 -->
    <div class="app-header">
      <div class="header-content">
        <h1 class="app-title">
          <i class="fas fa-shield-alt"></i>
          漏洞扫描系统
        </h1>
        <p class="app-subtitle">
          基于Vue.js构建的企业级安全扫描平台 - 全面保障您的网络安全
        </p>
      </div>

      <div class="stats-container">
        <div class="stat-card">
          <div class="stat-icon"><i class="fas fa-star"></i></div>
          <div class="stat-info">
            <div class="stat-label">安全评分</div>
            <div class="stat-value">92/100</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon"><i class="fas fa-server"></i></div>
          <div class="stat-info">
            <div class="stat-label">在线设备</div>
            <div class="stat-value">24</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon"><i class="fas fa-history"></i></div>
          <div class="stat-info">
            <div class="stat-label">本月扫描</div>
            <div class="stat-value">18次</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon"><i class="fas fa-bug"></i></div>
          <div class="stat-info">
            <div class="stat-label">待处理漏洞</div>
            <div class="stat-value">7个</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="dashboard-content">
      <div class="left-panel">
        <ScanTarget />
      </div>

      <div class="right-panel">
        <ScanStatus />
        <VulnerabilityList />
        <ReportGenerator />
      </div>
    </div>
  </div>
</template>

<script>
import ScanTarget from '@/components/ScanTarget.vue'
import ScanStatus from '@/components/ScanStatus.vue'
import VulnerabilityList from '@/components/VulnerabilityList.vue'
import ReportGenerator from '@/components/ReportGenerator.vue'
export default {
  components: {
    ScanTarget,
    ScanStatus,
    VulnerabilityList,
    ReportGenerator

  }
}
</script>

<style scoped>
/* 全局变量 */
:root {
  --primary: #4361ee;
  --primary-dark: #3a56d4;
  --secondary: #4a5568;
  --dark-bg: #1a202c;
  --card-bg: #2d3748;
  --text-primary: #f7fafc;
  --text-secondary: #cbd5e0;
  --border: rgba(255, 255, 255, 0.1);
  --border-radius: 12px;
  --box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  --transition: all 0.3s ease;
  --success: #48bb78;
  --warning: #ecc94b;
  --danger: #f56565;
  --info: #4299e1;
}

.dashboard-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--dark-bg);
  color: var(--text-primary);
  padding: 20px;
  position: relative;
  overflow: hidden;
}

/* 科技感背景 */
.dashboard-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
      radial-gradient(circle at 10% 20%, rgba(67, 97, 238, 0.1) 0%, transparent 20%),
      radial-gradient(circle at 90% 30%, rgba(67, 97, 238, 0.1) 0%, transparent 20%),
      radial-gradient(circle at 50% 80%, rgba(67, 97, 238, 0.1) 0%, transparent 20%);
  pointer-events: none;
  z-index: 0;
}

/* 顶部应用标题栏 */
.app-header {
  background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  position: relative;
  overflow: hidden;
  margin-bottom: 30px;
  padding: 30px;
  z-index: 1;
}

.app-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at top right, rgba(92, 107, 192, 0.4), transparent 70%);
  pointer-events: none;
}

.header-content {
  position: relative;
  z-index: 2;
}

.app-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.app-title i {
  color: #00dbde;
}

.app-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 400;
  max-width: 600px;
  margin: 0 auto;
}

/* 统计卡片 */
.stats-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 30px;
  justify-content: center;
}

.stat-card {
  flex: 1;
  min-width: 200px;
  max-width: 250px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius);
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: var(--transition);
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.stat-info {
  flex: 1;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 5px;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
}

/* 主内容区 */
.dashboard-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
}

@media (max-width: 1200px) {
  .dashboard-content {
    grid-template-columns: 1fr;
  }
}

.left-panel, .right-panel {
  display: flex;
  flex-direction: column;
  gap: 25px;
}
</style>