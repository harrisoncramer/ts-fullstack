<template>
  <p>The users are:</p>
  <div
    v-for="(user, i) in users"
    :key="i"
  >
    {{ user.first_name }} {{ user.last_name }}
  </div>
  <button
    class="rounded-md mt-2 px-2 py-1 bg-white text-black"
    @click="handleGetUser"
  >
    Get Random User
  </button>
</template>

<script setup lang="ts">
import { User } from "@/api"
import { useUsersStore } from "@/stores"
type Props = {
  users: User[],
}

const props = withDefaults(defineProps<Props>(), {
  users: () => [],
})

const usersStore = useUsersStore()
async function handleGetUser () {
  const randomId = Math.floor(Math.random() * props.users.length)
  const user = await usersStore.getUserById(randomId)
  alert(`User is: ${user.first_name} ${user.last_name}`)
}
</script>
<style lang="pcss" scoped>
p {
  @apply text-green-200;
}
</style>
