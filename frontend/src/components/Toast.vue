<template>
  <transition name="slide-fade">
    <div v-if="visible" class="toast" :class="type">
      <span class="toast-message">{{ message }}</span>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  message: String,
  type: {
    type: String,
    default: "success" // success | error | info
  },
  visible: Boolean
});
</script>

<style scoped>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  min-width: 260px;
  padding: 14px 18px;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  z-index: 9999;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.success { background: #16a34a; }
.error   { background: #dc2626; }
.info    { background: #2563eb; }

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
