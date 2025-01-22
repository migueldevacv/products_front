import { IntUser, IntUserToken } from "./UserInterface";

export interface IntResLogin {
    message: string;
    status: boolean;
    data: IntUserToken;
}

export interface IntResRegister {
    message: string;
    status: boolean;
    data: IntUserToken;
}

export interface IntReqLogin extends Pick<IntUser, 'email'>, Pick<IntUser, 'password'> { }

export interface IntReqRegister extends Pick<IntUser, 'email'>, Pick<IntUser, 'password'>, Pick<IntUser, 'name'> { }