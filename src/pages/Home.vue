<template>
  <h1>Hello World!</h1>
  <RouterLink to="/users">
    Users Page
  </RouterLink>
  <RouterView />
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
