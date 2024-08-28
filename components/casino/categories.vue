<script setup lang="ts">
import { type CasinoGame } from '../../types/casino/games'

const props = defineProps < {
    games: CasinoGame[]
}>()

</script>

<template>
    <div>
        <h3 class="tw-text-xl text-white">Play by categories</h3>
        <div class="tw-flex tw-mt-8 tw-flex-row tw-overflow-auto no-scrollbar tw-gap-4 tw-max-w-full">
            <div v-for="i in props.games" class="tw-m-1">
                <q-avatar size="140px" font-size="52px" color="primary" text-color="white" class="tw-ring-1 hover:tw-scale-105 tw-transition-all tw-duration-500 tw-cursor-pointer" >
                    <q-img :src="i.image" />                    
                 </q-avatar>
            </div>
        </div>

    </div>
</template>