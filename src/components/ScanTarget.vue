<template>
  <div class="scan-target card">
    <div class="card-header">
      <i class="fas fa-bullseye"></i>
      <h2>扫描目标配置</h2>
    </div>

    <div class="card-body">
      <!-- Web扫描配置 -->
      <div class="section">
        <div class="section-title">
          <i class="fas fa-globe-americas"></i>
          <span>Web扫描配置</span>
        </div>

        <div class="form-group">
          <label class="form-label">扫描目标</label>
          <div class="input-container">
            <input type="text" class="form-input" placeholder="输入URL地址 (支持多个URL，用逗号分隔)">
            <i class="fas fa-link"></i>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">扫描要求</label>
          <div class="input-container">
            <textarea class="form-textarea" rows="3" placeholder="输入您的扫描要求，如:检测SQL注入、XSS跨站脚本攻击等漏洞"></textarea>
            <i class="fas fa-edit"></i>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">选择插件</label>
          <div class="input-container">
            <select class="form-select">
              <option>SQL注入检测</option>
              <option>XSS跨站脚本检测</option>
              <option>文件包含检测</option>
              <option>命令注入检测</option>
            </select>
            <i class="fas fa-plug"></i>
          </div>
        </div>
      </div>

      <!-- 二进制扫描配置 -->
      <div class="section">
        <div class="section-title">
          <i class="fas fa-file-code"></i>
          <span>二进制扫描配置</span>
        </div>

        <div class="upload-area" @dragover.prevent @drop="handleDrop">
          <div class="upload-content">
            <i class="fas fa-cloud-upload-alt"></i>
            <p>将文件拖到此处，或点击上传</p>
            <p class="file-types">支持.exe、bin、dll等格式文件</p>
            <input type="file" class="file-input" @change="handleFileUpload">
          </div>
        </div>

        <div class="slider-section">
          <div class="slider-header">
            <label class="slider-label">扫描深度</label>
            <div class="slider-value">5</div>
          </div>
          <div class="slider-container">
            <button class="slider-btn" @click="decrementDepth">
              <i class="fas fa-minus"></i>
            </button>
            <input
                type="range"
                min="1"
                max="10"
                value="5"
                class="scan-slider"
                @input="updateDepth"
                ref="depthSlider">
            <button class="slider-btn" @click="incrementDepth">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>

      <button class="scan-button">
        <i class="fas fa-play"></i>
        开始扫描
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleDrop(e) {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length) {
        console.log('上传文件:', files[0]);
      }
    },
    handleFileUpload(e) {
      const files = e.target.files;
      if (files.length) {
        console.log('上传文件:', files[0]);
      }
    },
    incrementDepth() {
      const slider = this.$refs.depthSlider;
      const newValue = Math.min(parseInt(slider.value) + 1, 10);
      slider.value = newValue;
      this.updateDepth();
    },
    decrementDepth() {
      const slider = this.$refs.depthSlider;
      const newValue = Math.max(parseInt(slider.value) - 1, 1);
      slider.value = newValue;
      this.updateDepth();
    },
    updateDepth(e) {
      const value = e ? e.target.value : this.$refs.depthSlider.value;
      const valueElement = this.$el.querySelector('.slider-value');
      if (valueElement) valueElement.textContent = value;
    }
  }
}
</script>

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
  color: var(--info);
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
  margin-bottom: 30px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--info);
}

.section-title i {
  font-size: 1.2rem;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 10px;
  color: var(--text-primary);
  font-weight: 500;
}

.input-container {
  position: relative;
}

.form-input, .form-textarea, .form-select {
  width: 100%;
  padding: 14px 16px 14px 45px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--text-primary);
  font-size: 1rem;
  transition: var(--transition);
  outline: none;
}

.input-container i {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--info);
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

.form-input:focus, .form-textarea:focus, .form-select:focus {
  border-color: var(--info);
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.25);
}

.upload-area {
  border: 2px dashed var(--border);
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  cursor: pointer;
  transition: var(--transition);
  background: rgba(0, 0, 0, 0.15);
}

.upload-area:hover {
  border-color: var(--info);
  background: rgba(66, 153, 225, 0.1);
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.upload-content i {
  font-size: 3rem;
  color: var(--info);
}

.file-types {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-top: 10px;
}

.file-input {
  display: none;
}

.slider-section {
  margin-top: 25px;
}

.slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.slider-label {
  font-weight: 500;
  color: var(--text-primary);
}

.slider-value {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--info);
  min-width: 30px;
  text-align: center;
}

.slider-container {
  display: flex;
  align-items: center;
  gap: 15px;
}

.slider-btn {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: var(--info);
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  transition: var(--transition);
}

.slider-btn:hover {
  background: var(--primary);
  transform: scale(1.05);
}

.scan-slider {
  flex-grow: 1;
  -webkit-appearance: none;
  height: 8px;
  border-radius: 5px;
  background: linear-gradient(to right, var(--info), var(--primary));
  outline: none;
}

.scan-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(66, 153, 225, 0.8);
}

.scan-button {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--primary), var(--info));
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.scan-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(66, 153, 225, 0.3);
}
</style>