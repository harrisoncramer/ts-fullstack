<template>
  <p>{{ message }}</p>
</template>

<script setup lang="ts">

type Props = {
  message?: string
}

withDefaults(defineProps<Props>(), {
  message: 'Some default message',
})
</script>
<style lang="postcss" scoped>
p {
  @apply text-red-200;
}
</style>
