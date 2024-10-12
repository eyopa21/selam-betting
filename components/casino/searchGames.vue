<script setup lang="ts">
const route = useRoute('casino-search')
const q = ref<string>(route.params.query as string)
const loading = ref(false)
function search() {
  navigateTo(`/casino/search/${q.value}`)
}

function clear() {
  navigateTo('/casino')
}
</script>

<template>
  <div class="tw-flex tw-gap-2 tw-self-stretch ">
    <!-- <q-input v-model="q" :clearable="true" placeholder="Search for your Games" type="text" class="tw-w-128 tw-block tw-rounded-xl tw-border-0 tw-bg-inherit tw-py-1.5 tw-pl-7 tw-pr-20 tw-text-white  tw-ring-1 tw-ring-inset tw-ring-primary-500 placeholder:tw-text-secondary-500 focus:tw-outline-none focus:tw-ring-gray-200 sm:tw-text-sm sm:tw-leading-6" /> -->

    <q-input v-model="q" color="secondary" clearable type="text" class="tw-w-full lg:tw-w-[26rem]" bg-color="primary" outlined label="Search for your Games" label-color="grey-5" input-class="tw-text-white" @clear="clear()" />

    <q-btn :loading color="primary" label="Let's Look" dense text-color="blue-grey-2" class="tw-px-8  " @click="search()" />
  </div>
</template>
