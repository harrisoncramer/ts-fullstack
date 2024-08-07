<template>
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
</template>
<script setup lang="ts">
import { RouterLink } from "vue-router"
import { useRoute } from 'vue-router'
import data from "@/data"

const route = useRoute()
const id: string = route.params.id
const user = data.find((user) => user.id === id)
</script>
<style lang="pcss" scoped>
.individual-user {
  @apply flex flex-col;
}
label {
  @apply font-bold text-lg;
}
</style>
