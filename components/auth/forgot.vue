<script setup lang="ts">
const emit = defineEmits<{
  otpSent: [string]
  login: [void]

}>()
const $q = useQuasar()
const { loading, sendOtp } = useAuth()
const state = ref({
  email: '',
})

async function onSendOtp() {
  const res = await sendOtp(state.value.email)
  if (res && 'error' in res) {
    $q.notify({
      message: `${res?.error}`,
      color: 'red',
    })
  } else if (res && 'message' in res) {
    $q.notify({
      message: `${res?.message}`,
      color: 'green',
    })
    emit('otpSent', state.value.email)
  }
}
</script>

<template>
  <div>
    <h3 class="tw-text-center tw-text-2xl tw-font-bold tw-text-primary-700">
      Forgot password
    </h3>
    <q-form class="q-gutter-md tw-my-8" @submit="onSendOtp">
      <q-input
        v-model="state.email" dense outlined label="Your email" lazy-rules
        :rules="[(val: string) => (val && validateEmail(val)) || 'Invalid email']"
      />
      <q-btn
        label="Send Code" type="submit"
        class="tw-flex tw-w-[96%] tw-justify-center tw-bg-[#8E203A] tw-font-semibold tw-text-white"
        :loading="loading"
      />
    </q-form>
    <hr class="tw-py-4 tw-text-gray-700">
    <p class="text-center tw-text-gray-500">
      Go back to
      <span class="tw-cursor-pointer tw-text-[#8E203A]" @click="emit('login')">sign in</span>
    </p>
  </div>
</template>
