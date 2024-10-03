<script setup lang="ts">
const { $authentication } = useNuxtApp()
const currentPage = ref(1)
const type = 'to_user'
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
    {{ data?.results }}
    <div v-if="status === 'pending'">
      <SkeletonsNearbySearch v-for="i in 4" :key="i" />
    </div>
    <q-list v-else>
      <q-expansion-item
        v-for="i in data?.results"
        :key="i.id"
        switch-toggle-side
        icon="perm_identity"
        label="Account settings"
        class="tw-border-b"
      >
        <template #header>
          <div class="tw-flex tw-w-full tw-flex-wrap tw-items-stretch tw-self-end ">
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
          </div>
        </template>
        <q-card>
          <q-card-section>
            <pre> {{ i }}</pre>
          </q-card-section>
        </q-card>
      </q-expansion-item>

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
</template>
