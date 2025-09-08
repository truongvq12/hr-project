<template>
  <div class="cv-analysis">
    <div class="page-header">
      <h1>Phân tích CV</h1>
      <p>Upload và phân tích CV ứng viên để trích xuất thông tin</p>
    </div>

    <div class="analysis-content">
      <!-- Upload Section -->
      <div class="upload-section">
        <div class="upload-card">
          <h3>Upload CV</h3>
          <div class="upload-area" @click="triggerFileUpload" @dragover.prevent @drop="handleDrop">
            <input
              ref="fileInput"
              type="file"
              accept=".pdf,.doc,.docx"
              @change="handleFileUpload"
              style="display: none"
            />
            <div v-if="!uploadedFile" class="upload-placeholder">
              <div class="upload-icon">☁️</div>
              <p>Kéo thả file CV hoặc <span class="click-link">click để chọn</span></p>
              <small>Hỗ trợ PDF, DOCX (tối đa 10MB)</small>
              <button class="btn btn-primary upload-btn">Chọn file</button>
            </div>
            <div v-else class="file-preview">
              <div class="file-info">
                <div class="file-icon">📄</div>
                <div class="file-details">
                  <h4>{{ uploadedFile.name }}</h4>
                  <p>{{ formatFileSize(uploadedFile.size) }}</p>
                </div>
                <button @click.stop="removeFile" class="remove-btn">×</button>
              </div>
              <div v-if="isPDF" class="pdf-viewer">
                <iframe :src="pdfUrl" width="100%" height="400px"></iframe>
              </div>
              <div class="upload-actions">
                <button 
                  @click.stop="analyzeCurrentFile" 
                  class="btn btn-primary analyze-btn"
                  :disabled="isAnalyzing"
                >
                  <span v-if="isAnalyzing">🔄 Đang phân tích...</span>
                  <span v-else>📊 Phân tích CV</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Analysis Results Section -->
      <div class="analysis-results">
        <div class="results-card">
          <div v-if="!analysisResult" class="no-results">
            <div class="no-results-icon">🔍</div>
            <h3>Chưa có kết quả phân tích</h3>
            <p>Upload CV để bắt đầu phân tích và trích xuất thông tin</p>
          </div>
          <div v-else class="analysis-result">
            <h3>Kết quả phân tích</h3>
            <div class="result-content">
              <div class="candidate-summary">
                <div class="candidate-avatar">{{ analysisResult.name.charAt(0) }}</div>
                <div class="candidate-info">
                  <h4>{{ analysisResult.name }}</h4>
                  <p>{{ analysisResult.position }}</p>
                  <div class="match-score" :class="`match-score--${analysisResult.matchLevel}`">
                    Độ phù hợp: {{ analysisResult.matchScore }}%
                  </div>
                </div>
              </div>
              <div class="extracted-info">
                <div class="info-section">
                  <h4>Thông tin cá nhân</h4>
                  <div class="info-grid">
                    <div class="info-item">
                      <span class="label">Email:</span>
                      <span class="value">{{ analysisResult.email }}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">Số điện thoại:</span>
                      <span class="value">{{ analysisResult.phone }}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">Địa chỉ:</span>
                      <span class="value">{{ analysisResult.location }}</span>
                    </div>
                  </div>
                </div>
                <div class="info-section">
                  <h4>Kinh nghiệm</h4>
                  <p>{{ analysisResult.experience }}</p>
                </div>
                <div class="info-section">
                  <h4>Kỹ năng</h4>
                  <div class="skills-list">
                    <span v-for="skill in analysisResult.skills" :key="skill" class="skill-tag">
                      {{ skill }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const fileInput = ref<HTMLInputElement>()
const uploadedFile = ref<File | null>(null)
const analysisResult = ref<any>(null)
const isAnalyzing = ref(false)

const isPDF = computed(() => {
  return uploadedFile.value?.type === 'application/pdf'
})

const pdfUrl = computed(() => {
  if (uploadedFile.value && isPDF.value) {
    return URL.createObjectURL(uploadedFile.value)
  }
  return ''
})

const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    uploadedFile.value = file
    analysisResult.value = null // Reset analysis result
  }
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  const files = event.dataTransfer?.files
  if (files && files.length > 0) {
    const file = files[0]
    if (file.type === 'application/pdf' || file.type.includes('document')) {
      uploadedFile.value = file
      analysisResult.value = null // Reset analysis result
    }
  }
}

const removeFile = () => {
  uploadedFile.value = null
  analysisResult.value = null
  isAnalyzing.value = false
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const analyzeCurrentFile = () => {
  if (uploadedFile.value) {
    isAnalyzing.value = true
    analyzeCV(uploadedFile.value)
  }
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const analyzeCV = (file: File) => {
  // Simulate CV analysis with loading state
  setTimeout(() => {
    const mockResults = [
      {
        name: 'Nguyễn Văn An',
        position: 'Senior Frontend Developer',
        email: 'an.nguyen@email.com',
        phone: '0123 456 789',
        location: 'Hồ Chí Minh',
        matchScore: 92,
        matchLevel: 'high',
        experience: '5 năm kinh nghiệm phát triển web với React, Vue.js và TypeScript',
        skills: ['React', 'Vue.js', 'TypeScript', 'Node.js', 'MongoDB', 'AWS']
      },
      {
        name: 'Trần Thị Bình',
        position: 'Product Manager',
        email: 'binh.tran@email.com',
        phone: '0987 654 321',
        location: 'Hà Nội',
        matchScore: 87,
        matchLevel: 'high',
        experience: '4 năm kinh nghiệm quản lý sản phẩm và phát triển chiến lược',
        skills: ['Product Strategy', 'Agile', 'User Research', 'Analytics', 'Figma']
      },
      {
        name: 'Lê Hoàng Cường',
        position: 'DevOps Engineer',
        email: 'cuong.le@email.com',
        phone: '0456 789 123',
        location: 'Đà Nẵng',
        matchScore: 76,
        matchLevel: 'medium',
        experience: '3 năm kinh nghiệm DevOps và quản lý infrastructure',
        skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Linux']
      }
    ]
    
    // Randomly select a result for demo
    const randomIndex = Math.floor(Math.random() * mockResults.length)
    analysisResult.value = mockResults[randomIndex]
    isAnalyzing.value = false
  }, 3000) // 3 seconds loading simulation
}
</script>

<style scoped>
.cv-analysis {
  padding: 0;
}

.page-header {
  margin-bottom: 2rem;
}

.page-header h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 2rem;
}

.page-header p {
  color: #666;
  margin: 0;
  font-size: 1.1rem;
}

.analysis-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  height: calc(100vh - 200px);
}

.upload-section {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
}

.upload-card h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.upload-area {
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 300px;
}

.upload-area:hover {
  border-color: #007bff;
  background-color: #f8f9fa;
}

.upload-placeholder {
  color: #666;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.upload-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.click-link {
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
}

.upload-btn {
  margin-top: 1rem;
}

.file-preview {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.file-icon {
  font-size: 2rem;
}

.file-details h4 {
  margin: 0 0 0.25rem 0;
  color: #2c3e50;
  font-size: 1rem;
}

.file-details p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.remove-btn {
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: auto;
}

.pdf-viewer {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
}

.upload-actions {
  margin-top: 1rem;
  text-align: center;
}

.analyze-btn {
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  min-width: 150px;
}

.analyze-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
  opacity: 0.7;
}

.analyze-btn:disabled:hover {
  background-color: #6c757d;
  transform: none;
}

.analysis-results {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
}

.results-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.no-results {
  text-align: center;
  color: #666;
  padding: 2rem;
}

.no-results-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.no-results h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.analysis-result h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.candidate-summary {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 6px;
}

.candidate-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
}

.candidate-info h4 {
  color: #2c3e50;
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
}

.candidate-info p {
  color: #666;
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
}

.match-score {
  font-weight: 500;
  font-size: 0.9rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
}

.match-score--high {
  background-color: #d4edda;
  color: #155724;
}

.match-score--medium {
  background-color: #fff3cd;
  color: #856404;
}

.match-score--low {
  background-color: #f8d7da;
  color: #721c24;
}

.extracted-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-section h4 {
  color: #2c3e50;
  margin-bottom: 0.75rem;
  font-size: 1rem;
}

.info-grid {
  display: grid;
  gap: 0.5rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-item:last-child {
  border-bottom: none;
}

.label {
  color: #666;
  font-weight: 500;
  font-size: 0.9rem;
}

.value {
  color: #2c3e50;
  font-size: 0.9rem;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  background-color: #e9ecef;
  color: #495057;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
  font-weight: 500;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .analysis-content {
    grid-template-columns: 1fr;
    height: auto;
  }
  
  .upload-area {
    min-height: 200px;
  }
  
  .candidate-summary {
    flex-direction: column;
    text-align: center;
  }
}
</style>
