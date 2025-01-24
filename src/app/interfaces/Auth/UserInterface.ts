import { IntResponse } from "../Response";

export interface IntResUsers extends IntResponse {
    data: IntUser[]
}

export interface IntUser {
    id:                number;
    name:              string;
    email:             string;
    password?:         string;
    email_verified_at: null;
    created_at:        null;
    updated_at:        null;
    role_id:           number;
    status:            number;
}

export interface IntUserToken {
    user:  IntUser;
    token: string;
}
