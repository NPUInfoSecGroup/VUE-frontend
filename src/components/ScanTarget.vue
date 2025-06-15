<template>
  <div class="scan-target card">
    <div class="card-header">
      <i class="fas fa-bullseye" />
      <h2>扫描目标配置</h2>
    </div>

    <div class="card-body">
      <!-- Web扫描配置 -->
      <div class="section">
        <div class="section-title">
          <i class="fas fa-globe-americas" />
          <span>Web扫描配置</span>
        </div>

        <div class="form-group">
          <label class="form-label" for="url">目标 URL：</label>
          <input id="url" v-model="targetUrl" type="text" placeholder="https://example.com" class="form-input" />
        </div>

        <div class="form-group">
          <label class="form-label" for="depth">扫描深度：</label>
          <select id="depth" v-model="scanDepth" class="form-select">
            <option value="1">1 层</option>
            <option value="2">2 层</option>
            <option value="3">3 层</option>
            <option value="4">4 层</option>
          </select>
        </div>
      </div>

      <!-- 网络扫描配置 -->
      <div class="section">
        <div class="section-title">
          <i class="fas fa-network-wired" />
          <span>网络扫描配置</span>
        </div>

        <div class="form-group">
          <label class="form-label" for="ipRange">IP 范围：</label>
          <input id="ipRange" v-model="ipRange" type="text" placeholder="192.168.1.1-192.168.1.255" class="form-input" />
        </div>

        <div class="form-group">
          <label class="form-label" for="ports">端口：</label>
          <input id="ports" v-model="ports" type="text" placeholder="80,443,8080" class="form-input" />
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="actions">
        <button class="primary" @click="startScan">
          <i class="fas fa-play" />
          开始扫描
        </button>
        <button class="secondary" @click="resetForm">
          <i class="fas fa-redo" />
          重置
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScanTarget',
  data () {
    return {
      targetUrl: '',
      scanDepth: 1,
      ipRange: '',
      ports: ''
    }
  },
  methods: {
    startScan () {
      // TODO: 执行扫描逻辑
      console.log('开始扫描', this.targetUrl)
    },
    resetForm () {
      this.targetUrl = ''
      this.scanDepth = 1
      this.ipRange = ''
      this.ports = ''
    }
  }
}
</script>

<style scoped>
.scan-target {
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

.section {
  margin-bottom: 28px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 16px;
}

.form-group {
  margin-bottom: 18px;
}

.form-label {
  display: block;
  margin-bottom: 10px;
  color: var(--text-primary);
  font-weight: 500;
}

.form-input,
.form-select {
  width: 100%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px 12px;
  color: var(--text-primary);
}

.actions {
  display: flex;
  gap: 16px;
  margin-top: 10px;
}

.actions .primary,
.actions .secondary {
  flex: 1;
  padding: 12px 0;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}

.actions .primary {
  background: var(--accent);
  color: #1a202c;
}

.actions .secondary {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--border);
}

.actions button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}
</style>
