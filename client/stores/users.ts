import { defineStore } from "pinia";
import { ref } from "vue";
import { init } from "@/stores/utils"
import { getApiV1Users, GetApiV1UsersResponse } from "@/api";

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
