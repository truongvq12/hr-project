<template>
  <div class="quick-action" :class="`quick-action--${color}`" @click="handleClick">
    <div class="action-icon">
      {{ icon }}
    </div>
    <div class="action-content">
      <div class="action-title">{{ title }}</div>
      <div class="action-description">{{ description }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
  icon: string
  color: 'blue' | 'green' | 'purple'
}

defineProps<Props>()

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
.quick-action {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.quick-action:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.quick-action--blue {
  background-color: #e3f2fd;
  border-color: #bbdefb;
}

.quick-action--blue:hover {
  background-color: #bbdefb;
}

.quick-action--green {
  background-color: #e8f5e8;
  border-color: #c8e6c9;
}

.quick-action--green:hover {
  background-color: #c8e6c9;
}

.quick-action--purple {
  background-color: #f3e5f5;
  border-color: #e1bee7;
}

.quick-action--purple:hover {
  background-color: #e1bee7;
}

.action-icon {
  font-size: 1.5rem;
  width: 50px;
  height: 50px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
}

.action-content {
  flex: 1;
}

.action-title {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.25rem;
  font-size: 0.95rem;
}

.action-description {
  font-size: 0.85rem;
  color: #666;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .quick-action {
    padding: 0.75rem;
    gap: 0.75rem;
  }
  
  .action-icon {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
  
  .action-title {
    font-size: 0.9rem;
  }
  
  .action-description {
    font-size: 0.8rem;
  }
}
</style>
