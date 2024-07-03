<template>
  <div>
    <q-dialog v-model="props.showDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Terms of Agreement</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <p v-for="n in 15" :key="n">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit
            voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem
            aut, natus minima, porro labore.</p>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn :disabled="props.loading" @click="emit('close')" flat label="Decline" color="primary" v-close-popup />
          <q-btn :loading="props.loading" @click="emit('confirm')" flat label="Accept And Book" color="primary"
            v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>

</template>

<script setup lang="ts">


const props = withDefaults(defineProps<
  {
    showDialog: boolean,
    loading: boolean
  }
>(), {
  showDialog: false,
  loading: false
})

const emit = defineEmits<{
  confirm: [void],
  close: [void]
}>()

</script>