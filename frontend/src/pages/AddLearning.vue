<template>
  <Navbar />

  <div class="form-container">
    <h2 class="form-title">Add Daily Learning</h2>
    <p class="form-subtitle">
      Log what you learned today in a structured way
    </p>

    <!-- ✅ FORM START -->
    <form @submit.prevent="saveLearning">

      <!-- Date -->
      <div class="form-group">
        <label>Date</label>
        <input type="date" v-model="date" />
      </div>

      <!-- Session -->
      <div class="form-group">
        <label>Session</label>
        <div class="session-options">
          <button
            type="button"
            class="session-btn"
            :class="{ active: session === 'Morning' }"
            @click="session = 'Morning'"
          >
            Morning
          </button>

          <button
            type="button"
            class="session-btn"
            :class="{ active: session === 'Afternoon' }"
            @click="session = 'Afternoon'"
          >
            Afternoon
          </button>
        </div>
      </div>

      <!-- Topic -->
      <div class="form-group">
        <label>Topic / Skill</label>
        <input
          type="text"
          placeholder="e.g. Vue Composition API"
          v-model="topic"
        />
      </div>

      <!-- Description -->
      <div class="form-group">
        <label>What did you learn?</label>
        <textarea
          placeholder="Explain clearly what you learned today..."
          v-model="description"
        ></textarea>
      </div>

      <!-- Time -->
      <div class="form-group">
        <label>Time Spent (in hours)</label>
        <input type="number" min="0.5" step="0.5" v-model="timeSpent" placeholder="Type how many hours you have worked"/>
      </div>

      <!-- Submit -->
      <button type="submit" class="submit-btn">
        {{ isEdit ? "Update Learning" : "Save Learning" }}
      </button>

    </form>
    <!-- ✅ FORM END -->
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Navbar from "../components/Navbar.vue";
import { useLearningStore } from "../stores/learningStore";
import { useValidation } from "../composables/useValidation";

/* Router */
const router = useRouter();
const route = useRoute();
/* Store */
const learningStore = useLearningStore();

/* Form fields */
const today = new Date();
const date = ref(today.toISOString().split("T")[0]);
const session = ref("Morning");
const topic = ref("");
const description = ref("");
const timeSpent = ref(1);

/* Edit mode */
const isEdit = ref(false);
const editId = ref(null);

/* Validation */
const {
  errors,
  clearErrors,
  isRequired,
  minLength,
  minValue
} = useValidation();

/* On page load */
onMounted(async () => {
  if (!route.query.id) return;

  try {
    const existingLearning = await learningStore.getById(
      Number(route.query.id)
    );

    if (!existingLearning) {
      console.warn("Learning not found");
      return;
    }

    isEdit.value = true;
    editId.value = existingLearning.id;
    date.value = existingLearning.date;
    session.value = existingLearning.session;
    topic.value = existingLearning.topic;
    description.value = existingLearning.description;
    timeSpent.value = existingLearning.timeSpent;
  } catch (err) {
    console.error("Failed to load learning", err);
  }
});



/* Save or Update learning */
async function saveLearning() {
  clearErrors();

  let valid = true;

  if (!isRequired(date.value, "date")) valid = false;
  if (!isRequired(session.value, "session")) valid = false;
  if (!minLength(topic.value, 3, "topic")) valid = false;
  if (!minLength(description.value, 10, "description")) valid = false;
  if (!minValue(timeSpent.value, 0.5, "timeSpent")) valid = false;

  if (!valid) return;

  const learningData = {
    date: date.value,
    session: session.value,
    topic: topic.value,
    description: description.value,
    timeSpent: timeSpent.value
  };
try{
  if (isEdit.value) {
    await learningStore.updateLearning(editId.value, learningData);
    alert("Learning updated successfully!");
  } else {
    await learningStore.addLearning(learningData);
    alert("Learning added successfully!");
  }


 router.push("/learning-list");
  } catch (err) {
    alert("Failed to save learning. Please try again.");
    console.error(err);
  }
}
</script>

