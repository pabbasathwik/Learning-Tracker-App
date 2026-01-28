# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
<!-- What it does: main.js

starts Vue app
registers Pinia (state)
registers Router
mounts app to HTML
🔍 Debug tip:
If app doesn’t load → check here first -->

<!-- What it does: App.vue
renders pages based on URL -->

<!-- 👉 What it does: routes/index.js

decides which page loads for which URL
handles route guards (auth protection)
Debug tip:

Wrong page loading? → check path here
Blank page? → component import issue -->

<!-- 
👉 What it does: services/api.js

single place for backend URL
automatically attaches token

🔍 Debug tip:

Network Error → backend not running / wrong port
401 error → token missing here
 -->

 <!-- stores/authStore.js
 👉 What it does:

stores logged-in user

stores JWT token

makes auth API calls
  -->

  <!-- stores/learningStore.js
  
  👉 What it does:

talks to /api/learning

stores learning list in memory -->

<!-- composables/useValidation.js
Reusable validation logic

👉 What it does:

avoids duplicate validation code

keeps forms clean

🔍 Debug tip:

If error not showing → log errors object -->


