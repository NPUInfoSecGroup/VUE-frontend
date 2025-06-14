<template>
  <div class="report-generator card">
    <div class="card-header">
      <i class="fas fa-file-alt"></i>
      <h2>报告生成</h2>
    </div>

    <div class="card-body">
      <!-- 操作按钮 -->
      <div class="report-actions">
        <button class="action-button generate" @click="generateReport">
          <i class="fas fa-sync-alt"></i>
          <span>生成报告</span>
        </button>
        <button class="action-button save" @click="saveReport">
          <i class="fas fa-save"></i>
          <span>保存报告</span>
        </button>
        <button class="action-button export" @click="exportReport">
          <i class="fas fa-file-export"></i>
          <span>导出报告</span>
        </button>
        <button class="action-button share" @click="shareReport">
          <i class="fas fa-share-alt"></i>
          <span>分享报告</span>
        </button>
      </div>

      <!-- 模板选择 -->
      <div class="template-select">
        <div class="template-label">报告模板：</div>
        <select v-model="selectedReportTemplate" class="template-select-input">
          <option v-for="template in reportTemplates"
                  :key="template.id"
                  :value="template.value">
            {{ template.name }}
          </option>
        </select>
      </div>

      <!-- 报告预览 -->
      <div class="report-preview">
        <div class="report-header">
          <h3>安全扫描报告</h3>
          <p>漏洞挖掘与验证系统生成</p>
        </div>

        <!-- 元数据 - 两列布局 -->
        <div class="report-metadata">
          <div class="metadata-column">
            <p><strong>报告日期:</strong> {{ currentDate }}</p>
            <p><strong>扫描类型:</strong> {{ scanType }}</p>
          </div>
          <div class="metadata-column">
            <p><strong>生成者:</strong> {{ reporterName }}</p>
            <p><strong>版本:</strong> 1.0.0</p>
          </div>
        </div>

        <!-- 漏洞统计卡片 - 优化宽度和间距 -->
        <div class="vulnerability-stats">
          <div class="stat-card critical">
            <div class="stat-title">严重漏洞</div>
            <div class="stat-value">{{ vulnCount.critical }}</div>
          </div>
          <div class="stat-card high">
            <div class="stat-title">高危漏洞</div>
            <div class="stat-value">{{ vulnCount.high }}</div>
          </div>
        </div>

        <!-- 扫描概要 -->
        <div class="report-section">
          <h4>扫描概要</h4>
          <div class="summary-detail">
            <p><strong>扫描目标:</strong> {{ scanTargets }}</p>
            <p><strong>扫描时间:</strong> {{ scanDuration }}秒</p>
            <p><strong>扫描工具:</strong> {{ scanTools }}</p>
            <p><strong>严重漏洞详情:</strong> {{ criticalVulnsDescription }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      selectedReportTemplate: 'standard',
      reporterName: '系统管理员',
      severityLabels: {
        critical: '严重',
        high: '高危',
        medium: '中危',
        low: '低危'
      }
    }
  },
  computed: {
    ...mapState(['reportTemplates', 'currentScan']),
    ...mapGetters(['scanDuration']),

    currentDate() {
      return new Date().toLocaleDateString()
    },

    scanType() {
      return this.currentScan.targets.length > 0 ? 'Web扫描' :
          this.currentScan.scanDepth > 0 ? '二进制扫描' : '未指定'
    },

    scanTargets() {
      return this.currentScan.targets.join(', ') || '未指定扫描目标'
    },

    scanTools() {
      return this.currentScan.selectedPlugins.join(', ') || '未指定扫描工具'
    },

    vulnCount() {
      const counts = {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0
      }

      this.currentScan.vulnerabilities.forEach(vuln => {
        if (vuln.severity) counts[vuln.severity]++
      })

      return counts
    },

    criticalVulnsDescription() {
      const criticalVulns = this.currentScan.vulnerabilities
          .filter(v => v.severity === 'critical')
          .map(v => v.name)

      return criticalVulns.length > 0
          ? criticalVulns.join('、')
          : '未发现严重漏洞'
    }
  },
  methods: {
    generateReport() {
      alert(`正在生成"${this.selectedReportTemplate}"报告...`)
    },
    saveReport() {
      alert('报告保存成功!')
    },
    exportReport() {
      alert('报告导出成功!')
    },
    shareReport() {
      alert('报告共享成功!')
    }
  }
}
</script>

<style scoped>
/* 卡片样式 */
.report-generator {
  background: #2d3748;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  width: 100%;
  max-width: 520px; /* 根据设计图优化宽度 */
}

.card-header {
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.card-header i {
  font-size: 1.3rem;
  color: #4299e1;
}

.card-header h2 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #f7fafc;
}

.card-body {
  padding: 20px;
}

/* 操作按钮区域 - 根据设计图优化布局 */
.report-actions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.action-button {
  padding: 12px 5px;
  border: none;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.85rem;
  text-align: center;
  min-height: 70px;
}

.action-button.generate {
  background: linear-gradient(135deg, rgba(66, 153, 225, 0.9), rgba(52, 128, 197, 0.9));
  color: white;
}

.action-button.save {
  background: linear-gradient(135deg, rgba(72, 187, 120, 0.9), rgba(54, 147, 98, 0.9));
  color: white;
}

.action-button.export {
  background: linear-gradient(135deg, rgba(101, 163, 245, 0.9), rgba(81, 131, 204, 0.9));
  color: white;
}

.action-button.share {
  background: linear-gradient(135deg, rgba(159, 122, 234, 0.9), rgba(128, 97, 194, 0.9));
  color: white;
}

.action-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.action-button i {
  font-size: 1.5rem;
  margin-bottom: 5px;
}

/* 模板选择 */
.template-select {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
}

.template-label {
  font-size: 0.95rem;
  color: #cbd5e0;
  white-space: nowrap;
}

.template-select-input {
  padding: 10px 15px;
  width: 100%;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #f7fafc;
  font-size: 0.95rem;
}

/* 报告预览 - 更紧凑的布局 */
.report-preview {
  background: rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  padding: 20px;
}

.report-header {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.report-header h3 {
  font-size: 1.5rem;
  margin-bottom: 8px;
  color: #f7fafc;
}

.report-header p {
  font-size: 0.95rem;
  color: #cbd5e0;
}

.report-metadata {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
}

.metadata-column p {
  margin: 8px 0;
  line-height: 1.5;
}

.vulnerability-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
}

.stat-card {
  padding: 15px 10px;
  border-radius: 8px;
  text-align: center;
  background: rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

.stat-card.critical {
  background: rgba(245, 101, 101, 0.15);
  border: 1px solid rgba(245, 101, 101, 0.3);
}

.stat-card.high {
  background: rgba(237, 137, 54, 0.15);
  border: 1px solid rgba(237, 137, 54, 0.3);
}

.stat-title {
  font-size: 1rem;
  margin-bottom: 5px;
  color: #f7fafc;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #f7fafc;
}

.report-section {
  margin-bottom: 15px;
  padding-bottom: 20px;
}

.report-section h4 {
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: #4299e1;
  padding-left: 10px;
  border-left: 3px solid #4299e1;
}

.summary-detail p {
  margin: 10px 0;
  color: #cbd5e0;
  font-size: 0.92rem;
  line-height: 1.5;
}

/* 背景星星点缀 */
.card-body {
  position: relative;
  overflow: hidden;
}

.card-body::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
      radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 2%),
      radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.15) 0%, transparent 2%),
      radial-gradient(circle at 70% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 2%),
      radial-gradient(circle at 90% 60%, rgba(255, 255, 255, 0.1) 0%, transparent 2%);
  pointer-events: none;
  z-index: 0;
}
</style>