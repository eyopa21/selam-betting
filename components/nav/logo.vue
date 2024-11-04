<script setup lang="ts">
const general = useGeneralClientInfo()
const logo = `${general.generalClientInfo?.nameAndLogo.logo_url}pp`
</script>

<template>
  <ClientOnly>
    <div v-if="logo" class=" tw-max-h-12 ">
      <q-img class="tw-flex tw-w-44 tw-items-center tw-justify-center " :src="logo" @click="navigateTo('/')">
        <template #loading>
          <q-skeleton type="QBtn" />
        </template>
        <template #error>
          <div class="tw-flex tw-max-h-12 tw-w-full tw-items-center tw-justify-center tw-rounded-xl tw-bg-red-500 tw-text-xs">
            {{ general.generalClientInfo?.nameAndLogo.client_name ?? 'Cannot load logo' }}
          </div>
        </template>
      </q-img>
    </div>
    <template #fallback>
      <q-skeleton type="QBtn" />
    </template>
  </ClientOnly>
</template>
