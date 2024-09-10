export type SignInInputs = {
  username: string
  phoneNumber?: string
  password: string
  remember?: boolean
}

type Address = {
  address_line: string
  admin_area: string | null
  locality: string | null
  postal_code: string | null
  thoroughfare: string | null
  premise: string | null
  sub_premise: string | null
  latitude: number | null
  longitude: number | null
}

export type SignUpInputs = {
  username: string
  email: string
  password: string
  password2: string
  first_name: string
  last_name: string
  phone_number: string
  address: Address
}
