export interface SignInInputs {
    username: string;
    phoneNumber: string;
    password: string;
    remember: boolean;
}

interface Address {
    address_line: string;
    admin_area: string | null;
    locality: string | null;
    postal_code: string | null;
    thoroughfare: string | null;
    premise: string | null;
    sub_premise: string | null;
    latitude: number | null;
    longitude: number | null;
}

export interface SignUpInputs {
    username: string;
    email: string;
    password: string;
    password2: string;
    first_name: string;
    last_name: string;
    phoneNumber: string;
    address: Address;
}
