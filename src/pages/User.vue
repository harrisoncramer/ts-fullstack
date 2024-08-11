<template>
  <Loading
    :loading="loading"
    :error="error"
    class="m-4"
  >
    <div class="individual-user">
      <button
        class="nav-button"
        @click="goBack"
      >
        Back
      </button>
      <h1>{{ user?.firstName }} {{ user?.lastName }}</h1>
      <label>Company</label>
      <span>{{ user?.company }}</span>
      <label>Email</label>
      <span>{{ user?.email }}</span>
      <label>Phone Number</label>
      <span>{{ user?.phoneNumber }}</span>
      <button
        class="delete-button"
        @click="handleDeleteUser"
      >
        Delete
      </button>
    </div>
  </Loading>
</template>
<script setup lang="ts">
import { User } from "shared/types"
import { onMounted, ref } from "vue"
import { useRoute, useRouter } from 'vue-router'

import Loading from "@/components/Loading.vue"
import { useUsersStore } from "@/stores"

const usersStore = useUsersStore()
const route = useRoute()
const id = route.params.id as string
const user = ref<User| null>(null)
const loading = ref(true)
const error = ref<Error | null>(null)
onMounted(async() => {
  try {
    user.value = await usersStore.getUserById({ id })
    loading.value = false
  } catch (err) {
    loading.value = false
    error.value = err as Error
  }
})

const router = useRouter()
function goBack () {
  router.back()
}

async function handleDeleteUser () {
  await usersStore.removeUser({ id })
  alert("User deleted!")
  goBack()
}
</script>
<style lang="pcss" scoped>
.individual-user {
  @apply flex flex-col items-start;
}
label {
  @apply font-bold text-lg;
}
.delete-button {
  @apply bg-red-400 text-black rounded-sm px-2 py-2 mt-4;
}
</style>
