<template>
  <Loading
    :loading="!ready"
    :error="error"
  >
    <UsersList :users="users" />
  </Loading>
</template>

<script setup lang="ts">
import { useUsersStore } from '@/stores'
import UsersList from '@/components/UserList.vue'
import Loading from '@/components/Loading.vue'
import { storeToRefs } from 'pinia'
const usersStore = useUsersStore()
const { ready, error, users } = storeToRefs(usersStore)
</script>
