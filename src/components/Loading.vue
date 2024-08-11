<template>
  <div class="c-loading">
    <div
      v-if="error && !loading"
      class="loading-error"
    >
      {{ msg }}
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
import { computed } from 'vue'

import { isAxiosError } from '@/types'

type Props = {
  loading: boolean,
  error?: any | null,
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  error: null,
})

const msg = computed(() => {
  console.log(props.error)
  const axiosMsg = props.error.response?.data?.error || 'Unknown network error occurred'
  return isAxiosError(props.error) ? axiosMsg : props.error
})
</script>
<style lang="pcss" scoped>
.loading-error {
  @apply text-red-400;
}
</style>
