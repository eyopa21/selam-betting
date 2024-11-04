<script setup lang="ts">
const isOpen = ref(false)
const { status, data, send, open, close } = useWebSocket(useRuntimeConfig().public.webSocketEndpoint)
const history = ref<string[]>([])
watch(data, (newValue) => {
  history.value.push(`server: ${newValue}`)
})

const message = ref('')
function sendData() {
  history.value.push(`client: ${message.value}`)
  send(message.value)
  message.value = ''
}

watch(data, () => {
  if (data) {
    isOpen.value = true
  }
})

function approve() {
  console.log('approve')
}
function decline() {
  console.log('decline')
}
</script>

<template>
  <div>
    <h1>WebSocket - let's go! {{ status }} {{ data }}</h1>

    <q-dialog v-model="isOpen" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="add_alert" color="primary" text-color="white" />
          <span class="q-ml-sm">Please approve the cashout request!</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-close-popup flat label="Decline" color="primary" />
          <q-btn v-close-popup flat label="Approve" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
