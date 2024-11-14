<script setup lang="ts">
type TransactionType = 'withdraw' | 'to_cash' | 'to_user' | 'deposit'
const { $authentication } = useNuxtApp()
const currentPage = ref(1)
const type: TransactionType = 'to_cash'
const initialPagination = ref({

  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
})

const { data, error, status } = useLazyFetch('/api/finance/get-transactions', {
  method: 'post',
  headers: {
    Authorization: `Bearer ${$authentication.accessToken.value}`,
  },
  body: {
    page: currentPage,
    type,
  },
})

initialPagination.value.rowsNumber = data.value?.count

const columns = [
  {
    name: 'detail',
    required: true,
    label: 'Amount',
    align: 'left',
    field: row => `${row.amount} ETB`,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: 'detail',
    required: true,
    label: 'Transaction Type',
    align: 'left',
    field: row => row.transaction_type,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: 'detail',
    required: true,
    label: 'Transaction For',
    align: 'left',
    field: row => row.transaction_for,
    format: val => `${val}`,
    sortable: true,
  },

  {
    name: 'detail',
    required: true,
    label: 'Transfer By',
    align: 'left',
    field: row => row.transferred_by,
    format: val => `${val}`,
    sortable: true,
  },

  {
    name: 'detail',
    required: true,
    label: 'Timestamp',
    align: 'left',
    field: row => formatDate(row.time_stamp),
    format: val => `${val}`,

  },

]

watch(initialPagination, () => {
  requestData()
})

function onRequest(props) {
  initialPagination.value.page = props.pagination.page
  initialPagination.value.rowsPerPage = props.pagination.rowsPerPage
  currentPage.value = props.pagination.page
}

if (error.value) {
  useErrorNotifications(error)
}
</script>

<template>
  <div>
    <div v-if="status === 'pending'">
      <SkeletonsTransactionList v-for="i in 4" :key="i" />
    </div>
    <div v-else>
      <div v-if="!data?.results?.length">
        <VUEEmptyState type="Transaction" />
      </div>
      <div v-else>
        <q-table
          :pagination="initialPagination"
          class="no-shadow"
          title="Cashout History"
          :rows="data?.results"
          :columns="columns"
          row-key="name"
          @request="onRequest"
        />
      </div>
    </div>
  </div>
</template>
