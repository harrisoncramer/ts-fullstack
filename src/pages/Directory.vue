<template>
  <Loading
    :loading="!ready"
    :error="error"
  >
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Company</th>
        </tr>
      </thead>
      <tr
        v-for="user in users"
        :key="`${user.id}`"
        @click="goToUser(user.id)"
      >
        <th>
          {{ user.firstName }}
        </th>
        <th>
          {{ user.lastName }}
        </th>
        <th>
          {{ user.email }}
        </th>
        <th>
          {{ user.phoneNumber }}
        </th>
        <th>
          {{ user.company }}
        </th>
      </tr>
    </table>
    <button
      :disabled="backDisabled"
      :class="{
        'text-gray-500': backDisabled,
      }"
      @click="handlePrevious"
    >
      Previous
    </button>
    <button
      :disabled="!hasMoreUsers"
      :class="{
        'text-gray-500': !hasMoreUsers,
      }"
      @click="handleNext"
    >
      Next
    </button>
  </Loading>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import Loading from '@/components/Loading.vue'
import { useUsersStore } from '@/stores/users'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import usePagination from '@/composables/usePagination'

const router = useRouter()
const usersStore = useUsersStore()
const { ready, error, users, hasMoreUsers } = storeToRefs(usersStore)

const { limit, page } = usePagination()
const backDisabled = computed(() => page.value === 1)

function handleNext () {
  router.push({
    name: 'directory',
    query: {
      page: page.value + 1,
      limit: limit.value,
    },
  })
}

function handlePrevious () {
  if(page.value === 0) return
  router.push({
    name: 'directory',
    query: {
      page: page.value - 1,
      limit: limit.value,
    },
  })
}

async function goToUser (id: string)  {
  await router.push({
    name: 'individual-user',
    params: { id },
  })
}

</script>
<style lang="pcss">
</style>
