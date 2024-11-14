export type BetForMeRoot = {
  id: string
  user_profile: UserProfile
  approval: boolean
  reason: string
  created_at: string
  modified_at: string
}

export type UserProfile = {
  id: string
  user_account: UserAccount
  profile_picture: string
  id_images: IdImage[]
  approval: boolean
  level: string
  is_bet_for_me_agent: boolean
  bet_for_me_request: string
  created_at: string
  modified_at: string
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
  admin_area: string
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
