<template>
  <div class="reports">
    <div class="page-header">
      <h1>Báo cáo</h1>
      <p>Thống kê và phân tích hiệu suất tuyển dụng</p>
    </div>

    <div class="reports-content">
      <!-- Summary Cards -->
      <div class="summary-cards">
        <div class="summary-card">
          <div class="card-icon">📊</div>
          <div class="card-content">
            <h3>Tổng CV phân tích</h3>
            <div class="card-value">2,847</div>
            <div class="card-change positive">+12% so với tháng trước</div>
          </div>
        </div>
        
        <div class="summary-card">
          <div class="card-icon">✅</div>
          <div class="card-content">
            <h3>Tỷ lệ phù hợp</h3>
            <div class="card-value">73%</div>
            <div class="card-change positive">+5% so với tháng trước</div>
          </div>
        </div>
        
        <div class="summary-card">
          <div class="card-icon">⏱️</div>
          <div class="card-content">
            <h3>Thời gian TB phân tích</h3>
            <div class="card-value">2.3 phút</div>
            <div class="card-change negative">+0.2 phút so với tháng trước</div>
          </div>
        </div>
        
        <div class="summary-card">
          <div class="card-icon">💰</div>
          <div class="card-content">
            <h3>Tiết kiệm chi phí</h3>
            <div class="card-value">45%</div>
            <div class="card-change positive">+8% so với tháng trước</div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="charts-section">
        <div class="chart-container">
          <h3>Xu hướng phân tích CV theo tháng</h3>
          <div class="chart-placeholder">
            <div class="chart-bars">
              <div class="bar" style="height: 60%">
                <span class="bar-value">1,200</span>
                <span class="bar-label">T1</span>
              </div>
              <div class="bar" style="height: 75%">
                <span class="bar-value">1,500</span>
                <span class="bar-label">T2</span>
              </div>
              <div class="bar" style="height: 85%">
                <span class="bar-value">1,700</span>
                <span class="bar-label">T3</span>
              </div>
              <div class="bar" style="height: 95%">
                <span class="bar-value">1,900</span>
                <span class="bar-label">T4</span>
              </div>
              <div class="bar" style="height: 100%">
                <span class="bar-value">2,100</span>
                <span class="bar-label">T5</span>
              </div>
              <div class="bar" style="height: 90%">
                <span class="bar-value">1,800</span>
                <span class="bar-label">T6</span>
              </div>
            </div>
          </div>
        </div>

        <div class="chart-container">
          <h3>Phân bố kỹ năng phổ biến</h3>
          <div class="skills-chart">
            <div class="skill-item">
              <span class="skill-name">React</span>
              <div class="skill-bar">
                <div class="skill-fill" style="width: 85%"></div>
              </div>
              <span class="skill-percentage">85%</span>
            </div>
            <div class="skill-item">
              <span class="skill-name">Vue.js</span>
              <div class="skill-bar">
                <div class="skill-fill" style="width: 72%"></div>
              </div>
              <span class="skill-percentage">72%</span>
            </div>
            <div class="skill-item">
              <span class="skill-name">TypeScript</span>
              <div class="skill-bar">
                <div class="skill-fill" style="width: 68%"></div>
              </div>
              <span class="skill-percentage">68%</span>
            </div>
            <div class="skill-item">
              <span class="skill-name">Node.js</span>
              <div class="skill-bar">
                <div class="skill-fill" style="width: 65%"></div>
              </div>
              <span class="skill-percentage">65%</span>
            </div>
            <div class="skill-item">
              <span class="skill-name">Python</span>
              <div class="skill-bar">
                <div class="skill-fill" style="width: 58%"></div>
              </div>
              <span class="skill-percentage">58%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Reports -->
      <div class="detailed-reports">
        <div class="report-section">
          <h3>Báo cáo chi tiết theo vị trí</h3>
          <div class="report-table">
            <table>
              <thead>
                <tr>
                  <th>Vị trí</th>
                  <th>CV nhận được</th>
                  <th>CV phù hợp</th>
                  <th>Tỷ lệ phù hợp</th>
                  <th>Thời gian TB</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="position in positionReports" :key="position.name">
                  <td>{{ position.name }}</td>
                  <td>{{ position.totalCVs }}</td>
                  <td>{{ position.matchedCVs }}</td>
                  <td>
                    <span class="match-rate" :class="`match-rate--${position.matchLevel}`">
                      {{ position.matchRate }}%
                    </span>
                  </td>
                  <td>{{ position.avgTime }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="report-section">
          <h3>Top ứng viên tiềm năng</h3>
          <div class="top-candidates">
            <div
              v-for="candidate in topCandidates"
              :key="candidate.id"
              class="candidate-item"
            >
              <div class="candidate-avatar">{{ candidate.name.charAt(0) }}</div>
              <div class="candidate-info">
                <h4>{{ candidate.name }}</h4>
                <p>{{ candidate.position }}</p>
                <div class="candidate-skills">
                  <span
                    v-for="skill in candidate.topSkills"
                    :key="skill"
                    class="skill-tag"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
              <div class="candidate-score">
                <div class="score-value">{{ candidate.score }}%</div>
                <div class="score-label">Độ phù hợp</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Export Section -->
      <div class="export-section">
        <h3>Xuất báo cáo</h3>
        <div class="export-options">
          <button class="btn btn-primary">
            📊 Xuất Excel
          </button>
          <button class="btn btn-secondary">
            📄 Xuất PDF
          </button>
          <button class="btn btn-success">
            📧 Gửi email
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const positionReports = ref([
  {
    name: 'Frontend Developer',
    totalCVs: 450,
    matchedCVs: 320,
    matchRate: 71,
    matchLevel: 'medium',
    avgTime: '2.1 phút'
  },
  {
    name: 'Backend Developer',
    totalCVs: 380,
    matchedCVs: 290,
    matchRate: 76,
    matchLevel: 'high',
    avgTime: '2.3 phút'
  },
  {
    name: 'Product Manager',
    totalCVs: 120,
    matchedCVs: 95,
    matchRate: 79,
    matchLevel: 'high',
    avgTime: '1.8 phút'
  },
  {
    name: 'DevOps Engineer',
    totalCVs: 200,
    matchedCVs: 140,
    matchRate: 70,
    matchLevel: 'medium',
    avgTime: '2.5 phút'
  },
  {
    name: 'UX Designer',
    totalCVs: 180,
    matchedCVs: 110,
    matchRate: 61,
    matchLevel: 'low',
    avgTime: '2.0 phút'
  }
])

const topCandidates = ref([
  {
    id: 1,
    name: 'Nguyễn Văn An',
    position: 'Senior Frontend Developer',
    score: 95,
    topSkills: ['React', 'TypeScript', 'Node.js']
  },
  {
    id: 2,
    name: 'Trần Thị Bình',
    position: 'Product Manager',
    score: 92,
    topSkills: ['Strategy', 'Analytics', 'Agile']
  },
  {
    id: 3,
    name: 'Lê Hoàng Cường',
    position: 'DevOps Engineer',
    score: 88,
    topSkills: ['AWS', 'Docker', 'Kubernetes']
  },
  {
    id: 4,
    name: 'Phạm Thị Dung',
    position: 'UX Designer',
    score: 85,
    topSkills: ['Figma', 'Research', 'Prototyping']
  }
])
</script>

<style scoped>
.reports {
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

.reports-content {
  display: grid;
  gap: 2rem;
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
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
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
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
  margin-bottom: 0.25rem;
}

.card-change {
  font-size: 0.85rem;
  font-weight: 500;
}

.card-change.positive {
  color: #28a745;
}

.card-change.negative {
  color: #dc3545;
}

.charts-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.chart-container {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.chart-container h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: end;
  justify-content: center;
  background-color: #f8f9fa;
  border-radius: 4px;
  padding: 1rem;
}

.chart-bars {
  display: flex;
  align-items: end;
  gap: 1rem;
  height: 100%;
}

.bar {
  background: linear-gradient(to top, #007bff, #0056b3);
  border-radius: 4px 4px 0 0;
  min-width: 40px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.bar-value {
  color: white;
  font-weight: bold;
  font-size: 0.8rem;
}

.bar-label {
  color: #666;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}

.skills-chart {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.skill-name {
  min-width: 80px;
  font-weight: 500;
  color: #2c3e50;
}

.skill-bar {
  flex: 1;
  height: 20px;
  background-color: #e9ecef;
  border-radius: 10px;
  overflow: hidden;
}

.skill-fill {
  height: 100%;
  background: linear-gradient(90deg, #007bff, #0056b3);
  border-radius: 10px;
  transition: width 0.3s ease;
}

.skill-percentage {
  min-width: 40px;
  text-align: right;
  font-weight: 500;
  color: #2c3e50;
}

.detailed-reports {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.report-section {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.report-section h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.report-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #2c3e50;
}

.match-rate {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 500;
  font-size: 0.85rem;
}

.match-rate--high {
  background-color: #d4edda;
  color: #155724;
}

.match-rate--medium {
  background-color: #fff3cd;
  color: #856404;
}

.match-rate--low {
  background-color: #f8d7da;
  color: #721c24;
}

.top-candidates {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.candidate-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.candidate-item:hover {
  border-color: #007bff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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

.candidate-info h4 {
  color: #2c3e50;
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
}

.candidate-info p {
  color: #666;
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
}

.candidate-skills {
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

.candidate-score {
  text-align: center;
}

.score-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
}

.score-label {
  font-size: 0.8rem;
  color: #666;
}

.export-section {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.export-section h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.export-options {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #1e7e34;
}

@media (max-width: 768px) {
  .charts-section,
  .detailed-reports {
    grid-template-columns: 1fr;
  }
  
  .summary-cards {
    grid-template-columns: 1fr;
  }
  
  .export-options {
    flex-direction: column;
  }
  
  .candidate-item {
    flex-direction: column;
    text-align: center;
  }
}
</style>
