<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const { text, copy, copied, isSupported } = useClipboard()
const { $authentication } = useNuxtApp()
const columns = ref([

  { name: 'date', label: 'Date Of Request', field: 'date' },
  { name: 'amount', label: 'Amount', field: 'amount' },
  { name: 'code', label: 'Cashout Code', field: 'code' },
  { name: 'status', label: 'Status', field: 'status' },
  { name: 'copy', label: '', field: 'copy' },

])
const { formatDate } = useHelpers()
const { data, error, status } = useLazyFetch('/api/finance/get-cashouts', {
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
  <q-expansion-item
    dense label="WITHDRAWAL REQUESTS" header-class="bg-red-10 text-white"
    expand-icon-class="text-white" expand-icon="keyboard_double_arrow_down"
  >
    <div>
      <div class=" tw-border-gray-400 ">
        <q-table :loading="status === 'pending'" dense hide-pagination flat bordered :rows="data ?? []" :columns="columns" row-key="name">
          <template #top>
            <WithdrawProcessCashout />
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
              <q-td v-if="isSupported" key="copy" :props="props" class="!tw-pl-16">
                <q-btn v-if="!copied" flat icon="content_copy" @click="copy(props.row.code)" />
                <span v-else>Copied!</span>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-expansion-item>
</template>
