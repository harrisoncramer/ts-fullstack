import { vi } from 'vitest'

import { isAxiosError } from '@/types'

const originalLog = console.log
vi.spyOn(console, 'log').mockImplementation((e) => {
  if(isAxiosError(e) && !process.env.DEBUG) return
  originalLog(e)
})
