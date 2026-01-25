<template>
  <div class="auth-page">
    <AuthHeader />

    <div class="auth-content">
      <div class="auth-card">
        <h2>Login</h2>
        <p class="auth-subtitle">Welcome back 👋</p>

        <label>Email</label>
        <input type="email" v-model="email" placeholder="you@example.com" autocomplete="off"/>
        <p v-if="errors.email" class="error">{{ errors.email }}</p>

        <label>Password</label>
        <input type="password" v-model="password" placeholder="password" autocomplete="new-password"/>
        <p v-if="errors.password" class="error">{{ errors.password }}</p>

        <button @click="login">Sign In</button>

        <div class="auth-footer">
          Don’t have an account?
          <span @click="$router.push('/register')">Register</span>
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

const router = useRouter();

const email = ref("");
const password = ref("");

const { errors, clearErrors, isRequired, isEmail } = useValidation();

function login() {
  clearErrors();

  let valid = true;

  if (!isRequired(email.value, "email") || !isEmail(email.value, "email"))
    valid = false;

  if (!isRequired(password.value, "password"))
    valid = false;

  if (!valid) return;

  router.push("/dashboard");
}
</script>
