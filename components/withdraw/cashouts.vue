<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const { copy, copied, isSupported } = useClipboard()

const { $authentication } = useNuxtApp()
const columns = ref([
  { name: 'amount', label: 'Amount', field: row => row.amount, format: val => `${val}`, align: 'left' },
  { name: 'date', label: 'Date Of Request', field: row => formatDate(row.created_at), format: val => `${val}`, align: 'left' },
  { name: 'code', label: 'Cashout Code', field: row => row.code, format: val => `${val}`, align: 'left' },
  { name: 'status', label: 'Status', field: row => row.status ? 'Approved' : 'Pending', format: val => `${val}`, align: 'left' },
  { name: 'actions', label: 'Actions', align: 'center' },

])
const { formatDate } = useHelpers()
const { data, error, status, execute: refetch } = useLazyFetch('/api/finance/get-cashouts', {
  server: false,
  headers: {
    Authorization: `Bearer ${$authentication.accessToken.value}`,
  },
})
if (error.value) {
  useErrorNotifications(error)
}
const loading = ref(false)
async function deleteVoucher(voucherId: string) {
  loading.value = true
  try {
    const res = await $fetch('/api/finance/delete-cashout-voucher', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${$authentication.accessToken.value}`,
      },
      body: {
        voucherId,
      },
    })
    if (res) {
      await refetch()
      useSuccessNotification('Voucher Deleted Successfully')
    }
  } catch (err) {
    useErrorNotifications(ref(err))
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="tw-p-4">
    <div>
      <p class="tw-text-base">
        Withdrawal Requests
      </p>
    </div>

    <div class="q-mt-md ">
      <q-table :loading="status === 'pending'" hide-pagination flat bordered :rows="data ?? []" :columns="columns" row-key="name">
        <template #top-right>
          <WithdrawProcessCashout @refetch="refetch()" />
        </template>

        <template #body-cell-actions="props">
          <q-td :props="props">
            <q-btn v-if="isSupported" size="sm" flat icon="content_copy" @click="copy(props.row.code)">
              <q-tooltip>
                Copy Voucher Code
              </q-tooltip>
            </q-btn>

            <q-btn color="negative" size="sm" icon="delete" flat @click="deleteVoucher(props.row.id)">
              <q-tooltip class="bg-negative">
                Delete Voucher
              </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
  <q-dialog v-model="copied" position="right" seamless>
    <q-card class="bg-primary">
      <q-card-section>
        <p class="text-white">
          Voucher Code Copied
        </p>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
