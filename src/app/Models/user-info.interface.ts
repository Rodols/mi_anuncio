export type Roles = 'ADMIN' | 'NEIGHBOUR';

export interface userInfo {
    uid?:string,
    name?:string,
    email?:string,
    password?:string,
    direction?:string,
    radioControl?:string,
    phone?:number,
    role?:Roles
}