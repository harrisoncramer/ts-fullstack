const OUT = process.env.SERVER ? 'server/api' : 'src/client'

export default {
  client: '@hey-api/client-axios',
  input: 'server/api.yaml',
  output: OUT,
}
