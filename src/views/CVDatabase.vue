<template>
  <div class="cv-database">
    <div class="page-header">
      <h1>Cơ sở dữ liệu CV</h1>
      <p>Quản lý và tìm kiếm CV ứng viên</p>
    </div>

    <div class="database-content">
      <!-- Search and Filters -->
      <div class="search-section">
        <div class="search-bar">
          <div class="search-input">
            <span class="search-icon">🔍</span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Tìm kiếm theo tên, vị trí, kỹ năng..."
              class="form-control"
            />
          </div>
          <button class="btn btn-primary" @click="searchCVs">Tìm kiếm</button>
        </div>
        
        <div class="filters">
          <select v-model="selectedExperience" class="form-control">
            <option value="">Tất cả kinh nghiệm</option>
            <option value="0-1">0-1 năm</option>
            <option value="1-2">1-2 năm</option>
            <option value="2-3">2-3 năm</option>
            <option value="3-5">3-5 năm</option>
            <option value="5+">5+ năm</option>
          </select>
          
          <select v-model="selectedSkills" class="form-control">
            <option value="">Tất cả kỹ năng</option>
            <option value="react">React</option>
            <option value="vue">Vue.js</option>
            <option value="angular">Angular</option>
            <option value="nodejs">Node.js</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
          
          <select v-model="selectedMatch" class="form-control">
            <option value="">Tất cả độ phù hợp</option>
            <option value="high">Cao (80%+)</option>
            <option value="medium">Trung bình (60-80%)</option>
            <option value="low">Thấp (<60%)</option>
          </select>
        </div>
      </div>

      <!-- CV List -->
      <div class="cv-list-section">
        <div class="list-header">
          <h3>Danh sách CV ({{ filteredCVs.length }} kết quả)</h3>
          <div class="view-options">
            <button
              class="view-btn"
              :class="{ active: viewMode === 'grid' }"
              @click="viewMode = 'grid'"
            >
              📊
            </button>
            <button
              class="view-btn"
              :class="{ active: viewMode === 'list' }"
              @click="viewMode = 'list'"
            >
              📋
            </button>
          </div>
        </div>

        <div class="cv-container" :class="`cv-container--${viewMode}`">
          <div
            v-for="cv in filteredCVs"
            :key="cv.id"
            class="cv-card"
            @click="selectCV(cv)"
          >
            <div class="cv-header">
              <div class="candidate-info">
                <div class="candidate-avatar">{{ cv.name.charAt(0) }}</div>
                <div class="candidate-details">
                  <h4 class="candidate-name">{{ cv.name }}</h4>
                  <p class="candidate-position">{{ cv.position }}</p>
                  <p class="candidate-location">{{ cv.location }}</p>
                </div>
              </div>
              <div class="cv-actions">
                <div class="match-score" :class="`match-score--${cv.matchLevel}`">
                  {{ cv.matchScore }}%
                </div>
                <button class="action-btn" @click.stop="downloadCV(cv)">
                  ⬇️
                </button>
                <button class="action-btn" @click.stop="viewCV(cv)">
                  👁️
                </button>
              </div>
            </div>
            
            <div class="cv-content">
              <div class="cv-experience">
                <span class="label">Kinh nghiệm:</span>
                <span class="value">{{ cv.experience }}</span>
              </div>
              
              <div class="cv-skills">
                <span class="label">Kỹ năng:</span>
                <div class="skills-list">
                  <span
                    v-for="skill in cv.skills.slice(0, 4)"
                    :key="skill"
                    class="skill-tag"
                  >
                    {{ skill }}
                  </span>
                  <span v-if="cv.skills.length > 4" class="more-skills">
                    +{{ cv.skills.length - 4 }} khác
                  </span>
                </div>
              </div>
              
              <div class="cv-meta">
                <span class="meta-item">
                  <span class="meta-icon">📅</span>
                  {{ cv.uploadedAt }}
                </span>
                <span class="meta-item">
                  <span class="meta-icon">📄</span>
                  {{ cv.fileType }}
                </span>
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

const searchQuery = ref('')
const selectedExperience = ref('')
const selectedSkills = ref('')
const selectedMatch = ref('')
const viewMode = ref<'grid' | 'list'>('grid')

const cvs = ref([
  {
    id: 1,
    name: 'Nguyễn Văn An',
    position: 'Senior Frontend Developer',
    location: 'Hồ Chí Minh',
    experience: '5 năm',
    skills: ['React', 'Vue.js', 'TypeScript', 'Node.js', 'MongoDB'],
    matchScore: 92,
    matchLevel: 'high',
    uploadedAt: '2 ngày trước',
    fileType: 'PDF'
  },
  {
    id: 2,
    name: 'Trần Thị Bình',
    position: 'Product Manager',
    location: 'Hà Nội',
    experience: '4 năm',
    skills: ['Product Strategy', 'Agile', 'User Research', 'Analytics'],
    matchScore: 87,
    matchLevel: 'high',
    uploadedAt: '3 ngày trước',
    fileType: 'DOCX'
  },
  {
    id: 3,
    name: 'Lê Hoàng Cường',
    position: 'DevOps Engineer',
    location: 'Đà Nẵng',
    experience: '3 năm',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    matchScore: 76,
    matchLevel: 'medium',
    uploadedAt: '1 tuần trước',
    fileType: 'PDF'
  },
  {
    id: 4,
    name: 'Phạm Thị Dung',
    position: 'UX Designer',
    location: 'Hồ Chí Minh',
    experience: '2 năm',
    skills: ['Figma', 'Sketch', 'Adobe XD', 'User Research'],
    matchScore: 65,
    matchLevel: 'medium',
    uploadedAt: '1 tuần trước',
    fileType: 'PDF'
  },
  {
    id: 5,
    name: 'Hoàng Văn Em',
    position: 'Backend Developer',
    location: 'Hà Nội',
    experience: '1 năm',
    skills: ['Java', 'Spring Boot', 'MySQL', 'Redis'],
    matchScore: 45,
    matchLevel: 'low',
    uploadedAt: '2 tuần trước',
    fileType: 'DOCX'
  }
])

const filteredCVs = computed(() => {
  return cvs.value.filter(cv => {
    const matchesSearch = !searchQuery.value || 
      cv.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      cv.position.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      cv.skills.some(skill => skill.toLowerCase().includes(searchQuery.value.toLowerCase()))
    
    const matchesExperience = !selectedExperience.value || cv.experience.includes(selectedExperience.value)
    
    const matchesSkills = !selectedSkills.value || 
      cv.skills.some(skill => skill.toLowerCase().includes(selectedSkills.value.toLowerCase()))
    
    const matchesMatch = !selectedMatch.value || 
      (selectedMatch.value === 'high' && cv.matchScore >= 80) ||
      (selectedMatch.value === 'medium' && cv.matchScore >= 60 && cv.matchScore < 80) ||
      (selectedMatch.value === 'low' && cv.matchScore < 60)
    
    return matchesSearch && matchesExperience && matchesSkills && matchesMatch
  })
})

const searchCVs = () => {
  // Search logic is handled by computed property
}

const selectCV = (cv: any) => {
  console.log('Selected CV:', cv)
}

const downloadCV = (cv: any) => {
  console.log('Download CV:', cv)
}

const viewCV = (cv: any) => {
  console.log('View CV:', cv)
}
</script>

<style scoped>
.cv-database {
  padding: 0;
}

.page-header {
  margin-bottom: 2rem;
}

.page-header h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: #666;
  margin: 0;
}

.database-content {
  display: grid;
  gap: 2rem;
}

.search-section {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.search-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.search-input {
  flex: 1;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.search-input .form-control {
  padding-left: 3rem;
}

.filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.cv-list-section {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.list-header h3 {
  color: #2c3e50;
  margin: 0;
}

.view-options {
  display: flex;
  gap: 0.5rem;
}

.view-btn {
  padding: 0.5rem;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.view-btn.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.cv-container--grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.cv-container--list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cv-card {
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cv-card:hover {
  border-color: #007bff;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.cv-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.candidate-info {
  display: flex;
  gap: 1rem;
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

.candidate-details {
  flex: 1;
}

.candidate-name {
  color: #2c3e50;
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
}

.candidate-position {
  color: #666;
  margin: 0 0 0.25rem 0;
  font-size: 0.9rem;
}

.candidate-location {
  color: #999;
  margin: 0;
  font-size: 0.85rem;
}

.cv-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.match-score {
  font-weight: bold;
  font-size: 1rem;
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

.action-btn {
  padding: 0.5rem;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn:hover {
  background-color: #f8f9fa;
  border-color: #007bff;
}

.cv-content {
  display: grid;
  gap: 0.75rem;
}

.cv-experience,
.cv-skills {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.label {
  font-weight: 500;
  color: #666;
  font-size: 0.9rem;
  min-width: 80px;
}

.value {
  color: #2c3e50;
  font-size: 0.9rem;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.skill-tag {
  background-color: #e9ecef;
  color: #495057;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.more-skills {
  color: #666;
  font-size: 0.8rem;
  font-style: italic;
}

.cv-meta {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
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

.form-control {
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

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .search-bar {
    flex-direction: column;
  }
  
  .filters {
    grid-template-columns: 1fr;
  }
  
  .cv-container--grid {
    grid-template-columns: 1fr;
  }
  
  .cv-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .cv-actions {
    align-self: flex-end;
  }
}
</style>
