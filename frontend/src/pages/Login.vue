<template>
  <div class="auth-page">
    <AuthHeader />

    <div class="auth-content">
      <div class="auth-card">
        <h2>Login</h2>
        <p class="auth-subtitle">Welcome back, {{ username}}👋</p>

        <label>Email</label>
        <input type="email" v-model="email" placeholder="you@example.com" autocomplete="off"/>
        <p v-if="errors.email" class="error">{{ errors.email }}</p>

        <label>Password</label>
        <input type="password" v-model="password" placeholder="password" autocomplete="new-password"/>
        <p v-if="errors.password" class="error">{{ errors.password }}</p>

        <button @click="login" :disabled="loading">
        {{ loading ? "Signing in..." : "Sign In" }}
        </button>


        <div class="auth-footer">
          Don’t have an account?
          <span @click="$router.push('/register')">Register</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import AuthHeader from "../components/AuthHeader.vue";
import { useValidation } from "../composables/useValidation";
import { useAuthStore } from "../stores/authStore";

const router = useRouter();
const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const loading = ref(false);

/* ✅ USERNAME COMPUTED */
const username = computed(() => {
  return authStore.user?.name || "User";
});

const { errors, clearErrors, isRequired, isEmail } = useValidation();

async function login() {
  clearErrors();
  let valid = true;

  if (!isRequired(email.value, "email") || !isEmail(email.value, "email"))
    valid = false;

  if (!isRequired(password.value, "password"))
    valid = false;

  if (!valid) return;

  loading.value = true;
  try {
    await authStore.login({
      email: email.value,
      password: password.value
    });

    router.push("/dashboard");
  } catch (err) {
    alert(err?.response?.data?.message || "Login failed");
  } finally {
    loading.value = false;
  }
}
</script>
