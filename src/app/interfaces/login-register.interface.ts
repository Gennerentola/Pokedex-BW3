export interface RegisterUser {
    name: string,
    email: string,
    password: string

}

export interface LoginUser {
    email: string,
    password: string
}

export interface AuthUser {

    accessToken: string,
    user: {
        email: string,
        name: string,
        id: number
    }
}
