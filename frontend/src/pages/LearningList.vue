<template>
  <Navbar />

  <div class="dashboard">
  <!-- HEADER -->
  <div class="list-header">
    <div class="list-header-left">
      <h2>Daily Learning History</h2>
    </div>

    <button class="add-learning-btn" @click="goToAdd">
      + Add Learning
    </button>
  </div>



    <div class="learning-table">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Session</th>
            <th>Topic</th>
            <th>Time (hrs)</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in learnings" :key="item.id">
            <td>{{ item.date }}</td>
            <td>{{ item.session }}</td>
            <td>{{ item.topic }}</td>
            <td>{{ item.timeSpent }}</td>
            <td>
              <button class="edit-btn" @click="editLearning(item)">
                Edit
              </button>
              <button class="delete-btn" @click="deleteLearning(item.id)">
                Delete
              </button>
            </td>
          </tr>

          <tr v-if="learnings.length === 0">
            <td colspan="5">No learning added yet</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
    <button class="back-link1" @click="$router.push('/dashboard')">
        ← Back to Dashboard
      </button>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import Navbar from "../components/Navbar.vue";
import { useLearningStore } from "../stores/learningStore";
import { onMounted } from "vue";

onMounted(() => {
  store.fetchLearnings();
});


const router = useRouter();
const store = useLearningStore();

/* ✅ Read learning data from Pinia store */
const learnings = computed(() => store.learnings);

/* Navigate to add page */
function goToAdd() {
  router.push("/add-learning");
}

/* Navigate to edit page */
function editLearning(item) {
  router.push({
    path: "/add-learning",
    query: { id: item.id }
  });
}

/* Delete learning (Pinia action) */
function deleteLearning(id) {
  if (!confirm("Are you sure you want to delete this learning?")) return;
  store.deleteLearning(id);
}
</script>
