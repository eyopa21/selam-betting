export type TransactionRoot = {
  count: number
  next: string | null
  previous: string | null
  results: Result[]
}

export type Result = {
  id: string
  amount: string
  transaction_type: string
  ticket: string | null
  transaction_for: string
  transferred_by: string
  transaction_code: string
  time_stamp: string
  is_casino_game: boolean
  to_user_stake: string | null
  to_agent_payout: string | null
  from_user_pay_out: string | null
  game_name: string
  bet_for_me_agent_bonus: string | null
}
