import { defineStore } from "pinia"
import { ref } from "vue"
import axios from 'axios'
import { init } from "@/stores/utils"
import urls from "@/urls"

export type User = {
  first_name: string,
  last_name: string,
  id: number,
}

export const useUsersStore = defineStore('Users', () => {
  const users = ref<User[]>([])

  const { error, ready, readySync, refresh } = init(async () => {
    const { data } = await axios.get(urls.users.list)
    users.value = data
  })

  refresh({ useCache: true })

  async function addUser (data: { firstName: string, lastName: string }) {
    await axios.post('/api/v1/users', data)
    refresh()
  }

  async function removeUser ({ id }: { id: number }) {
    await axios.delete(`/api/v1/users/${id}`)
    refresh()
  }

  return {
    users,
    error,
    ready,
    readySync,
    refresh,
    addUser,
    removeUser,
  }
})
