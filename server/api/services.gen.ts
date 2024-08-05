// This file is auto-generated by @hey-api/openapi-ts

import { type Options, createClient, createConfig } from '@hey-api/client-axios';
import type { GetApiV1UsersError, GetApiV1UsersResponse } from './types.gen';

export const client = createClient(createConfig());

/**
 * Returns a list of users.
 */
export const getApiV1Users = (options?: Options) => { return (options?.client ?? client).get<GetApiV1UsersResponse, GetApiV1UsersError>({
    ...options,
    url: '/api/v1/users'
}); };