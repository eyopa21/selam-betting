export type ContactChatRoot = {
  count: number
  next: string | null
  previous: string | null
  results: Result[]
}

export type Result = {
  id: string
  attachment: string
  user: User
  agent: string | null
  regional_manager: string | null
  shop: string | null
  comments: Comment[]
  subject: string
  phone_number: string | null
  email: string | null
  first_name: string | null
  description: string
  status: string
  priority: string
  created_at: string
  updated_at: string
  client_package: string
}

export type Comment = {
  id: string
  user: User
  replays_to_comment: unknown[]
  comment: string
  created_at: string
  ticket: string
}

export type User = {
  id: string
  username: string
  email: string
  phone_number: string
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
  latitude: string | null
  longitude: string | null
}
