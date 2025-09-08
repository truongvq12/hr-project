<template>
  <div class="dashboard">
    <!-- KPI Cards -->
    <div class="kpi-grid">
      <KPICard
        title="CV đã phân tích"
        value="2,847"
        change="+12%"
        icon="📄"
        color="blue"
      />
      <KPICard
        title="Ứng viên phù hợp"
        value="856"
        change="+8%"
        icon="✅"
        color="green"
      />
      <KPICard
        title="JD đang tuyển"
        value="24"
        change="+3"
        icon="💼"
        color="orange"
      />
      <KPICard
        title="Tỷ lệ phù hợp TB"
        value="73%"
        change="+5%"
        icon="⏱️"
        color="purple"
      />
    </div>

    <!-- Main Content Grid -->
    <div class="content-grid">
      <!-- Recent Activity -->
      <div class="recent-activity">
        <div class="section-header">
          <h3>CV phân tích gần đây</h3>
          <a href="#" class="view-all">Xem tất cả</a>
        </div>
        <div class="activity-list">
          <ActivityItem
            name="Nguyễn Văn An"
            title="Senior Frontend Developer"
            match="92%"
            time="2 giờ trước"
            status="high"
          />
          <ActivityItem
            name="Trần Thị Bình"
            title="Product Manager"
            match="87%"
            time="4 giờ trước"
            status="high"
          />
          <ActivityItem
            name="Lê Hoàng Cường"
            title="DevOps Engineer"
            match="76%"
            time="6 giờ trước"
            status="medium"
          />
          <ActivityItem
            name="Phạm Thị Dung"
            title="UX Designer"
            match="65%"
            time="8 giờ trước"
            status="medium"
          />
          <ActivityItem
            name="Hoàng Văn Em"
            title="Backend Developer"
            match="45%"
            time="1 ngày trước"
            status="low"
          />
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <div class="section-header">
          <h3>Thao tác nhanh</h3>
        </div>
        <div class="actions-list">
          <QuickAction
            title="Upload CV mới"
            description="Phân tích CV ứng viên"
            icon="📤"
            color="blue"
            @click="goToCVAnalysis"
          />
          <QuickAction
            title="Tìm kiếm ứng viên"
            description="Từ cơ sở dữ liệu CV"
            icon="🔍"
            color="green"
            @click="goToCVDatabase"
          />
          <QuickAction
            title="Tạo JD mới"
            description="Mô tả công việc"
            icon="📝"
            color="purple"
            @click="goToJDEvaluation"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import KPICard from '@/components/KPICard.vue'
import ActivityItem from '@/components/ActivityItem.vue'
import QuickAction from '@/components/QuickAction.vue'

const router = useRouter()

const goToCVAnalysis = () => {
  router.push('/cv-analysis')
}

const goToCVDatabase = () => {
  router.push('/cv-database')
}

const goToJDEvaluation = () => {
  router.push('/jd-evaluation')
}
</script>

<style scoped>
.dashboard {
  padding: 0;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.recent-activity,
.quick-actions {
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
  margin: 0;
  color: #2c3e50;
  font-size: 1.1rem;
}

.view-all {
  color: #007bff;
  text-decoration: none;
  font-size: 0.9rem;
}

.view-all:hover {
  text-decoration: underline;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.actions-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .kpi-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
</style>
