export type Root = {
  user: User
  payout_balance: PayoutBalance
  stake_balance: StakeBalance
}

export type User = {
  id: string
  username: string
  phone_number: string
  email: string
  first_name: string
  last_name: string
  address: Address
}

export type Address = {
  address_line: string | null
  admin_area: string | null
  locality: string | null
  postal_code: string | null
  thoroughfare: string | null
  premise: string | null
  sub_premise: string | null
  latitude: string | null
  longitude: string | null
}

export type PayoutBalance = {
  id: string
  user: string
  balance: string | null
  created_at: string
  modified_at: string
}

export type StakeBalance = {
  id: string
  user: string
  stake_balance: string
  created_at: string
  modified_at: string
}
