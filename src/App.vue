<template>
  <div class="app">
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
<style lang="pcss">
#app {
  @apply m-4;
}
</style>
