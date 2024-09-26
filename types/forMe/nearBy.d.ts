export type NearByRoot = {
  count: number
  next: string | null
  previous: string | null
  results: Result[]
}

export type Result = {
  id: string
  user_account: UserAccount
  profile_picture: string
  id_images: IdImage[]
  approval: boolean
  is_bet_for_me_agent: boolean
  created_at: string
  modified_at: string
  distance: number
}

export type UserAccount = {
  id: string
  username: string
  phone_number: string
  email: string
  first_name: string
  last_name: string
  address: Address
}

export type Address = {
  address_line: string
  admin_area: string | null
  locality: string | null
  postal_code: string | null
  thoroughfare: string | null
  premise: string | null
  sub_premise: string | null
  latitude: string
  longitude: string
}

export type IdImage = {
  id: string
  image: string
  created_at: string
  modified_at: string
}
