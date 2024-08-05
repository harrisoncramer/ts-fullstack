# Typescript Full-Stack OpenAPI Template

This is my full stack Typescript application using Vue and Express.

The project is designed to use OpenAPI to generate a schema for both the client and the server, to keep the APIs in sync, and share types across both sides of the stack.


## Development

```bash
npm run start
```

This will start the express server and the Vite frontend. Both are set up to hot reload when you make any changes to the source files.

When adding or modifying APIs, simply add to the `server/api.yaml` file and then run `build:api` to rebuild the clients.

## Build

```bash
npm run build
```

This will build the API clients, compile the NodeJS Express server into `dist-server` and compile the Vite content into `dist-client`
