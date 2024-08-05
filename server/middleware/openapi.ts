import * as OpenApiValidator from 'express-openapi-validator'
import path from "path"
const __dirname = import.meta.dirname

export default (function () {
  const spec = path.join(__dirname, '..', 'api.yaml');
  return OpenApiValidator.middleware({
    apiSpec: spec,
    validateRequests: true,
    validateResponses: true,
  })
})()
