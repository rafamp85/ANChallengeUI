export interface IAuth {
    ok: boolean,
    id: number,
    name: string,
    token: string,
    abilities: {
        englishLevel?: string,
        techKnowledge?: []
    },
    email?: string,
    msg?: string,
    role?:string
}