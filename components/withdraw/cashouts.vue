<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const { copy, copied, isSupported } = useClipboard()
const { $authentication } = useNuxtApp()
const columns = ref([

  { name: 'date', label: 'Date Of Request', field: 'date' },
  { name: 'amount', label: 'Amount', field: 'amount' },
  { name: 'code', label: 'Cashout Code', field: 'code' },
  { name: 'status', label: 'Status', field: 'status' },
  { name: 'delete', label: '', field: 'delete' },
  { name: 'copy', label: '', field: 'copy' },

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
  <q-expansion-item
    dense label="WITHDRAWAL REQUESTS" header-class="bg-red-10 text-white"
    expand-icon-class="text-white" expand-icon="keyboard_double_arrow_down"
  >
    <div>
      <div class=" tw-border-gray-400 ">
        <q-table :loading="status === 'pending'" dense hide-pagination flat bordered :rows="data ?? []" :columns="columns" row-key="name">
          <template #top>
            <WithdrawProcessCashout @refetch="refetch()" />
          </template>

          <template #body="props">
            <q-tr :props="props" class="!tw-h-10">
              <q-td key="date" :props="props">
                <p>{{ formatDate(props.row.created_at) }}</p>
              </q-td>
              <q-td key="amount" :props="props">
                <div class="tw-w-16">
                  <p>{{ props.row.amount }}</p>
                </div>
              </q-td>

              <q-td key="code" :props="props">
                <div class="tw-w-16">
                  {{ props.row.code }}
                </div>
              </q-td>
              <q-td key="status" :props="props">
                <div class="tw-w-16">
                  <q-badge color="blue">
                    PENDING
                  </q-badge>
                </div>
              </q-td>
              <q-td v-if="isSupported" key="copy" :props="props">
                <q-btn v-if="!copied" flat icon="content_copy" @click="copy(props.row.code)">
                  <q-tooltip>
                    Copy Code
                  </q-tooltip>
                </q-btn>
                <span v-else>Copied!</span>
              </q-td>
              <q-td key="status" :props="props" class="!tw-pl-4">
                <q-btn color="red" :loading icon="delete" flat size="md" @click="deleteVoucher(props.row.id)">
                  <q-tooltip class="bg-red">
                    Delete This Voucher
                  </q-tooltip>
                </q-btn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-expansion-item>
</template>
