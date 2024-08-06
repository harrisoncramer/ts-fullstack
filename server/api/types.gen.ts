// This file is auto-generated by @hey-api/openapi-ts

export type User = {
    first_name: string;
    last_name: string;
    id: number;
};

export type GetApiV1UsersByUserIdData = {
    path: {
        /**
         * Numeric ID of the user
         */
        userId: number;
    };
};

export type GetApiV1UsersByUserIdResponse = User;

export type GetApiV1UsersByUserIdError = unknown;

export type GetApiV1UsersResponse = Array<User>;

export type GetApiV1UsersError = unknown;

export type $OpenApiTs = {
    '/api/v1/users/{userId}': {
        get: {
            req: GetApiV1UsersByUserIdData;
            res: {
                /**
                 * A JSON object of a single user
                 */
                '200': User;
            };
        };
    };
    '/api/v1/users': {
        get: {
            res: {
                /**
                 * A JSON array of user names
                 */
                '200': Array<User>;
            };
        };
    };
};