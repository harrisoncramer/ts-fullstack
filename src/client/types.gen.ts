// This file is auto-generated by @hey-api/openapi-ts

export type GetApiV1UsersResponse = Array<{
    first_name: string;
    last_name: string;
}>;

export type GetApiV1UsersError = unknown;

export type $OpenApiTs = {
    '/api/v1/users': {
        get: {
            res: {
                /**
                 * A JSON array of user names
                 */
                '200': Array<{
                    first_name: string;
                    last_name: string;
                }>;
            };
        };
    };
};