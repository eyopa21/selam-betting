<script setup lang="ts">
type TransactionType = 'withdraw' | 'to_cash' | 'to_user' | 'deposit'
const { $authentication } = useNuxtApp()
const currentPage = ref(1)
const type: TransactionType = 'to_cash'
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
      <q-list v-else>
        <q-list
          v-for="i in data?.results"
          :key="i.id"
        >
          <q-item>
            <q-card class="tw-w-full">
              <q-card-section class="tw-flex tw-w-full tw-flex-wrap tw-items-stretch tw-self-end ">
                <span class="tw-flex-1  tw-px-4 tw-py-2 ">
                  {{ i.game_name }} ({{ i.transaction_type }})
                </span>
                <span class="tw-flex-1  tw-px-4 tw-py-2 ">
                  {{ i.id }}
                </span>
                <span class=" tw-basis-48  tw-px-4 tw-py-2 ">
                  {{ i.amount }} ETB
                </span>
                <span class=" tw-basis-48  tw-px-4 tw-py-2 ">
                  {{ formatDate(i.time_stamp) }}
                </span>
              </q-card-section>
            </q-card>
          </q-item>
        </q-list>
        <div class="tw-my-8 tw-flex tw-w-full tw-justify-end tw-p-4">
          <q-pagination
            v-if="data?.results"
            v-model="currentPage"
            :max="Math.ceil(data.count / 10)"
            direction-links
            gutter="20px"
            color="primary"
            active-color="secondary"
          />
        </div>
      </q-list>
    </div>
  </div>
</template>
