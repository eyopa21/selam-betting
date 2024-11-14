<script setup lang="ts">
type LoginState = 'forgot' | 'login' | 'otp'
const emit = defineEmits<{
  (event: 'modalClosed'): void
  (event: 'register'): void
}>()
const loginState = ref<LoginState>('login')
const currentEmail = ref<string | undefined>(undefined)
const layout = useLayout()
function closePopup() {
  loginState.value = 'login'
}
</script>

<template>
  <q-dialog v-model="layout.showLogin">
    <q-card class="tw-w-96  tw-p-8">
      <q-icon v-close-popup name="close" class="tw-flex tw-w-full tw-justify-end" size="sm" @click="closePopup" />

      <div v-if="loginState === 'otp' && currentEmail">
        <AuthOtp :email="currentEmail" @reset="loginState = 'login'" />
      </div>
      <div v-else-if="loginState === 'forgot'">
        <AuthForgot @login="loginState = 'login'" @otp-sent="(n: string) => { currentEmail = n; loginState = 'otp' }" />
      </div>

      <div v-else-if="loginState === 'login'">
        <AuthLogin @forgot="loginState = 'forgot'" />
      </div>
    </q-card>
  </q-dialog>
</template>
