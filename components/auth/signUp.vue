<script setup lang="ts">
type RegisterState = 'register' | 'otp'
const registerState = ref<RegisterState>('register')
const layout = useLayout();


const otpEmail = ref<string>()


</script>
<template>
  <q-dialog v-model="layout.showRegister" @close="registerState = 'register'">
    <q-card class="tw-p-8">
      <div class="tw-flex tw-justify-end tw-w-full">
        <q-btn icon="close" v-close-popup />
      </div>
      <div v-if="registerState === 'otp' && otpEmail">
        <AuthVerifyRegister :email="otpEmail" />
      </div>
      <div v-else-if="registerState === 'register'">
        <AuthRegister @otpSent="(n) => {

          registerState = 'otp';
          otpEmail = n

        }" />
        
      </div>
    </q-card>
  </q-dialog>
</template>
