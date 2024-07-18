export type LoginResponse = {
    access: string
    refresh: string
}

export type AuthSessionSchema = {
    access_token: string,
    refresh_token: string,
    user_id: string,
    user_name: string,
    email: string,
    phone_number: string
}

export interface Auth {
    id: string
    username: string
    phone_number: string
    email: string
    first_name: string
    last_name: string
    address?: Address
}

export interface Address {
    address_line: string
    admin_area: string
    locality: string
    postal_code: string
    thoroughfare: string
    premise: string
    sub_premise: string
    latitude: string
    longitude: string
}
