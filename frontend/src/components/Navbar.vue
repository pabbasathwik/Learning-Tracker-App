<template>
  <nav class="navbar">
    <!-- Left: App name -->
    <div class="navbar-left" @click="goDashboard">
      Intern Learning Tracker
    </div>

    <!-- Right: user info / logout later -->
    <div class="navbar-right">
      <span class="user-label">Intern</span>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function goDashboard() {
  router.push("/dashboard");
}
</script>

<style scoped>
.navbar {
  height: 60px;
  background: #0f172a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

.navbar-left {
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
}

.navbar-right {
  font-size: 14px;
  opacity: 0.9;
}
</style>
