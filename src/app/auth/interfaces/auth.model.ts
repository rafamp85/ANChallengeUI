export interface IAuth {
    ok: boolean,
    id: number,
    name: string,
    token: string,
    email?: string,
    msg?: string,
    role?:string
}