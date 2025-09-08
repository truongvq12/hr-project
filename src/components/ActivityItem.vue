<template>
  <div class="activity-item">
    <div class="activity-avatar">
      {{ name.charAt(0) }}
    </div>
    <div class="activity-content">
      <div class="activity-name">{{ name }}</div>
      <div class="activity-title">{{ title }}</div>
      <div class="activity-time">{{ time }}</div>
    </div>
    <div class="activity-match" :class="`activity-match--${status}`">
      {{ match }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string
  title: string
  match: string
  time: string
  status: 'high' | 'medium' | 'low'
}

defineProps<Props>()
</script>

<style scoped>
.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.activity-item:hover {
  background-color: #f8f9fa;
}

.activity-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
}

.activity-content {
  flex: 1;
}

.activity-name {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.activity-title {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.activity-time {
  font-size: 0.8rem;
  color: #999;
}

.activity-match {
  font-weight: bold;
  font-size: 0.9rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.activity-match--high {
  background-color: #d4edda;
  color: #155724;
}

.activity-match--medium {
  background-color: #fff3cd;
  color: #856404;
}

.activity-match--low {
  background-color: #f8d7da;
  color: #721c24;
}

@media (max-width: 768px) {
  .activity-item {
    gap: 0.75rem;
    padding: 0.5rem;
  }
  
  .activity-avatar {
    width: 35px;
    height: 35px;
    font-size: 0.8rem;
  }
  
  .activity-name {
    font-size: 0.9rem;
  }
  
  .activity-title {
    font-size: 0.8rem;
  }
  
  .activity-time {
    font-size: 0.75rem;
  }
}
</style>
