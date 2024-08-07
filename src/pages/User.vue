<template>
  <Loading
    :loading="loading"
    :error="error"
  >
    <div
      v-if="user"
      class="individual-user"
    >
      <RouterLink to="/">
        Back
      </RouterLink>
      <h1>{{ user?.firstName }} {{ user?.lastName }}</h1>
      <label>Company</label>
      <span>{{ user?.company }}</span>
      <label>Email</label>
      <span>{{ user?.email }}</span>
      <label>Phone Number</label>
      <span>{{ user?.phoneNumber }}</span>
    </div>
    <div v-else>
      Invalid ID/No User Found
    </div>
  </Loading>
</template>
<script setup lang="ts">
import { useUsersStore } from "@/stores"
import { User } from "@/types"
import { onMounted, ref } from "vue"
import { RouterLink } from "vue-router"
import { useRoute } from 'vue-router'
import Loading from "@/components/Loading.vue"

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
    error.value = err as Error
  }
})
</script>
<style lang="pcss" scoped>
.individual-user {
  @apply flex flex-col;
}
label {
  @apply font-bold text-lg;
}
</style>
