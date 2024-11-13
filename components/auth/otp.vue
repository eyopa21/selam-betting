<script setup lang="ts">
const props = defineProps<{
  email: string
}>()

const emit = defineEmits<{

  reset: [void]

}>()

const layout = useLayout()
const state = ref({
  code: '',
  newPassword: '',
})

const { loading, resetPassword } = useAuth()
async function onResetPassword() {
  try {
    const res = await resetPassword(state.value.code, state.value.newPassword)
    useSuccessNotification(res)
    layout.value.showLogin = false
    emit('reset')
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
    <q-form class="q-gutter-md tw-my-8" @submit="onResetPassword">
      <q-input v-model="state.code" dense outlined label="Code" lazy-rules class="tw-my-4" />
      <q-input
        v-model="state.newPassword" dense outlined label="New password" lazy-rules class="tw-my-4"
        :rules="[(val: string) => (validatePassword(val)) || 'Invalid password or Weak Password']"
      />
      <q-btn
        :loading="loading" label="Reset" type="submit"
        class="tw-my-2 tw-flex tw-w-[96%] tw-justify-center tw-bg-[#8E203A] tw-font-semibold tw-text-white"
      />
    </q-form>
    <p class="tw-text-center tw-text-gray-600">
      Go back to
      <span class="tw-cursor-pointer tw-text-[#8E203A]">Sign in</span>
    </p>
  </div>
</template>
