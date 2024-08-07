<template>
  <h3 class="font-bold mt-24">
    Add User
  </h3>
  <div class="flex gap-4 mt-6">
    <FloatLabel>
      <InputText v-model="firstName" />
      <label>First Name</label>
    </FloatLabel>
    <FloatLabel>
      <InputText v-model="lastName" />
      <label>Last Name</label>
    </FloatLabel>
    <Button
      label="Create"
      @click="handleCreateUser"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import Button from 'primevue/button'
import { useUsersStore } from "@/stores"

const firstName = ref("")
const lastName = ref("")

const usersStore = useUsersStore()
async function handleCreateUser () {
  if(!firstName.value || !lastName.value) return // More validations, etc
  try {
    await usersStore.addUser({ firstName: firstName.value, lastName: lastName.value })
    firstName.value = ""
    lastName.value = ""
  } catch (err) {
    console.log(err)
  }
}

</script>
<style lang="pcss" scoped>
input {
  @apply border-solid border-[1px] border-white rounded-md px-2 py-2;
}
</style>
