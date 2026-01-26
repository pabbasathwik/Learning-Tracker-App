
<template>
  <nav class="navbar">
    <!-- LEFT: App name -->
    <div class="navbar-left" @click="goDashboard">
      Intern Learning Tracker
    </div>

    <!-- CENTER: Navigation links -->
    <div class="navbar-center">
      <button class="nav-btn" @click="navigate('/dashboard')">Dashboard</button>
      <button class="nav-btn" @click="navigate('/add-learning')">Add Learning</button>
      <button class="nav-btn" @click="navigate('/learning-list')">Learning History</button>
    </div>

    <!-- RIGHT: User info & logout -->
    <div class="navbar-right">
      <span class="user-label">Intern</span>
      <button class="logout-btn" @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

/* Generic navigation handler */
function navigate(path) {
  if (route.path === path) {
    alert("You are already on this page");
    return;
  }
  router.push(path);
}

function logout() {
  // later we will clear token here
  router.push("/login");
}
</script>

<style scoped>
.navbar {
  height: 60px;
  background: linear-gradient(90deg, #0f172a, #020617);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

/* LEFT */
.navbar-left {
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
}

/* CENTER */
.navbar-center {
  display: flex;
  gap: 16px;
}

.nav-btn {
  background: transparent;
  border: none;
  color: #e5e7eb;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 6px;
  transition: background 0.2s;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.12);
}

/* RIGHT */
.navbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-label {
  font-size: 14px;
  opacity: 0.9;
}

.logout-btn {
  background: #ef4444;
  border: none;
  color: white;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.logout-btn:hover {
  background: #dc2626;
}
</style>
