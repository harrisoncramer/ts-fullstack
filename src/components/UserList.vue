<template>
  <p>The users are:</p>
  <ul class="flex flex-col w-[300px] gap-2">
    <li
      v-for="(user, i) in users"
      :key="i"
      class="flex justify-between"
    >
      {{ user.first_name }} {{ user.last_name }} ({{ user.id }})
      <button
        class="bg-red-400 px-2 py-2 rounded-sm"
        @click="handleRemoveUser(user.id)"
      >
        Remove User
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { User, useUsersStore } from '@/stores/users'

type Props = {
  users: User[]
}

withDefaults(defineProps<Props>(), {
  users: () => [],
})

const usersStore = useUsersStore()
function handleRemoveUser (id: number) {
  usersStore.removeUser({ id })
}

</script>
<style lang="pcss" scoped>
p {
  @apply text-green-200;
}
</style>
