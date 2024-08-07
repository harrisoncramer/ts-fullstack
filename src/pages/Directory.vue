<template>
  <Loading
    :loading="loading"
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
        <td>
          {{ user.firstName }}
        </td>
        <td>
          {{ user.lastName }}
        </td>
        <td>
          {{ user.email }}
        </td>
        <td>
          {{ user.phoneNumber }}
        </td>
        <td>
          {{ user.company }}
        </td>
      </tr>
    </table>
  </Loading>
  <button
    :disabled="backDisabled"
    class="nav-button mr-2"
    :class="{
      'bg-gray-300 cursor-not-allowed': backDisabled,
      'bg-white': !backDisabled,
    }"
    @click="handlePrevious"
  >
    Previous
  </button>
  <button
    :disabled="!hasMoreUsers"
    class="nav-button"
    :class="{
      'bg-gray-300 cursor-not-allowed': !hasMoreUsers,
      'bg-white': hasMoreUsers,
    }"
    @click="handleNext"
  >
    Next
  </button>
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
const { loading, error, users, hasMoreUsers } = storeToRefs(usersStore)

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
table {
  @apply border border-white text-left;
  th {
    @apply border;
  }
  td {
    @apply px-2 py-1 border border-white;
  }
}

.nav-button {
  @apply text-black rounded-sm px-4 mt-2;
}
</style>
