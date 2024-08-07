<template>
    <div class="q-pa-md q-gutter-sm">
        <q-dialog v-model="dialog" persistent maximized transition-show="slide-up" transition-hide="slide-down">
            <q-card class="bg-primary text-white">
                <q-bar>
                    <q-space />


                    <q-btn @click="emit('close')" dense flat icon="close" v-close-popup>
                        <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                    </q-btn>
                </q-bar>

                <q-card-section>
                    <div class="text-h6">Play</div>
                </q-card-section>

                <q-card-section class="q-pt-none tw-h-full">
                  
                    <iframe id="contentiframe"
                        :src="props.gameLink"
                        :allowfullscreen="true" style="width: 100%; height: 100%;"></iframe>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup lang="ts"> 
const props = defineProps<{
    gameLink: string
}>()

const emit = defineEmits<{
    close: [void]
}>()
            const dialog =  ref(true)
           

</script>
