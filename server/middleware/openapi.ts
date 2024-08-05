import * as OpenApiValidator from 'express-openapi-validator'
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const spec = path.join(path.dirname(__filename), '..', 'api.yaml');

export default OpenApiValidator.middleware({
  apiSpec: spec,
  validateRequests: true,
  validateResponses: true,
})
