<template>
  <Navbar />

  <div class="dashboard">
    <!-- Welcome -->
    <div class="dashboard-header">
      <h2>Welcome, Sathwik 👋</h2>
      <p>Here’s a quick overview of your internship progress</p>
    </div>
       <button class="add-learning-btn" @click="goToAddLearning">
        + Add Daily Learning
      </button>

    <!-- Summary Cards -->
    <div class="dashboard-cards">
      <div class="stat-card">
        <h4>Total Skills</h4>
        <div class="value">5</div>
      </div>

      <div class="stat-card">
        <h4>Total Tasks</h4>
        <div class="value">10</div>
      </div>

      <div class="stat-card">
        <h4>Completed Tasks</h4>
        <div class="value">6</div>
      </div>

      <div class="stat-card">
        <h4>{{Progress}}</h4>
        <div class="value">60%</div>
      </div>
    </div>

    <!-- Progress -->
    <div class="progress-section">
      <h3>Overall Progress</h3>
      <p>Based on completed tasks</p>

      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: Progress + '%' }"></div>
      </div>
    </div>

    <!-- Preview -->
    <div class="preview-section">
      <!-- Skills -->
      <div class="preview-card">
        <h3>Current Skills</h3>
        <div class="preview-item">HTML & CSS</div>
        <div class="preview-item">JavaScript</div>
        <div class="preview-item">Vue 3</div>
      </div>

      <!-- Tasks -->
      <div class="preview-card">
        <h3>Recent Tasks</h3>
        <div class="preview-item">Build Login Page</div>
        <div class="preview-item">Create Dashboard Layout</div>
        <div class="preview-item">Implement Validation</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import Navbar from "../components/Navbar.vue";
import { useLearningStore } from "../stores/learningStore";


const router = useRouter();
const store = useLearningStore();

onMounted(() => {
  store.fetchLearnings();
});

const totalLearnings = computed(() => store.learnings.length);
const Progress = computed(() => {
  if (totalLearnings.value === 0) return 0;
  return Math.min((totalLearnings.value / 10) * 100, 100);
});

const totalHours = computed(() =>
  store.learnings.reduce((sum, l) => sum + l.timeSpent, 0)
);
function goToAddLearning() {
  router.push("/add-learning");
}

</script>

