import { flushPromises, mount } from '@vue/test-utils'
import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'
import { createPinia, setActivePinia } from 'pinia'
import users from 'shared/mocks/users'
import urls from 'shared/urls'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import User from '@/pages/User.vue'

const user = users.at(0)!
const mockAxios = new AxiosMockAdapter(axios)

vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({ query: {}, params: { id: user.id } })),
  useRouter: vi.fn(() => ({
    push: vi.fn()
  }))
}))

function setup () {
  setActivePinia(createPinia())
  return mount(User)
}

describe('User.vue', () => {
  beforeEach(() => {
    mockAxios.reset()
    mockAxios.onGet(`${urls.users.base}?page=1&limit=20`).reply(() => [200, {
      users,
      meta: {
        hasMore: false,
      }
    }])
  })
  it('Should render the user name', async () => {
    mockAxios.onGet(urls.users.byId.replace(":id", user.id)).reply(200, user)
    const wrapper = setup()
    await flushPromises()
    const name = wrapper.find("h1")
    expect(name.text()).toBe(`${user.firstName} ${user.lastName}`)
  })
  it('Should handle a 500 bad server response', async () => {
    const errMsg = 'Something went wrong in the database'
    mockAxios.onGet(urls.users.byId.replace(":id", user.id)).reply(500, { error: errMsg })
    const wrapper = setup()
    await flushPromises()
    const emptyState = wrapper.find('.loading-error')
    expect(emptyState.text()).toBe(errMsg)
  })
  it('Should handle a 404 error', async () => {
    const errMsg = "User not found!"
    mockAxios.onGet(urls.users.byId.replace(":id", user.id)).replyOnce(() => [404, { error: errMsg }])
    const wrapper = setup()
    await flushPromises()
    const loadingErr = wrapper.find('.loading-error')
    expect(loadingErr.text()).toBe(errMsg)
  })
})
