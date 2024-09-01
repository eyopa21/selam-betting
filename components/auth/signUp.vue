<script setup lang="ts">
type RegisterState = 'register' | 'otp'
const registerState = ref<RegisterState>('register')
const layout = useLayout()

const otpEmail = ref<string>()
</script>

<template>
  <q-dialog v-model="layout.showRegister" @close="registerState = 'register'">
    <q-card class="tw-p-8">
      <div class="tw-flex tw-w-full tw-justify-end">
        <q-btn v-close-popup icon="close" />
      </div>
      <div v-if="registerState === 'otp' && otpEmail">
        <AuthVerifyRegister :email="otpEmail" @finish-verify="otpEmail = undefined; registerState = 'register'" />
      </div>
      <div v-else-if="registerState === 'register'">
        <AuthRegister
          @otp-sent="(n) => {

            registerState = 'otp';
            otpEmail = n

          }"
        />
      </div>
    </q-card>
  </q-dialog>
</template>
