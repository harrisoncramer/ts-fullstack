import { computed } from "vue"
import { useRoute } from "vue-router"

const LIMIT = 20
const PAGE = 1

export default function usePagination () {
  const route = useRoute()
  const limit = computed(() => Number(route.query?.limit) || LIMIT)
  const page = computed(() => Number(route.query?.page) || PAGE)
  return {
    page,
    limit
  }
}
