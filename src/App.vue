<template>
  <div class="app">
    <RouterView v-slot="{ Component }">
      <transition name="fade">
        <component
          :is="Component"
          transition
        />
      </transition>
    </RouterView>
  </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
