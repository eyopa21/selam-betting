<template>
  <q-dialog v-model="layout.showLogin">
    <q-card class="tw-p-8 tw-w-96">

      <q-icon @click="closePopup" name="close" class="tw-flex tw-justify-end tw-w-full" size="sm" v-close-popup />

      <div v-if="loginState === 'otp' && currentEmail">
        <AuthOtp :email="currentEmail" />
      </div>
      <div v-else-if="loginState==='forgot'">
        <AuthForgot @otpSent="(n: string) => { currentEmail = n; loginState = 'otp' }" />
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
const currentEmail = ref<string | undefined>(undefined)
const layout = useLayout();
const emit = defineEmits<{
  (event: "modalClosed"): void;
  (event: "register"): void;
}>();


function closePopup() {
    loginState.value = 'login'
  
}







</script>
