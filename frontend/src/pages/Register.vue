<template>
  <div class="auth-page">
    <AuthHeader />

    <div class="auth-content">
      <div class="auth-card">
        <h2>Create Account</h2>
        <p class="auth-subtitle">Start your journey 🚀</p>

        <label>Full Name</label>
        <input v-model="name" placeholder="Enter your full name" autocomplete="off" />
        <p v-if="errors.name" class="error">{{ errors.name }}</p>

        <label>Email</label>
        <input type="email" v-model="email" placeholder="you@example.com" autocomplete="off"/>
        <p v-if="errors.email" class="error">{{ errors.email }}</p>

        <label>Password</label>
        <input type="password" v-model="password" placeholder="New Password" autocomplete="new-password"/>
        <p v-if="errors.password" class="error">{{ errors.password }}</p>

       <button @click="register" :disabled="loading">
       {{ loading ? "Creating..." : "Create Account" }}
       </button>


        <div class="auth-footer">
          Already have an account?
          <span @click="$router.push('/login')">Login</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import AuthHeader from "../components/AuthHeader.vue";
import { useValidation } from "../composables/useValidation";
import { useAuthStore } from "../stores/authStore";

const router = useRouter();
const authStore = useAuthStore();

/* Form fields */
const name = ref("");
const email = ref("");
const password = ref("");
const loading = ref(false);

/* Validation */
const { errors, clearErrors, isRequired, minLength, isEmail } = useValidation();

/* Register user */
async function register() {
  clearErrors();
  let valid = true;

  if (!isRequired(name.value, "name") || !minLength(name.value, 3, "name"))
    valid = false;

  if (!isRequired(email.value, "email") || !isEmail(email.value, "email"))
    valid = false;

  if (!isRequired(password.value, "password") || !minLength(password.value, 6, "password"))
    valid = false;

  if (!valid) return;

  loading.value = true;

  try {
    await authStore.register({
      name: name.value,
      email: email.value,
      password: password.value
    });

    alert("Registration successful. Please login.");
    router.push("/login");
  } catch (err) {
    console.error("Register error:", err);
    alert(err?.response?.data?.message || "Registration failed");
  } finally {
    loading.value = false;
  }
}



</script>
