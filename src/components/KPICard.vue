<template>
  <div class="kpi-card" :class="`kpi-card--${color}`">
    <div class="kpi-icon">
      {{ icon }}
    </div>
    <div class="kpi-content">
      <h3 class="kpi-title">{{ title }}</h3>
      <div class="kpi-value">{{ value }}</div>
      <div class="kpi-change" :class="`kpi-change--${changeType}`">
        {{ change }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  value: string
  change: string
  icon: string
  color: 'blue' | 'green' | 'orange' | 'purple'
}

const props = defineProps<Props>()

const changeType = computed(() => {
  return props.change.startsWith('+') ? 'positive' : 'negative'
})
</script>

<style scoped>
.kpi-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s ease;
}

.kpi-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.kpi-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.kpi-card--blue .kpi-icon {
  background-color: #e3f2fd;
}

.kpi-card--green .kpi-icon {
  background-color: #e8f5e8;
}

.kpi-card--orange .kpi-icon {
  background-color: #fff3e0;
}

.kpi-card--purple .kpi-icon {
  background-color: #f3e5f5;
}

.kpi-content {
  flex: 1;
}

.kpi-title {
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 0.5rem 0;
  font-weight: 500;
}

.kpi-value {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.kpi-change {
  font-size: 0.85rem;
  font-weight: 500;
}

.kpi-change--positive {
  color: #28a745;
}

.kpi-change--negative {
  color: #dc3545;
}

@media (max-width: 768px) {
  .kpi-card {
    padding: 1rem;
  }
  
  .kpi-icon {
    font-size: 1.5rem;
    width: 50px;
    height: 50px;
  }
  
  .kpi-value {
    font-size: 1.5rem;
  }
}
</style>
