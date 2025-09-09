<template>
  <div class="cv-database">
    <div class="page-header">
      <div class="header-content">
        <div class="header-text">
          <h1>List CV</h1>
          <p>Tìm kiếm và quản lý hồ sơ ứng viên</p>
        </div>
        <button @click="goToCVAnalysis" class="btn btn-primary analysis-btn">
          📊 Import CV
        </button>
      </div>
    </div>

    <div class="search-section">
      <div class="search-bar">
        <div class="search-input">
          <i class="search-icon">🔍</i>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Tìm kiếm theo tên, kỹ năng..."
            @input="handleSearch"
          />
        </div>
        <div class="view-toggle">
          <button 
            :class="{ active: viewMode === 'grid' }" 
            @click="viewMode = 'grid'"
            class="view-btn"
          >
            <i>⊞</i>
          </button>
          <button 
            :class="{ active: viewMode === 'list' }" 
            @click="viewMode = 'list'"
            class="view-btn"
          >
            <i>☰</i>
          </button>
        </div>
      </div>

      <div class="filters">
        <div class="filter-group">
          <label>Vị trí</label>
          <div class="multi-select">
            <div class="multi-select-trigger" @click="toggleDropdown('position')">
              <span v-if="filters.position.length === 0">Tất cả vị trí</span>
              <span v-else>{{ filters.position.length }} vị trí đã chọn</span>
              <i class="dropdown-icon">▼</i>
            </div>
            <div v-if="dropdowns.position" class="multi-select-options">
              <label v-for="option in positionOptions" :key="option.value" class="multi-select-option">
                <input 
                  type="checkbox" 
                  :value="option.value" 
                  v-model="filters.position"
                  @change="updateFilters"
                />
                <span>{{ option.label }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="filter-group">
          <label>Ngôn ngữ/Kỹ năng</label>
          <div class="multi-select">
            <div class="multi-select-trigger" @click="toggleDropdown('skill')">
              <span v-if="filters.skill.length === 0">Tất cả kỹ năng</span>
              <span v-else>{{ filters.skill.length }} kỹ năng đã chọn</span>
              <i class="dropdown-icon">▼</i>
            </div>
            <div v-if="dropdowns.skill" class="multi-select-options">
              <label v-for="option in skillOptions" :key="option.value" class="multi-select-option">
                <input 
                  type="checkbox" 
                  :value="option.value" 
                  v-model="filters.skill"
                  @change="updateFilters"
                />
                <span>{{ option.label }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="filter-group">
          <label>Mức lương mong muốn</label>
          <select v-model="filters.salary">
            <option value="">Tất cả mức lương</option>
            <option value="0-15">Dưới 15 triệu</option>
            <option value="15-25">15-25 triệu</option>
            <option value="25-40">25-40 triệu</option>
            <option value="40+">Trên 40 triệu</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Kinh nghiệm</label>
          <select v-model="filters.experience">
            <option value="">Tất cả kinh nghiệm</option>
            <option value="0-1">0-1 năm</option>
            <option value="1-3">1-3 năm</option>
            <option value="3-5">3-5 năm</option>
            <option value="5+">5+ năm</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Địa điểm</label>
          <div class="multi-select">
            <div class="multi-select-trigger" @click="toggleDropdown('location')">
              <span v-if="filters.location.length === 0">Tất cả địa điểm</span>
              <span v-else>{{ filters.location.length }} địa điểm đã chọn</span>
              <i class="dropdown-icon">▼</i>
            </div>
            <div v-if="dropdowns.location" class="multi-select-options">
              <label v-for="option in locationOptions" :key="option.value" class="multi-select-option">
                <input 
                  type="checkbox" 
                  :value="option.value" 
                  v-model="filters.location"
                  @change="updateFilters"
                />
                <span>{{ option.label }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="filter-group clear-btn">
          <button @click="clearFilters" class="btn btn-secondary" style="height: 50px;">
            <i>×</i> Xóa bộ lọc
          </button>
        </div>
      </div>

      <div class="results-info">
        <span>Tìm thấy {{ filteredCandidates.length }} ứng viên</span>
        <button @click="exportToExcel" class="btn btn-primary">
          <i>📊</i> Xuất Excel
        </button>
      </div>
    </div>

    <div class="candidates-section">
      <div v-if="viewMode === 'grid'" class="candidates-grid">
        <div 
          v-for="candidate in filteredCandidates" 
          :key="candidate.id" 
          class="candidate-card"
          @click="viewCandidate(candidate)"
        >
          <div class="candidate-avatar">
            <span>{{ candidate.initials }}</span>
          </div>
          
          <div class="candidate-info">
            <h3>{{ candidate.name }}</h3>
            <p class="candidate-role">{{ candidate.position }}</p>
            
            <div class="candidate-details">
              <div class="detail-item">
                <i>📧</i>
                <span>{{ candidate.email }}</span>
              </div>
              <div class="detail-item">
                <i>📱</i>
                <span>{{ candidate.phone }}</span>
              </div>
              <div class="detail-item">
                <i>📍</i>
                <span>{{ candidate.location }}</span>
              </div>
              <div class="detail-item">
                <i>💰</i>
                <span>{{ candidate.salary }}</span>
              </div>
            </div>

            <div class="candidate-skills">
              <span 
                v-for="skill in candidate.skills.slice(0, 3)" 
                :key="skill" 
                class="skill-tag"
              >
                {{ skill }}
              </span>
              <span v-if="candidate.skills.length > 3" class="skill-tag more">
                +{{ candidate.skills.length - 3 }}
              </span>
            </div>

            <div class="candidate-footer">
              <div class="match-score" :class="getMatchClass(candidate.matchScore)">
                {{ candidate.matchScore }}% phù hợp
              </div>
              <div class="candidate-date">
                {{ candidate.dateAdded }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="candidates-list">
        <div 
          v-for="candidate in filteredCandidates" 
          :key="candidate.id" 
          class="candidate-list-item"
          @click="viewCandidate(candidate)"
        >
          <div class="candidate-avatar-information">
            <span>{{ candidate.initials }}</span>
          </div>
          
          <div class="candidate-info">
            <h3>{{ candidate.name }}</h3>
            <p class="candidate-role">{{ candidate.position }}</p>
            <div class="candidate-skills">
              <span 
                v-for="skill in candidate.skills" 
                :key="skill" 
                class="skill-tag"
              >
                {{ skill }}
              </span>
            </div>
          </div>

          <div class="candidate-meta">
            <div class="match-score" :class="getMatchClass(candidate.matchScore)">
              {{ candidate.matchScore }}% phù hợp
            </div>
            <div class="candidate-date">
              {{ candidate.dateAdded }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Candidate Detail Modal -->
    <div v-if="selectedCandidate" class="modal-overlay" @click="closeModal">
      <div class="modal-content candidate-detail-modal" @click.stop>
        <div class="modal-header">
          <h2>Chi tiết ứng viên</h2>
          <button @click="closeModal" class="close-btn">×</button>
        </div>
        
        <div class="modal-body">
          <div class="candidate-profile">
            <div class="candidate-avatar-information large">
              <span>{{ selectedCandidate.initials }}</span>
            </div>
            <div class="candidate-basic-info">
              <h3>{{ selectedCandidate.name }}</h3>
              <p class="candidate-role">{{ selectedCandidate.position }}</p>
              <div class="match-score large" :class="getMatchClass(selectedCandidate.matchScore)">
                {{ selectedCandidate.matchScore }}% phù hợp
              </div>
            </div>
          </div>

          <div class="candidate-sections">
            <div class="section">
              <h4>Thông tin liên hệ</h4>
              <div class="contact-info">
                <div class="contact-item">
                  <i>📧</i>
                  <span>{{ selectedCandidate.email }}</span>
                </div>
                <div class="contact-item">
                  <i>📱</i>
                  <span>{{ selectedCandidate.phone }}</span>
                </div>
                <div class="contact-item">
                  <i>📍</i>
                  <span>{{ selectedCandidate.location }}</span>
                </div>
                <div class="contact-item">
                  <i>💰</i>
                  <span>{{ selectedCandidate.salary }}</span>
                </div>
              </div>
            </div>

            <div class="section">
              <h4>Kỹ năng</h4>
              <div class="skills-list">
                <span 
                  v-for="skill in selectedCandidate.skills" 
                  :key="skill" 
                  class="skill-tag"
                >
                  {{ skill }}
                </span>
              </div>
            </div>

            <div class="section">
              <h4>Kinh nghiệm</h4>
              <div class="experience-list">
                <div 
                  v-for="exp in selectedCandidate.experience" 
                  :key="exp.id" 
                  class="experience-item"
                >
                  <h5>{{ exp.title }}</h5>
                  <p class="company">{{ exp.company }}</p>
                  <p class="duration">{{ exp.duration }}</p>
                  <p class="description">{{ exp.description }}</p>
                </div>
              </div>
            </div>

            <div class="section">
              <h4>Học vấn</h4>
              <div class="education-list">
                <div 
                  v-for="edu in selectedCandidate.education" 
                  :key="edu.id" 
                  class="education-item"
                >
                  <h5>{{ edu.degree }}</h5>
                  <p class="school">{{ edu.school }}</p>
                  <p class="year">{{ edu.year }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button @click="closeModal" class="btn btn-secondary">Đóng</button>
          <button @click="contactCandidate" class="btn btn-primary">Liên hệ</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchQuery = ref('')
const viewMode = ref<'grid' | 'list'>('grid')
const selectedCandidate = ref<any>(null)

const filters = reactive({
  position: [],
  skill: [],
  salary: '',
  experience: '',
  location: []
})

const dropdowns = reactive({
  position: false,
  skill: false,
  location: false
})

const positionOptions = [
  { value: 'frontend', label: 'Frontend Developer' },
  { value: 'backend', label: 'Backend Developer' },
  { value: 'fullstack', label: 'Fullstack Developer' },
  { value: 'devops', label: 'DevOps Engineer' },
  { value: 'product', label: 'Product Manager' },
  { value: 'designer', label: 'UX/UI Designer' },
  { value: 'analyst', label: 'Data Analyst' }
]

const skillOptions = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'nodejs', label: 'Node.js' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'aws', label: 'AWS' },
  { value: 'docker', label: 'Docker' }
]

const locationOptions = [
  { value: 'hanoi', label: 'Hà Nội' },
  { value: 'hcm', label: 'TP. Hồ Chí Minh' },
  { value: 'danang', label: 'Đà Nẵng' },
  { value: 'remote', label: 'Remote' },
  { value: 'other', label: 'Khác' }
]

const candidates = ref([
  {
    id: 1,
    name: 'Nguyễn Văn An',
    position: 'Senior Frontend Developer',
    email: 'nguyenvanan@email.com',
    phone: '+84 123 456 789',
    location: 'Hà Nội',
    salary: '20-30 triệu',
    skills: ['JavaScript', 'React', 'TypeScript'],
    matchScore: 92,
    dateAdded: '2024-01-15',
    initials: 'AN',
    experience: [
      {
        id: 1,
        title: 'Senior Frontend Developer',
        company: 'TechCorp Vietnam',
        duration: '2021 - Hiện tại',
        description: 'Phát triển và duy trì các ứng dụng web sử dụng React và TypeScript'
      }
    ],
    education: [
      {
        id: 1,
        degree: 'Cử nhân Công nghệ Thông tin',
        school: 'Đại học Bách Khoa Hà Nội',
        year: '2018'
      }
    ]
  },
  {
    id: 2,
    name: 'Trần Thị Bình',
    position: 'Product Manager',
    email: 'tranthibinh@email.com',
    phone: '+84 987 654 321',
    location: 'TP. Hồ Chí Minh',
    salary: '30-50 triệu',
    skills: ['Product Strategy', 'Agile', 'Data Analysis'],
    matchScore: 87,
    dateAdded: '2024-01-14',
    initials: 'TB',
    experience: [
      {
        id: 1,
        title: 'Product Manager',
        company: 'StartupXYZ',
        duration: '2020 - Hiện tại',
        description: 'Quản lý sản phẩm và phát triển chiến lược kinh doanh'
      }
    ],
    education: [
      {
        id: 1,
        degree: 'Thạc sĩ Quản trị Kinh doanh',
        school: 'Đại học Kinh tế TP.HCM',
        year: '2019'
      }
    ]
  },
  {
    id: 3,
    name: 'Lê Hoàng Cường',
    position: 'DevOps Engineer',
    email: 'lehoangcuong@email.com',
    phone: '+84 555 123 456',
    location: 'Đà Nẵng',
    salary: '15-20 triệu',
    skills: ['AWS', 'Docker', 'Kubernetes'],
    matchScore: 76,
    dateAdded: '2024-01-13',
    initials: 'LC',
    experience: [
      {
        id: 1,
        title: 'DevOps Engineer',
        company: 'CloudTech Solutions',
        duration: '2021 - Hiện tại',
        description: 'Triển khai và quản lý hạ tầng cloud trên AWS'
      }
    ],
    education: [
      {
        id: 1,
        degree: 'Cử nhân Kỹ thuật Phần mềm',
        school: 'Đại học Đà Nẵng',
        year: '2020'
      }
    ]
  },
  {
    id: 4,
    name: 'Phạm Thị Dung',
    position: 'UX Designer',
    email: 'phamthidung@email.com',
    phone: '+84 333 777 999',
    location: 'Hà Nội',
    salary: '18-25 triệu',
    skills: ['Figma', 'User Research', 'Prototyping'],
    matchScore: 84,
    dateAdded: '2024-01-12',
    initials: 'PD',
    experience: [
      {
        id: 1,
        title: 'UX Designer',
        company: 'DesignStudio',
        duration: '2022 - Hiện tại',
        description: 'Thiết kế trải nghiệm người dùng cho các ứng dụng di động'
      }
    ],
    education: [
      {
        id: 1,
        degree: 'Cử nhân Thiết kế Đồ họa',
        school: 'Đại học Mỹ thuật Công nghiệp',
        year: '2021'
      }
    ]
  },
  {
    id: 5,
    name: 'Hoàng Văn Em',
    position: 'Backend Developer',
    email: 'hoangvanem@email.com',
    phone: '+84 444 888 222',
    location: 'TP. Hồ Chí Minh',
    salary: '12-18 triệu',
    skills: ['Java', 'Spring Boot', 'MySQL'],
    matchScore: 68,
    dateAdded: '2024-01-11',
    initials: 'HE',
    experience: [
      {
        id: 1,
        title: 'Backend Developer',
        company: 'WebDev Agency',
        duration: '2023 - Hiện tại',
        description: 'Phát triển API và dịch vụ backend sử dụng Java Spring'
      }
    ],
    education: [
      {
        id: 1,
        degree: 'Cử nhân Công nghệ Thông tin',
        school: 'Đại học Công nghệ TP.HCM',
        year: '2022'
      }
    ]
  },
  {
    id: 6,
    name: 'Võ Thị Phương',
    position: 'Data Analyst',
    email: 'vothiphuong@email.com',
    phone: '+84 666 111 333',
    location: 'Đà Nẵng',
    salary: '16-22 triệu',
    skills: ['Python', 'SQL', 'Tableau'],
    matchScore: 79,
    dateAdded: '2024-01-10',
    initials: 'VP',
    experience: [
      {
        id: 1,
        title: 'Data Analyst',
        company: 'DataInsights Co.',
        duration: '2022 - Hiện tại',
        description: 'Phân tích dữ liệu và tạo báo cáo kinh doanh'
      }
    ],
    education: [
      {
        id: 1,
        degree: 'Cử nhân Thống kê',
        school: 'Đại học Khoa học Tự nhiên',
        year: '2021'
      }
    ]
  }
])

const filteredCandidates = computed(() => {
  return candidates.value.filter(candidate => {
    const matchesSearch = !searchQuery.value || 
      candidate.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.value.toLowerCase()))
    
    const matchesPosition = filters.position.length === 0 || 
      filters.position.some(pos => candidate.position.toLowerCase().includes(pos.toLowerCase()))
    
    const matchesSkill = filters.skill.length === 0 || 
      filters.skill.some(skill => candidate.skills.some(candidateSkill => 
        candidateSkill.toLowerCase().includes(skill.toLowerCase())
      ))
    
    const matchesLocation = filters.location.length === 0 || 
      filters.location.some(loc => {
        if (loc === 'hanoi') return candidate.location.includes('Hà Nội')
        if (loc === 'hcm') return candidate.location.includes('Hồ Chí Minh')
        if (loc === 'danang') return candidate.location.includes('Đà Nẵng')
        if (loc === 'remote') return candidate.location.toLowerCase().includes('remote')
        return false
      })
    
    const matchesSalary = !filters.salary || checkSalaryMatch(candidate.salary, filters.salary)
    const matchesExperience = !filters.experience || checkExperienceMatch(candidate.experience, filters.experience)
    
    return matchesSearch && matchesPosition && matchesSkill && matchesLocation && matchesSalary && matchesExperience
  })
})

const handleSearch = () => {
  // Search is handled by computed property
}

const clearFilters = () => {
  filters.position = []
  filters.skill = []
  filters.salary = ''
  filters.experience = ''
  filters.location = []
  dropdowns.position = false
  dropdowns.skill = false
  dropdowns.location = false
}

const toggleDropdown = (type: 'position' | 'skill' | 'location') => {
  // Close other dropdowns
  Object.keys(dropdowns).forEach(key => {
    if (key !== type) {
      dropdowns[key as keyof typeof dropdowns] = false
    }
  })
  // Toggle current dropdown
  dropdowns[type] = !dropdowns[type]
}

const updateFilters = () => {
  // This function is called when checkboxes change
  // The computed property will automatically update
}

const checkSalaryMatch = (candidateSalary: string, filterSalary: string) => {
  // Extract numbers from salary string like "20-30 triệu"
  const salaryMatch = candidateSalary.match(/(\d+)-(\d+)/)
  if (!salaryMatch) return false
  
  const minSalary = parseInt(salaryMatch[1])
  const maxSalary = parseInt(salaryMatch[2])
  
  switch (filterSalary) {
    case '0-15':
      return maxSalary <= 15
    case '15-25':
      return minSalary >= 15 && maxSalary <= 25
    case '25-40':
      return minSalary >= 25 && maxSalary <= 40
    case '40+':
      return minSalary >= 40
    default:
      return true
  }
}

const checkExperienceMatch = (candidateExp: any[], filterExp: string) => {
  // This is a simplified check - in real app you'd parse experience years
  const expYears = candidateExp.length // Simplified: using number of experiences
  switch (filterExp) {
    case '0-1':
      return expYears <= 1
    case '1-3':
      return expYears >= 1 && expYears <= 3
    case '3-5':
      return expYears >= 3 && expYears <= 5
    case '5+':
      return expYears >= 5
    default:
      return true
  }
}

const exportToExcel = () => {
  console.log('Exporting to Excel...')
}

const viewCandidate = (candidate: any) => {
  selectedCandidate.value = candidate
}

const closeModal = () => {
  selectedCandidate.value = null
}

const contactCandidate = () => {
  console.log('Contacting candidate:', selectedCandidate.value?.name)
}

const getMatchClass = (score: number) => {
  if (score >= 80) return 'high'
  if (score >= 60) return 'medium'
  return 'low'
}

const goToCVAnalysis = () => {
  router.push('/cv-analysis')
}
</script>

<style scoped>
.cv-database {
  padding: 0;
}

.page-header {
  margin-bottom: 2rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.header-text h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 2rem;
  font-weight: bold;
}

.header-text p {
  color: #666;
  margin: 0;
  font-size: 1.1rem;
}

.analysis-btn {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.analysis-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}

.search-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.search-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
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
  font-size: 1.1rem;
}

.search-input input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.search-input input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
}

.view-toggle {
  display: flex;
  gap: 0.5rem;
}

.view-btn {
  padding: 0.75rem;
  border: 1px solid #ddd;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1.1rem;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.view-btn.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.view-btn:hover {
  background-color: #f8f9fa;
}

.filters {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.clear-btn {
  margin-top: auto;
}

.filter-group label {
  font-weight: 500;
  color: #2c3e50;
  font-size: 0.9rem;
}

.filter-group select {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  background: white;
  transition: border-color 0.3s;
}

.filter-group select:focus {
  outline: none;
  border-color: #007bff;
}

.filter-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: flex-end;
}

.btn {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.results-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
}

/* Multi-select styles */
.multi-select {
  position: relative;
}

.multi-select-trigger {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  background: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: border-color 0.3s;
}

.multi-select-trigger:hover {
  border-color: #007bff;
}

.dropdown-icon {
  font-size: 0.8rem;
  transition: transform 0.3s;
}

.multi-select-options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 100;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 4px;
}

.multi-select-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 0.9rem;
}

.multi-select-option:hover {
  background-color: #f8f9fa;
}

.multi-select-option input[type="checkbox"] {
  margin: 0;
  width: 16px;
  height: 16px;
  accent-color: #007bff;
}

.candidates-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.candidates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
}

.candidate-card {
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  display: flex;
  flex-direction: column;
}

.candidate-card:hover {
  border-color: #007bff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.candidate-avatar-information {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.candidate-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  margin: 0 auto 1rem auto;
  flex-shrink: 0;
}

.candidate-info h3 {
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
}

.candidate-role {
  color: #666;
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
  text-align: center;
}

.candidate-details {
  display: grid;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #666;
}

.detail-item i {
  font-size: 1rem;
}

.candidate-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.skill-tag {
  background-color: #e3f2fd;
  color: #1976d2;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 500;
}

.skill-tag.more {
  background-color: #f5f5f5;
  color: #666;
}

.candidate-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.match-score {
  font-weight: bold;
  font-size: 0.85rem;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
}

.match-score.high {
  background-color: #d4edda;
  color: #155724;
}

.match-score.medium {
  background-color: #fff3cd;
  color: #856404;
}

.match-score.low {
  background-color: #f8d7da;
  color: #721c24;
}

.candidate-date {
  color: #999;
  font-size: 0.8rem;
}

.candidates-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.candidate-list-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.candidate-list-item:hover {
  border-color: #007bff;
  background-color: #f8f9fa;
}

.candidate-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  margin-left: auto;
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
  border-radius: 12px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.candidate-detail-modal {
  max-width: 1000px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
}

.modal-header h2 {
  margin: 0;
  color: #2c3e50;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.close-btn:hover {
  background-color: #f8f9fa;
}

.modal-body {
  padding: 1.5rem;
}

.candidate-profile {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e9ecef;
}

.candidate-avatar.large {
  width: 80px;
  height: 80px;
  font-size: 1.5rem;
}

.candidate-basic-info h3 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1.5rem;
}

.candidate-basic-info .candidate-role {
  color: #666;
  margin: 0 0 1rem 0;
  font-size: 1rem;
}

.match-score.large {
  font-size: 1rem;
  padding: 0.5rem 1rem;
}

.candidate-sections {
  display: grid;
  gap: 1.5rem;
}

.section h4 {
  color: #2c3e50;
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  border-bottom: 2px solid #007bff;
  padding-bottom: 0.5rem;
}

.contact-info {
  display: grid;
  gap: 0.75rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
}

.contact-item i {
  font-size: 1.1rem;
  width: 20px;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.experience-list,
.education-list {
  display: grid;
  gap: 1rem;
}

.experience-item,
.education-item {
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #007bff;
}

.experience-item h5,
.education-item h5 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1rem;
}

.company,
.school {
  color: #666;
  margin: 0 0 0.25rem 0;
  font-size: 0.9rem;
  font-weight: 500;
}

.duration,
.year {
  color: #999;
  margin: 0 0 0.5rem 0;
  font-size: 0.85rem;
}

.description {
  color: #666;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #e9ecef;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .analysis-btn {
    width: 100%;
    justify-content: center;
  }
  
  .search-bar {
    flex-direction: column;
  }
  
  .filters {
    grid-template-columns: 1fr;
  }
  
  .results-info {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .candidates-grid {
    grid-template-columns: 1fr;
  }
  
  .candidate-list-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .candidate-meta {
    align-items: flex-start;
    margin-left: 0;
  }
  
  .candidate-profile {
    flex-direction: column;
    text-align: center;
  }
  
  .modal-content {
    width: 95%;
    margin: 1rem;
  }
  
  .multi-select-options {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-height: 60vh;
  }
}
</style>