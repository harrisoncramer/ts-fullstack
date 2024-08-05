import { ref } from "vue"

type ReadySync = Promise<void> | null
type CallbackArgs = {
  useCache?: boolean,
}

export function init (cb: (opts?: CallbackArgs) => Promise<void>) {
  const ready = ref(false)
  const running = ref(false)
  const error = ref<Error | null>(null)
  const readySync = ref<ReadySync>(null)

  async function _getData (opts?: CallbackArgs): Promise<void> {
    running.value = true
    try {
      await cb(opts)
    } catch (e) {
      const err = e as Error
      error.value = err
    } finally {
      running.value = false
      ready.value = true
    }
  }

  function refresh (opts: CallbackArgs = { useCache: false }) {
    if (opts.useCache && (ready.value || running.value)) return readySync.value /* Initializing store, used cached data if available */
    readySync.value = _getData(opts)
    return readySync.value
  }

  return {
    error,
    ready,
    readySync,
    refresh,
  }
}
