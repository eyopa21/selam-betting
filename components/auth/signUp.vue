<script setup lang="ts">
type RegisterState = 'register' | 'otp'
const registerState = ref<RegisterState>('register')
const layout = useLayout()

const otpEmail = ref<string>()
</script>

<template>
  <q-dialog v-model="layout.showRegister" @close="registerState = 'register'">
    <q-card class="tw-p-8">
      <q-card-section class="row items-center q-pb-none q-pa-sm">
        <div class="text-h6 q-ml-md" />
        <q-space />
        <q-btn v-close-popup icon="close" size="md" round unelevated dense />
      </q-card-section>

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
