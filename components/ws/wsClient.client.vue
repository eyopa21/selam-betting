<script setup lang="ts">
const { $authentication } = useNuxtApp()
const userStore = useUserStore()
type Message = {
  message: {
    message: string
  }
}

const message = ref(undefined)
const eventSource = new EventSource(`/api/websocket?token=${encodeURIComponent($authentication.accessToken.value)}`)

eventSource.onmessage = (event) => {
  console.log('Message from server:', event.data) // Logs "Hello world" every second
  message.value = event.data
}

eventSource.onerror = () => {
  console.error('Error with the event stream')
  eventSource.close() // Close the connection if there's an error
}

const parsedMessage = computed<Message>(() => {
  if (message.value) {
    return JSON.parse(message.value) ?? undefined
  } else {
    return undefined
  }
})
const openModal = computed(() => {
  return parsedMessage.value?.message.message !== 'Request for cash out approval, Please approve in one minute'
  // return true
})

function approveCashout() {

}
</script>

<template>
  <q-dialog v-model="openModal" persistent transition-show="scale" transition-hide="scale">
    <q-card class="bg-white text-black" style="width: 500px">
      <q-card-section>
        <div class="text-h6 tw-font-bold">
          Dear {{ userStore.user?.user.first_name }},
        </div>
      </q-card-section>
      <q-separator />

      <q-card-section v-if="parsedMessage" class="q-pt-none tw-py-16 tw-pt-8 tw-text-xl">
        {{ parsedMessage?.message.message ?? parsedMessage.message }}
      </q-card-section>
      <q-separator />

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="Cancel" @click="message = undefined" />
        <q-btn label="Approve" color="primary" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
