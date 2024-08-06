import { getApiV1Users, getApiV1UsersByUserId } from "@/api"
import { defineStore } from "pinia"
import { init } from "@/stores/utils"
import { ref } from "vue"

type User = {
    first_name: string;
    last_name: string;
    id: number;
}

export const useUsersStore = defineStore('Users', () => {
  const users = ref<User[]>([])

  const { error, ready, readySync, refresh } = init(async () => {
    const { data } = await getApiV1Users()
    users.value = data
  })

  async function getUserById (id: number): Promise<User> {
    const { data } = await getApiV1UsersByUserId({ path: { userId: id } })
    return data
  }

  refresh({ useCache: true })

  return {
    users,
    error,
    ready,
    readySync,
    refresh,
    getUserById,
  }
})
