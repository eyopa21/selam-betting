<script setup lang="ts">
const page = ref(1)
const { data, error, status } = useLazyFetch('/api/casino/get-groups', {
  server: false,
  method: 'post',
  body: {
    page,
  },
})
if (error.value) {
  useErrorNotifications(error)
}
</script>

<template>
  <div>
    <!-- <h3 class="text-white tw-text-xl">
      Play by categories
    </h3> -->

    <div v-if="status === 'pending'" class="no-scrollbar tw-mt-4 tw-flex tw-max-w-full tw-flex-row tw-gap-4 tw-overflow-auto">
      <div v-for="i in 12" :key="i" class="tw-m-1">
        <q-avatar size="200px" font-size="52px" color="primary" text-color="white" class="tw-cursor-pointer tw-ring-1 tw-transition-all tw-duration-500 hover:tw-scale-105 ">
          <q-skeleton type="circle" class="tw-size-full" />
        </q-avatar>
      </div>
    </div>
    <div v-else class="no-scrollbar tw-mt-4 tw-flex tw-max-w-full tw-flex-row tw-gap-4 tw-overflow-auto">
      <div v-for="i in data?.results" :key="i.id" class="tw-m-1">
        <q-avatar size="200px" font-size="52px" color="primary" text-color="white" class="tw-cursor-pointer tw-ring-1 tw-transition-all tw-duration-500 hover:tw-scale-105">
          <q-img :src="i.icon_url" />
        </q-avatar>
      </div>
    </div>
    <div class="tw-flex tw-justify-end">
      <div class="tw-space-x-2">
        <q-btn push round dense color="orange" text-color="black" icon="arrow_left" :disable="!data?.previous" @click="page--" />
        <q-btn push round dense color="orange" text-color="black" icon="arrow_right" :disable="!data?.next" @click="page++" />
      </div>
    </div>
  </div>
</template>
