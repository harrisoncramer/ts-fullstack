import { GetApiV1UsersResponse, getApiV1Users } from "@/api";
import { defineStore } from "pinia";
import { init } from "@/stores/utils"
import { ref } from "vue";

export const useUsersStore = defineStore('Users', () => {
  const users = ref<GetApiV1UsersResponse>([])

  const { error, ready, readySync, refresh } = init(async () => { 
    const { data } = await getApiV1Users()
    users.value = data
  })

  refresh({ useCache: true })

  return {
    users,
    error,
    ready,
    readySync,
    refresh,
  }
})
