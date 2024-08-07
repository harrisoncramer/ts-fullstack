<template>
  <p>The users are:</p>
  <div
    v-for="(user, i) in users"
    :key="i"
  >
    {{ user.first_name }} {{ user.last_name }} (Id is {{ user.id }})
  </div>
  <NewUserForm />
</template>

<script setup lang="ts">
import { User } from '@/stores/users'
import NewUserForm from './NewUserForm.vue'

type Props = {
  users: User[]
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
