import type { User } from '../auth/user-info.d.ts'

export type CashoutRoot = Root2[]

export type Root2 = {
  id: string
  user: User
  amount: string
  code: string
  created_at: string
  modified_at: string
}
