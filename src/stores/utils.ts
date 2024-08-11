import { AxiosError, AxiosResponse } from "axios"
import { ref } from "vue"

import { isAxiosError } from "@/types"

type ReadySync = Promise<void> | null
type CallbackArgs = {
  useCache?: boolean,
}

type ErrorJson = {
  error: string
}

export function init (cb: (opts?: CallbackArgs) => Promise<void>) {
  const ready = ref(false)
  const loading = ref(false)
  const error = ref<Error | null>(null)
  const readySync = ref<ReadySync>(null)

  async function _getData (opts?: CallbackArgs): Promise<void> {
    loading.value = true
    try {
      await cb(opts)
    } catch (e) {
      const err = e as Error | AxiosError
      if (isAxiosError(e)) {
        const axiosResponse = e.response as AxiosResponse<ErrorJson>
        error.value = new Error(axiosResponse.data.error || 'An unknown error occurred')
      } else {
        error.value = err
      }
    } finally {
      loading.value = false
      ready.value = true
    }
  }

  function refresh (opts: CallbackArgs = { useCache: false }) {
    if (opts.useCache && (ready.value || loading.value)) return readySync.value /* Initializing store, used cached data if available */
    readySync.value = _getData(opts)
    return readySync.value
  }

  return {
    error,
    ready,
    loading,
    readySync,
    refresh,
  }
}
