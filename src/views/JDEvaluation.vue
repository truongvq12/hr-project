<template>
  <div class="jd-evaluation">
    <div class="page-header">
      <h1>Đánh giá JD</h1>
      <p>Danh sách các JD đã tạo và ứng viên phù hợp</p>
    </div>

    <!-- Summary Cards -->
    <div class="summary-cards">
      <div class="summary-card">
        <div class="card-icon blue">📋</div>
        <div class="card-content">
          <h3>Đang tuyển</h3>
          <div class="card-value">{{ activeJobs }}</div>
        </div>
      </div>
      <div class="summary-card">
        <div class="card-icon orange">⏸️</div>
        <div class="card-content">
          <h3>Tạm dừng</h3>
          <div class="card-value">{{ pausedJobs }}</div>
        </div>
      </div>
      <div class="summary-card">
        <div class="card-icon black">🔒</div>
        <div class="card-content">
          <h3>Đã đóng</h3>
          <div class="card-value">{{ closedJobs }}</div>
        </div>
      </div>
      <div class="summary-card">
        <div class="card-icon green">👥</div>
        <div class="card-content">
          <h3>Ứng viên phù hợp</h3>
          <div class="card-value">{{ totalSuitableCandidates }}</div>
        </div>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="search-section">
      <div class="search-bar">
        <input
          v-model="searchQuery"
          type="text"
          class="search-input"
          placeholder="Tìm kiếm theo tên vị trí hoặc phòng ban..."
        />
        <button @click="searchJobs" class="btn btn-primary search-btn">
          🔍 Tìm kiếm
        </button>
      </div>
    </div>

    <!-- Job List -->
    <div class="job-list-section">
      <div class="section-header">
        <h3>Danh sách công việc</h3>
        <button @click="openCreateModal" class="btn btn-primary create-btn">
          ➕ Tạo JD mới
        </button>
      </div>
      
      <div class="job-grid">
        <div class="job-card" v-for="job in filteredJobs" :key="job.id">
          <div class="job-header">
            <h4 class="job-title">{{ job.position }}</h4>
            <div class="job-status" :class="`job-status--${job.status}`">
              {{ job.statusText }}
            </div>
          </div>
          
          <div class="job-meta">
            <span class="department">{{ job.department }}</span>
            <span class="location">{{ job.location }}</span>
          </div>
          
          <p class="job-description">{{ job.description }}</p>
          
          <div class="job-metrics">
            <div class="metric">
              <span class="metric-label">Tổng ứng viên</span>
              <span class="metric-value">{{ job.totalApplicants }}</span>
            </div>
            <div class="metric">
              <span class="metric-label">Phù hợp</span>
              <span class="metric-value suitable">{{ job.suitableApplicants }}</span>
            </div>
          </div>
          
          <div class="job-footer">
            <span class="job-date">{{ job.createdDate }}</span>
            <button @click="viewJobDetails(job)" class="view-details-btn">
              Xem chi tiết →
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Job Details Modal -->
    <div v-if="showJobDetailsModal" class="modal-overlay" @click="closeJobDetailsModal">
      <div class="modal-content job-details-modal" @click.stop>
        <div class="modal-header">
          <h3>{{ selectedJob?.position }}</h3>
          <button @click="closeJobDetailsModal" class="close-btn">×</button>
        </div>
        
        <div class="job-details-content">
          <!-- Job Info -->
          <div class="job-info-section">
            <div class="job-info-header">
              <div class="job-meta-info">
                <span class="department">{{ selectedJob?.department }}</span>
                <span class="location">{{ selectedJob?.location }}</span>
                <div class="job-status" :class="`job-status--${selectedJob?.status}`">
                  {{ selectedJob?.statusText }}
                </div>
              </div>
              <div class="job-metrics-summary">
                <div class="metric-item">
                  <span class="metric-label">Tổng ứng viên</span>
                  <span class="metric-value">{{ selectedJob?.totalApplicants }}</span>
                </div>
                <div class="metric-item">
                  <span class="metric-label">Phù hợp</span>
                  <span class="metric-value suitable">{{ selectedJob?.suitableApplicants }}</span>
                </div>
              </div>
            </div>
            
            <div class="job-description-section">
              <h4>Mô tả công việc</h4>
              <p>{{ selectedJob?.description }}</p>
            </div>
            
            <div class="job-requirements">
              <div class="requirement-item">
                <span class="requirement-label">Kinh nghiệm:</span>
                <span class="requirement-value">{{ selectedJob?.experience }}</span>
              </div>
              <div class="requirement-item">
                <span class="requirement-label">Mức lương:</span>
                <span class="requirement-value">{{ selectedJob?.salary }}</span>
              </div>
              <div class="requirement-item">
                <span class="requirement-label">Kỹ năng yêu cầu:</span>
                <div class="skills-list">
                  <span v-for="skill in selectedJob?.skills" :key="skill" class="skill-tag">
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Candidates List -->
          <div class="candidates-section">
            <h4>Ứng viên phù hợp ({{ selectedJob?.suitableApplicants }})</h4>
            <div class="candidates-list">
              <div v-for="candidate in selectedJobCandidates" :key="candidate.id" class="candidate-card">
                <div class="candidate-header">
                  <div class="candidate-avatar">{{ candidate.name.charAt(0) }}</div>
                  <div class="candidate-info">
                    <h5>{{ candidate.name }}</h5>
                    <p>{{ candidate.position }}</p>
                    <div class="candidate-location">{{ candidate.location }}</div>
                  </div>
                  <div class="match-score" :class="`match-score--${candidate.matchLevel}`">
                    {{ candidate.matchScore }}%
                  </div>
                </div>
                
                <div class="candidate-details">
                  <div class="candidate-skills">
                    <span v-for="skill in candidate.skills.slice(0, 4)" :key="skill" class="skill-tag small">
                      {{ skill }}
                    </span>
                    <span v-if="candidate.skills.length > 4" class="more-skills">
                      +{{ candidate.skills.length - 4 }} khác
                    </span>
                  </div>
                  
                  <div class="candidate-meta">
                    <span class="meta-item">
                      <span class="meta-icon">💼</span>
                      {{ candidate.experience }}
                    </span>
                    <span class="meta-item">
                      <span class="meta-icon">📧</span>
                      {{ candidate.email }}
                    </span>
                    <span class="meta-item">
                      <span class="meta-icon">📅</span>
                      {{ candidate.appliedDate }}
                    </span>
                  </div>
                </div>
                
                <div class="candidate-actions">
                  <button class="btn btn-primary btn-sm">Xem CV</button>
                  <button class="btn btn-secondary btn-sm">Liên hệ</button>
                  <button class="btn btn-success btn-sm">Chọn</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Job Modal -->
    <div v-if="showCreateModal" class="modal-overlay" @click="closeCreateModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Tạo JD mới</h3>
          <button @click="closeCreateModal" class="close-btn">×</button>
        </div>
        
        <form @submit.prevent="createJD" class="modal-form">
          <div class="form-group">
            <label class="form-label">Tên vị trí *</label>
            <input
              v-model="newJD.position"
              type="text"
              class="form-control"
              placeholder="Ví dụ: Senior Frontend Developer"
              required
            />
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Phòng ban *</label>
              <select v-model="newJD.department" class="form-control" required>
                <option value="">Chọn phòng ban</option>
                <option value="Công nghệ">Công nghệ</option>
                <option value="Marketing">Marketing</option>
                <option value="Dữ liệu">Dữ liệu</option>
                <option value="Nhân sự">Nhân sự</option>
                <option value="Kế toán">Kế toán</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Địa điểm *</label>
              <select v-model="newJD.location" class="form-control" required>
                <option value="">Chọn địa điểm</option>
                <option value="Tp. Hồ Chí Minh">Tp. Hồ Chí Minh</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="Cần Thơ">Cần Thơ</option>
              </select>
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Mô tả công việc *</label>
            <textarea
              v-model="newJD.description"
              class="form-control"
              rows="4"
              placeholder="Mô tả chi tiết về công việc..."
              required
            ></textarea>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Kinh nghiệm tối thiểu</label>
              <select v-model="newJD.experience" class="form-control">
                <option value="">Chọn kinh nghiệm</option>
                <option value="0-1">0-1 năm</option>
                <option value="1-2">1-2 năm</option>
                <option value="2-3">2-3 năm</option>
                <option value="3-5">3-5 năm</option>
                <option value="5+">5+ năm</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Mức lương</label>
              <input
                v-model="newJD.salary"
                type="text"
                class="form-control"
                placeholder="Ví dụ: 15-25 triệu"
              />
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Yêu cầu kỹ năng</label>
            <input
              v-model="newJD.skills"
              type="text"
              class="form-control"
              placeholder="Ví dụ: React, Vue.js, TypeScript"
            />
          </div>
          
          <div class="modal-actions">
            <button type="button" @click="closeCreateModal" class="btn btn-secondary">
              Hủy
            </button>
            <button type="submit" class="btn btn-primary">
              Tạo JD
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

const searchQuery = ref('')
const showCreateModal = ref(false)
const showJobDetailsModal = ref(false)
const selectedJob = ref<any>(null)

const newJD = reactive({
  position: '',
  department: '',
  location: '',
  description: '',
  skills: '',
  experience: '',
  salary: ''
})

const jobs = ref([
  {
    id: 1,
    position: 'Senior Frontend Developer',
    department: 'Công nghệ',
    location: 'Tp. Hồ Chí Minh',
    description: 'Chúng tôi đang tìm kiếm một Senior Frontend Developer có kinh nghiệm để gia nhập đội ngũ phát triển sản phẩm của chúng tôi. Ứng viên cần có kinh nghiệm với React, Vue.js và TypeScript...',
    skills: ['React', 'Vue.js', 'TypeScript', 'Node.js'],
    experience: '3-5 năm',
    salary: '20-30 triệu',
    totalApplicants: 45,
    suitableApplicants: 12,
    status: 'active',
    statusText: 'Đang tuyển',
    createdDate: '15/1/2024'
  },
  {
    id: 2,
    position: 'Marketing Manager',
    department: 'Marketing',
    location: 'Hà Nội',
    description: 'Tìm kiếm Marketing Manager để phát triển và thực hiện các chiến lược marketing, quản lý team và đạt được các mục tiêu kinh doanh.',
    skills: ['Marketing Strategy', 'Team Management', 'Analytics'],
    experience: '2-3 năm',
    salary: '25-35 triệu',
    totalApplicants: 32,
    suitableApplicants: 8,
    status: 'active',
    statusText: 'Đang tuyển',
    createdDate: '10/1/2024'
  },
  {
    id: 3,
    position: 'Data Analyst',
    department: 'Dữ liệu',
    location: 'Đà Nẵng',
    description: 'Vị trí Data Analyst để phân tích dữ liệu và hỗ trợ ra quyết định kinh doanh. Cần có kỹ năng mạnh về SQL, Python và visualization.',
    skills: ['SQL', 'Python', 'Data Visualization'],
    experience: '2-4 năm',
    salary: '18-28 triệu',
    totalApplicants: 28,
    suitableApplicants: 15,
    status: 'paused',
    statusText: 'Tạm dừng',
    createdDate: '5/1/2024'
  }
])

const activeJobs = computed(() => 
  jobs.value.filter(job => job.status === 'active').length
)

const pausedJobs = computed(() => 
  jobs.value.filter(job => job.status === 'paused').length
)

const closedJobs = computed(() => 
  jobs.value.filter(job => job.status === 'closed').length
)

const totalSuitableCandidates = computed(() => 
  jobs.value.reduce((total, job) => total + job.suitableApplicants, 0)
)

const filteredJobs = computed(() => {
  if (!searchQuery.value) return jobs.value
  
  return jobs.value.filter(job => 
    job.position.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    job.department.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const openCreateModal = () => {
  showCreateModal.value = true
}

const closeCreateModal = () => {
  showCreateModal.value = false
  // Reset form
  Object.assign(newJD, {
    position: '',
    department: '',
    location: '',
    description: '',
    skills: '',
    experience: '',
    salary: ''
  })
}

const createJD = () => {
  const skills = newJD.skills ? newJD.skills.split(',').map(s => s.trim()) : []
  
  const newJob = {
    id: Date.now(),
    position: newJD.position,
    department: newJD.department,
    location: newJD.location,
    description: newJD.description,
    skills: skills,
    experience: newJD.experience,
    salary: newJD.salary,
    totalApplicants: 0,
    suitableApplicants: 0,
    status: 'active',
    statusText: 'Đang tuyển',
    createdDate: new Date().toLocaleDateString('vi-VN')
  }
  
  jobs.value.unshift(newJob)
  closeCreateModal()
}

const searchJobs = () => {
  // Search is handled by computed property
}

const viewJobDetails = (job: any) => {
  selectedJob.value = job
  showJobDetailsModal.value = true
}

const closeJobDetailsModal = () => {
  showJobDetailsModal.value = false
  selectedJob.value = null
}

const selectedJobCandidates = computed(() => {
  if (!selectedJob.value) return []
  
  // Mock candidates data based on job
  const mockCandidates = [
    {
      id: 1,
      name: 'Nguyễn Văn An',
      position: 'Senior Frontend Developer',
      location: 'Hồ Chí Minh',
      email: 'an.nguyen@email.com',
      experience: '5 năm',
      matchScore: 92,
      matchLevel: 'high',
      skills: ['React', 'Vue.js', 'TypeScript', 'Node.js', 'MongoDB'],
      appliedDate: '2 ngày trước'
    },
    {
      id: 2,
      name: 'Trần Thị Bình',
      position: 'Frontend Developer',
      location: 'Hà Nội',
      email: 'binh.tran@email.com',
      experience: '3 năm',
      matchScore: 87,
      matchLevel: 'high',
      skills: ['React', 'JavaScript', 'CSS', 'HTML'],
      appliedDate: '3 ngày trước'
    },
    {
      id: 3,
      name: 'Lê Hoàng Cường',
      position: 'Full Stack Developer',
      location: 'Đà Nẵng',
      email: 'cuong.le@email.com',
      experience: '4 năm',
      matchScore: 78,
      matchLevel: 'medium',
      skills: ['Vue.js', 'Node.js', 'MongoDB', 'Express'],
      appliedDate: '1 tuần trước'
    },
    {
      id: 4,
      name: 'Phạm Thị Dung',
      position: 'UI/UX Developer',
      location: 'Hồ Chí Minh',
      email: 'dung.pham@email.com',
      experience: '2 năm',
      matchScore: 65,
      matchLevel: 'medium',
      skills: ['React', 'Figma', 'CSS', 'JavaScript'],
      appliedDate: '1 tuần trước'
    }
  ]
  
  // Return candidates based on job position
  if (selectedJob.value.position.includes('Frontend')) {
    return mockCandidates.filter(c => 
      c.position.includes('Frontend') || c.position.includes('UI/UX')
    )
  } else if (selectedJob.value.position.includes('Marketing')) {
    return mockCandidates.filter(c => 
      c.position.includes('Marketing') || c.position.includes('Manager')
    )
  } else if (selectedJob.value.position.includes('Data')) {
    return mockCandidates.filter(c => 
      c.position.includes('Data') || c.position.includes('Analyst')
    )
  }
  
  return mockCandidates.slice(0, 3)
})
</script>

<style scoped>
.jd-evaluation {
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

/* Summary Cards */
.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.summary-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card-icon {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.card-icon.blue {
  background-color: #e3f2fd;
  color: #1976d2;
}

.card-icon.orange {
  background-color: #fff3e0;
  color: #f57c00;
}

.card-icon.black {
  background-color: #f5f5f5;
  color: #424242;
}

.card-icon.green {
  background-color: #e8f5e8;
  color: #388e3c;
}

.card-content h3 {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
  font-weight: 500;
}

.card-value {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
}

/* Search Section */
.search-section {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.search-bar {
  display: flex;
  gap: 1rem;
}

.search-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
}

.search-btn {
  padding: 0.75rem 1.5rem;
  font-weight: 500;
}

/* Job List Section */
.job-list-section {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h3 {
  color: #2c3e50;
  margin: 0;
  font-size: 1.2rem;
}

.create-btn {
  padding: 0.75rem 1.5rem;
  font-weight: 500;
}

.job-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.job-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.job-card:hover {
  border-color: #007bff;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.job-title {
  color: #2c3e50;
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.job-status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.job-status--active {
  background-color: #d4edda;
  color: #155724;
}

.job-status--paused {
  background-color: #fff3cd;
  color: #856404;
}

.job-status--closed {
  background-color: #f8d7da;
  color: #721c24;
}

.job-meta {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.department {
  font-weight: 500;
}

.location {
  color: #999;
}

.job-description {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
  font-size: 0.9rem;
}

.job-metrics {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.metric-label {
  font-size: 0.8rem;
  color: #666;
}

.metric-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
}

.metric-value.suitable {
  background-color: #e8f5e8;
  color: #388e3c;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
}

.job-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
}

.job-date {
  font-size: 0.8rem;
  color: #999;
}

.view-details-btn {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s;
}

.view-details-btn:hover {
  color: #0056b3;
  text-decoration: underline;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.job-details-modal {
  max-width: 1000px;
  width: 95%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
}

.modal-header h3 {
  color: #2c3e50;
  margin: 0;
  font-size: 1.2rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #000;
}

.modal-form {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2c3e50;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-control:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
}

/* Job Details Modal Styles */
.job-details-content {
  padding: 1.5rem;
  max-height: 80vh;
  overflow-y: auto;
}

.job-info-section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e9ecef;
}

.job-info-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.job-meta-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.job-meta-info .department {
  font-weight: 600;
  color: #2c3e50;
  font-size: 1rem;
}

.job-meta-info .location {
  color: #666;
  font-size: 0.9rem;
}

.job-metrics-summary {
  display: flex;
  gap: 1.5rem;
}

.metric-item {
  text-align: center;
}

.metric-item .metric-label {
  display: block;
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.metric-item .metric-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
}

.job-description-section h4 {
  color: #2c3e50;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}

.job-description-section p {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.job-requirements {
  margin-top: 1.5rem;
}

.requirement-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
}

.requirement-label {
  font-weight: 500;
  color: #2c3e50;
  min-width: 120px;
}

.requirement-value {
  color: #666;
  flex: 1;
}

/* Candidates Section */
.candidates-section h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.candidates-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.candidate-card {
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1rem;
  transition: all 0.3s ease;
}

.candidate-card:hover {
  border-color: #007bff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.candidate-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
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

.candidate-info {
  flex: 1;
}

.candidate-info h5 {
  color: #2c3e50;
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
}

.candidate-info p {
  color: #666;
  margin: 0 0 0.25rem 0;
  font-size: 0.9rem;
}

.candidate-location {
  color: #999;
  font-size: 0.8rem;
}

.match-score {
  font-weight: bold;
  font-size: 1.1rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
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

.candidate-details {
  margin-bottom: 1rem;
}

.candidate-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.skill-tag.small {
  font-size: 0.75rem;
  padding: 0.2rem 0.4rem;
}

.more-skills {
  color: #666;
  font-size: 0.75rem;
  font-style: italic;
}

.candidate-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  color: #666;
}

.meta-icon {
  font-size: 0.9rem;
}

.candidate-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #1e7e34;
  transform: translateY(-1px);
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
  transform: translateY(-1px);
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}

@media (max-width: 768px) {
  .summary-cards {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .search-bar {
    flex-direction: column;
  }
  
  .job-grid {
    grid-template-columns: 1fr;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .job-details-modal {
    width: 98%;
    max-width: none;
  }
  
  .job-info-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .job-metrics-summary {
    justify-content: center;
  }
  
  .candidate-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .candidate-actions {
    justify-content: center;
  }
  
  .candidate-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
