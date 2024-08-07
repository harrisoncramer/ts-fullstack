<template>
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
      v-for="user in data.slice(range[0], range[1])"
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
    :disabled="nextDisabled"
    :class="{
      'text-gray-500': nextDisabled,
    }"
    @click="handleNext"
  >
    Next
  </button>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import data from "@/data"
import { ref } from 'vue'
import { computed } from 'vue'

const PAGE_SIZE = 20
const range = ref([0, PAGE_SIZE])

const backDisabled = computed(() => range.value[0] === 0)
const nextDisabled = computed(() => range.value[1] >= data.length)

function handleNext () {
  const [start, end] = range.value
  range.value = [start!+PAGE_SIZE, end!+PAGE_SIZE]
}

function handlePrevious () {
  const [start, end] = range.value
  if(start === 0) return
  range.value = [start!-PAGE_SIZE, end!-PAGE_SIZE]
}

const router = useRouter()
async function goToUser (id: string)  {
  await router.push({
    name: 'individual-user',
    params: { id },
  })
}

</script>
<style lang="pcss">
</style>
