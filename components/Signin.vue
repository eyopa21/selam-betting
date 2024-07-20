<template>
  <q-dialog v-model="layout.showLogin">
    <q-card class="tw-p-8 tw-w-96">

      <q-icon @click="closePopup" name="close" class="tw-flex tw-justify-end tw-w-full" size="sm" v-close-popup />

      <div v-if="loginState === 'otp' || isOtpSent">
        <AuthOtp />
      </div>
      <div v-else-if="loginState==='forgot'">
        <AuthForgot @otpSent="loginState = 'otp'" />
      </div>

      <div v-else-if="loginState === 'login'">
        <AuthLogin @forgot="loginState='forgot'" />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
type LoginState = 'forgot' | 'login' | 'otp'
const loginState = ref<LoginState>('login') 
const isOtpSent = useCookie('otpSent')
const layout = useLayout();
const emit = defineEmits<{
  (event: "modalClosed"): void;
  (event: "register"): void;
}>();


function closePopup() {
  if (isOtpSent.value) {
    isOtpSent.value = null
    loginState.value = 'login'
  }
}







</script>
