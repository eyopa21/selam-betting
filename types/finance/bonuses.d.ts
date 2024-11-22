export type BonusRoot = {
  count: number
  next: string | null
  previous: string | null
  results: Result[]
}

export type Result = {
  id: string
  total_bonus_amount: string
  remaining_amount: string
  unlocked_amount: string
  is_referral_bonus: boolean
  is_welcome_bonus: boolean
  expires_at: string
}
