<template>
  <div id="app">
    <!-- Header -->
    <header class="header">
      <div class="header-left">
        <div class="logo">HR Tech</div>
      </div>
      <div class="header-center">
        <h1 class="header-title">Hệ thống tuyển dụng thông minh</h1>
      </div>
      <div class="header-right">
        <div class="notification-icon">
          <i class="icon-bell">🔔</i>
        </div>
        <div class="user-avatar">
          <div class="avatar">HR</div>
          <span class="user-role">HR Manager</span>
        </div>
      </div>
    </header>

    <div class="app-container">
      <!-- Sidebar -->
      <aside class="sidebar">
        <nav class="sidebar-nav">
          <router-link to="/" class="nav-item" :class="{ active: $route.path === '/' }">
            <i class="nav-icon">📊</i>
            <span>Tổng quan</span>
          </router-link>
          <router-link to="/cv-analysis" class="nav-item" :class="{ active: $route.path === '/cv-analysis' }">
            <i class="nav-icon">📄</i>
            <span>Phân tích CV</span>
          </router-link>
          <router-link to="/jd-evaluation" class="nav-item" :class="{ active: $route.path === '/jd-evaluation' }">
            <i class="nav-icon">👥</i>
            <span>Đánh giá JD</span>
          </router-link>
          <router-link to="/cv-database" class="nav-item" :class="{ active: $route.path === '/cv-database' }">
            <i class="nav-icon">🗄️</i>
            <span>Cơ sở dữ liệu CV</span>
          </router-link>
          <router-link to="/reports" class="nav-item" :class="{ active: $route.path === '/reports' }">
            <i class="nav-icon">📈</i>
            <span>Báo cáo</span>
          </router-link>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// App component logic here
</script>

<style scoped>
#app {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-left .logo {
  font-family: 'Pacifico', cursive;
  font-size: 1.5rem;
  font-weight: normal;
  color: #2c3e50;
}

.header-center .header-title {
  font-size: 1.2rem;
  color: #2c3e50;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.notification-icon {
  font-size: 1.2rem;
  cursor: pointer;
}

.user-avatar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.user-role {
  font-size: 0.9rem;
  color: #666;
}

.app-container {
  display: flex;
  min-height: calc(100vh - 80px);
}

.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 1rem 0;
  height: calc(100vh - 80px);
  overflow: hidden;
  position: sticky;
  top: 80px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s;
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background-color: #34495e;
}

.nav-item.active {
  background-color: #007bff;
  border-left-color: #0056b3;
}

.nav-icon {
  font-size: 1.1rem;
}

.main-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  height: calc(100vh - 80px);
}

@media (max-width: 768px) {
  .app-container {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    order: 2;
    height: auto;
    position: static;
    overflow: visible;
  }
  
  .sidebar-nav {
    flex-direction: row;
    overflow-x: auto;
  }
  
  .nav-item {
    white-space: nowrap;
    min-width: 120px;
  }
  
  .main-content {
    padding: 1rem;
    height: auto;
  }
}
</style>
