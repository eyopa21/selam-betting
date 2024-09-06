<script setup lang="ts">
import type { CasinoRoot } from '../../types/casino/games'

const props = defineProps <{
  games: CasinoRoot
}>()
const tempImg = ref('https://client.qtlauncher.com/images/?id=1x2-plinkogo_en_US&type=logo-square&version=1677489299406')
</script>

<template>
  <div>
    <h3 class="text-white tw-text-xl">
      Play by categories
    </h3>
    <div class="no-scrollbar tw-mt-8 tw-flex tw-max-w-full tw-flex-row tw-gap-4 tw-overflow-auto">
      <div v-for="i in props.games" :key="i.id" class="tw-m-1">
        <q-avatar size="140px" font-size="52px" color="primary" text-color="white" class="tw-cursor-pointer tw-ring-1 tw-transition-all tw-duration-500 hover:tw-scale-105">
          <q-img :src="tempImg" />
        </q-avatar>
      </div>
    </div>
  </div>
</template>
