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
            <div v-for="i in props.games">
                <q-avatar size="100px" font-size="52px" color="primary" text-color="white">
                    <q-img :src="i.image" />
                 </q-avatar>
            </div>
        </div>

    </div>
</template>