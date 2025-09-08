<template>
  <div class="counter-demo">
    <h3>Counter Demo with Pinia Store</h3>
    <div class="counter-display">
      <p class="count-value">Count: {{ count }}</p>
      <p class="double-count">Double: {{ doubleCount }}</p>
    </div>
    
    <div class="counter-controls">
      <button @click="decrement" class="btn btn-secondary">-</button>
      <button @click="increment" class="btn btn-primary">+</button>
      <button @click="reset" class="btn btn-success">Reset</button>
    </div>
    
    <div class="counter-info">
      <small>This counter uses Pinia for state management</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
const { count, doubleCount, increment, decrement, reset } = counterStore
</script>

<style scoped>
.counter-demo {
  text-align: center;
  padding: 1rem;
}

.counter-demo h3 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.counter-display {
  margin-bottom: 1.5rem;
}

.count-value {
  font-size: 2rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 0.5rem;
}

.double-count {
  font-size: 1.2rem;
  color: #666;
}

.counter-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.counter-controls .btn {
  min-width: 60px;
  font-size: 1.2rem;
  font-weight: bold;
}

.counter-info {
  color: #666;
  font-style: italic;
}
</style>
