import axios from 'axios'
import { defineStore } from "pinia"
import { User } from 'shared/types'
import urls from "shared/urls"
import { ref, watch } from "vue"

import usePagination from "@/composables/usePagination"
import { init } from "@/stores/utils"

export const useUsersStore = defineStore('Users', () => {
  const users = ref<User[]>([]) // A slice of the users data, used for the table.
  const hasMoreUsers = ref(true)

  const { limit, page } = usePagination()
  const { error, ready, readySync, refresh, loading } = init(async () => {
    const url = `${urls.users.base}?page=${page.value}&limit=${limit.value}`
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
    const { data } = await axios.get(urls.users.byId.replace(":id", id))
    return data
  }

  async function addUser (newUser: Omit<User, 'id'>): Promise<User> {
    const { data } = await axios.post(urls.users.base, newUser)
    refresh()
    return data
  }

  async function removeUser ({ id }: { id: string }): Promise<User> {
    const { data } = await axios.delete(urls.users.byId.replace(":id", id))
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
