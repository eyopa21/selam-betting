<script setup lang="ts">
import type { BonusRoot } from '~/types/finance/bonuses'

type Column<T> = {
  name: string
  label: string
  field: keyof T | ((row: T) => string)

  align?: 'left' | 'center' | 'right'
}

const { $authentication } = useNuxtApp()
const { formatDate } = useHelpers()
const columns: Ref<Column<BonusRoot['results'][number]>[]> = ref([
  { name: 'total_bonus_amount', label: 'Bonus Amount', field: row => row.total_bonus_amount, align: 'left' },
  { name: 'unlocked', label: 'Unlocked Amount', field: row => row.unlocked_amount, align: 'left' },
  { name: 'remaining', label: 'Locked Amount', field: row => row.remaining_amount, align: 'left' },
  { name: 'status', label: 'Status', field: row => row.is_referral_bonus ? 'From Referral' : row.is_welcome_bonus ? 'Welcome Bonus' : 'Deposit Bonus', align: 'left' },
  { name: 'date', label: 'Expiry Date', field: row => formatDate(row.expires_at), align: 'left' },

])
const { data, error, status } = useLazyFetch('/api/finance/get-bonuses', {
  server: false,
  headers: {
    Authorization: `Bearer ${$authentication.accessToken.value}`,
  },
})
if (error.value) {
  useErrorNotifications(error)
}
</script>

<template>
  <div class="tw-space-y-4 tw-rounded-md tw-bg-white">
    <div class="tw-grid tw-grid-cols-1 tw-gap-8">
      <div class="tw-rounded-lg tw-p-4">
        <div>
          <p class="tw-rounded-lg tw-text-base">
            Your Bonus Earnings
          </p>
        </div>

        <div class="q-mt-md ">
          <q-table
            :loading="status === 'pending'" hide-pagination flat bordered :rows="data?.results ?? []"
            :columns="columns" row-key="name"
          />
        </div>
      </div>
    </div>
  </div>
</template>
