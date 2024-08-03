import { defineStore } from "pinia";
import { ref } from "vue";
import axios from 'axios'
import { init } from "./utils"
import urls from "../urls";

type User = {
  first_name: string,
  last_name: string,
}

export const useUsersStore = defineStore('Users', () => {
  const users = ref<User[]>([])

  const { error, ready, readySync, refresh } = init(async () => { 
    console.log("hi");
    const { data } = await axios.get(urls.users.list)
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
