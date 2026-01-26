<template>
  <Navbar />

  <div class="dashboard">
    <!-- Welcome -->
    <div class="dashboard-header">
      <h2>Welcome, User👋</h2>
      <p>Here’s a quick overview of your internship progress</p>
    </div>

    <!-- Summary Cards -->
    <div class="dashboard-cards">
      <div class="stat-card">
        <h4>Total Skills</h4>
        <div class="value">{{ totalLearnings }}</div>
      </div>

      <div class="stat-card">
        <h4>Total Tasks</h4>
        <div class="value">{{ totalLearnings }}</div>
      </div>

      <div class="stat-card">
        <h4>Completed Tasks</h4>
        <div class="value">{{ totalLearnings }}</div>
      </div>

      <div class="stat-card">
        <h4>Progress</h4>
        <div class="value">{{ progress }}%</div>
      </div>
    </div>

    <!-- Progress -->
    <div class="progress-section">
      <h3>Overall Progress</h3>
      <p>Based on completed tasks</p>

      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="totalLearnings === 0" class="empty-state">
      No learning added yet. Start by adding your first learning!
    </div>

    <!-- Preview -->
    <div v-else class="preview-section">
      <div class="preview-card">
        <h3>Recent Learnings</h3>
        <div
          class="preview-item"
          v-for="item in recentLearnings"
          :key="item.id"
        >
          {{ item.topic }} ({{ item.session }})
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { onMounted, computed } from "vue";
import Navbar from "../components/Navbar.vue";
import { useLearningStore } from "../stores/learningStore";
import { useAuthStore } from "../stores/authStore";



const store = useLearningStore();
const store1 = useAuthStore();
onMounted(() => {
  store.fetchLearnings();
});

const totalLearnings = computed(() => store.learnings.length);
const progress = computed(() => {
  if (totalLearnings.value === 0) return 0;
  return Math.min((totalLearnings.value / 10) * 100, 100);
});

const recentLearnings = computed(() =>
  store.learnings.slice(0, 3)
);
</script>

