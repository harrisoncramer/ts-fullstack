<template>
  <div v-if="loading">
    Loading...
  </div>
  <div v-else>
    <slot />
  </div>
</template>

<script setup lang="ts">
type Props = {
  loading: boolean,
  error?: any | null,
}

withDefaults(defineProps<Props>, {
  loading: false,
  error: null,
})
</script>
