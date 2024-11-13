<script setup lang="ts">
const props = defineProps<{
  email: string
}>()
const emit = defineEmits<{
  finishVerify: [void]
}>()

const layout = useLayout()

const { error, loading, verifyOtp } = useAuth()
const State = ref({
  otp: '',
})
async function verifyOTP() {
  try {
    await verifyOtp(props.email, State.value.otp)
    layout.value.showRegister = false
    layout.value.showLogin = true
    emit('finishVerify')

    useSuccessNotification('Registered successfully')
  } catch (err) {
    useErrorNotifications(ref(err))
  }
}
</script>

<template>
  <div>
    <q-icon
      name="mail"
      class="mx-auto tw-flex tw-aspect-square tw-w-full tw-justify-center tw-text-9xl tw-text-primary-700"
    />
    <p class="tw-text-center tw-text-3xl tw-font-semibold tw-text-gray-700">
      Please check your email
    </p>
    <p class="tw-text-md tw-my-4 tw-text-center tw-font-semibold tw-text-gray-500">
      We've sent a code to {{ props.email }}
    </p>
    <q-form class="q-gutter-md tw-my-8" @submit="verifyOTP">
      <q-input v-model="State.otp" dense outlined label="Code" lazy-rules class="tw-my-4" />
      <div v-if="error">
        {{ error }}
      </div>
      <q-btn
        :loading="loading" label="Verify" type="submit"
        class="tw-my-2 tw-flex tw-w-[96%] tw-justify-center tw-bg-[#8E203A] tw-font-semibold tw-text-white"
      />
    </q-form>
    <p class="tw-text-center tw-text-gray-600">
      Go back to
      <span class="tw-cursor-pointer tw-text-[#8E203A]">Sign up</span>
    </p>
  </div>
</template>
