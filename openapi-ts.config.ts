// We are building this twice so that we can ship the types
// to both the client and the server!

const OUT = process.env.SERVER ? 'server/api' : 'src/api'

export default {
  client: '@hey-api/client-axios',
  input: 'server/api.yaml',
  output: OUT,
}
