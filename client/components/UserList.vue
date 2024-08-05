<template>
  <p>The users are:</p>
  <div
    v-for="(user, i) in users"
    :key="i"
  >
    {{ user.first_name }} {{ user.last_name }}
  </div>
</template>

<script setup lang="ts">
import { GetApiV1UsersResponse } from "@/api"
type Props = {
  users: GetApiV1UsersResponse,
}

withDefaults(defineProps<Props>(), {
  users: () => [],
})
</script>
<style lang="pcss" scoped>
p {
  @apply text-green-200;
}
</style>
