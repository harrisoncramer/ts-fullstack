import { defineStore } from "pinia"
import { ref, watch } from "vue"
import axios from 'axios'
import { init } from "@/stores/utils"
import urls from "@/urls"
import { User } from '@/types'
import usePagination from "@/composables/usePagination"

export const useUsersStore = defineStore('Users', () => {
  const users = ref<User[]>([]) // A slice of the users data, used for the table.
  const hasMoreUsers = ref(true)

  const { limit, page } = usePagination()
  const { error, ready, readySync, refresh, loading } = init(async () => {
    const url = `${urls.users.list}?page=${page.value}&limit=${limit.value}`
    const { data } = await axios.get(url)
    users.value = data.users
    hasMoreUsers.value = data.meta.hasMore
  })

  refresh({ useCache: true })

  /* When query parameters change for limit or page, update the locally cached data */
  watch([limit, page], () => {
    refresh()
  })

  async function getUserById({ id }: { id: string }): Promise<User> {
    const user = users.value.find((user) => user.id === id)
    if(user) return user // User may be available locally, if not, fetch them from the DB
    const { data } = await axios.get(`/api/v1/users/${id}`)
    return data
  }

  async function addUser (newUser: Omit<User, 'id'>): Promise<User> {
    const { data } = await axios.post('/api/v1/users', newUser)
    refresh()
    return data
  }

  async function removeUser ({ id }: { id: string }): Promise<User> {
    const { data } = await axios.delete(`/api/v1/users/${id}`)
    refresh()
    return data
  }

  return {
    users,
    error,
    ready,
    loading,
    readySync,
    refresh,
    addUser,
    removeUser,
    getUserById,
    hasMoreUsers,
  }
})
