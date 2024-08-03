<template>
  <Loading
    :loading="!ready"
    :error="error"
  >
    <SomeComponent message="cool" />
  </Loading>
</template>

<script setup lang="ts">
import { useUsersStore } from '@/stores'
import SomeComponent from '@/components/SomeComponent.vue'
import Loading from '@/components/Loading.vue'
import { storeToRefs } from 'pinia'

const usersStore = useUsersStore()
const { ready, error } = storeToRefs(usersStore)
</script>
