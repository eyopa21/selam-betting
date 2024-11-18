<script setup lang="ts">
const { $authentication } = useNuxtApp()
const userStore = useUserStore()
type Message = {
  message: {
    message: string
  }
}
const showPassword = ref(false)
const state = ref({
  password: '',
})
const message = ref(undefined)

const { data, error, status } = useLazyFetch('/api/finance/get-cashouts', {
  server: false,
  headers: {
    Authorization: `Bearer ${$authentication.accessToken.value}`,
  },
})
if (error.value) {
  useErrorNotifications(error)
}
const eventSource = new EventSource(`/api/betForMe/send-notification?token=${encodeURIComponent($authentication.accessToken.value)}`)

eventSource.onmessage = (event) => {
  console.log('Message from server:', event.data)
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
  return parsedMessage.value?.message.message === 'Request for cash out approval, Please approve in one minute'
  // return true
})

const loading = ref(false)

async function approveCashout() {
  loading.value = true
  try {
    if (data.value && data.value[0]) {
      const response = await $fetch(`/api/betForMe/approve-cashout/${data.value![0].id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${$authentication.accessToken.value}`,
        },
        body: {
          code: data.value![0].code,
          password: state.value.password,
        },
      })
      if (response) {
        useSuccessNotification('Transaction Approval successfull')
        state.value.password = ''
        message.value = undefined
      }
    } else {
      useErrorNotifications(ref('Please check your connection and try again'))
    }
  } catch (err) {
    useErrorNotifications(ref(err))
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <q-dialog v-model="openModal" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-white text-black" style="width: 500px">
        <q-form @submit="approveCashout()">
          <q-card-section>
            <div class="text-h6 tw-flex tw-items-start tw-gap-4  tw-font-bold">
              Dear {{ userStore.user?.user.first_name }}, <VUECountdown @time-out="message = undefined" />
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section v-if="parsedMessage" class="q-pt-none tw-py-16 tw-pt-8 tw-text-xl">
            <div v-if="status === 'pending'">
              <q-spinner
                color="primary"
              />
            </div>
            <div v-else>
              {{ parsedMessage?.message.message ?? parsedMessage.message }}
              <q-input
                v-model="state.password"
                outlined
                dense
                :type="!showPassword ? 'password' : 'text'"
                label="Your Password *"
                lazy-rules
                :rules="[(val: string) => (val && val.length > 0) || 'Invalid password']"
              >
                <template #append>
                  <q-icon
                    :name="showPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </q-input>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="Cancel" @click="message = undefined" />
            <q-btn label="Approve" color="primary" type="submit" :loading />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>
