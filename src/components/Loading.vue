<template>
  <div class="c-loading">
    <div
      v-if="error && !loading"
      class="text-red-400"
    >
      {{ error }}
    </div>
    <div v-else-if="loading">
      Loading...
    </div>
    <div v-else>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  loading: boolean,
  error?: any | null,
}

withDefaults(defineProps<Props>(), {
  loading: false,
  error: null,
})
</script>
