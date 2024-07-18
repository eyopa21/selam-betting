<template>
  <q-dialog v-model="visible" @hide="$emit('modalClosed')">
    <q-card class="tw-p-8 tw-w-96">
      {{ isOtpSent }}
      <q-icon name="close" class="tw-flex tw-justify-end tw-w-full" size="sm" v-close-popup />
      <div v-if="isOtpSent">
        <AuthForgot />
      </div>
      
      <div v-if="!isForgotPwd">
        <h3 class="tw-text-2xl tw-font-bold tw-text-primary-700 tw-text-center">
          Sign In
        </h3>
        <div class="tw-flex tw-items-center tw-justify-between tw-my-4 tw-gap-4">
          <q-btn label="By phone" icon="phone" class="tw-w-full" :class="
              signInWith === SigninOption.Phone
                ? 'tw-bg-primary-600 tw-text-white'
                : 'tw-bg-gray-300 tw-text-primary-500'
            " @click="signInWith = SigninOption.Phone"></q-btn>
          <q-btn label="username" icon="person" class="tw-w-full" :class="
              signInWith === SigninOption.Username
                ? 'tw-bg-primary-600 tw-text-white'
                : 'tw-bg-gray-300 tw-text-primary-500'
            " @click="signInWith = SigninOption.Username"></q-btn>
        </div>
        <q-form @submit="onSubmit" class="q-gutter-md tw-my-8">
          <q-input v-if="signInWith === SigninOption.Username" dense outlined v-model="signInObj.username"
            label="Username" lazy-rules :rules="[(val:string) => (val && val.length > 0) || 'Invalid username']" />
          <q-input v-if="signInWith === SigninOption.Phone" dense outlined v-model="signInObj.phoneNumber"
            label="Your phone number" lazy-rules
            :rules="[(val:string) => (val && val.length > 0) || 'Invalid phone number']" />
          <q-input v-model="signInObj.password" outlined dense :type="isPwd ? 'password' : 'text'"
            label="Your Password *" lazy-rules :rules="[(val:string) => (val && val.length > 0) || 'Invalid username']">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>

          <div class="tw-flex tw-justify-between tw-items-center">
            <q-toggle v-model="signInObj.remember" label="Remember" />
            <p class="tw-text-red-400 tw-cursor-pointer" @click="isForgotPwd = true">
              Forgot password?
            </p>
          </div>

          <q-btn label="Submit" type="submit"
            class="tw-w-[96%] tw-flex tw-justify-center tw-bg-[#8E203A] tw-text-white tw-font-semibold"
            :loading="loading" />
          <p class="tw-text-gray-500 tw-font-semibold tw-text-xs tw-text-center">
            You can sign in to the website via
          </p>
          <div class="tw-flex tw-justify-center tw-items-center">
            <img src="/images/telegram.svg" alt="" class="tw-mr-4 tw-w-7 tw-aspect-square" />
            <img src="/images/google.svg" alt="" class="tw-w-7 tw-aspect-square" />
          </div>
          <hr class="tw-text-gray-700" />
          <p class="tw-text-gray-500 text-center">
            Dont have an account?
            <span class="tw-text-[#8E203A] tw-cursor-pointer" @click="$emit('register')" v-close-popup>Create now</span>
          </p>
        </q-form>
      </div>
      <div v-else>
        <AuthOtp />
      </div>

    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import type { SignInInputs } from "~/types/auth";
const isOtpSent = useCookie('otpSent')
const props = defineProps<{
  isVisible: boolean;
}>();
const emit = defineEmits<{
  (event: "modalClosed"): void;
  (event: "register"): void;
}>();

const $q = useQuasar();

const { login, loading, error, sendOtp, resetPassword } = useAuth();

enum SigninOption {
  Phone = "phone",
  Username = "username",
}

const signInWith = ref<SigninOption>(SigninOption.Username);
const isPwd = ref(true);
const isForgotPwd = ref(false);
const isOtp = ref(false);
const email = ref("");
const otpCode = ref("");
const newPassword = ref("");

const visible = ref(false);
const signInObj = reactive<SignInInputs>({
  username: "",
  phoneNumber: "",
  password: "",
  remember: false,
});

const onSubmit = async () => {
  const res = await login({
    username: signInObj.username,
    password: signInObj.password,
  });

  if (res?.data.success) {
    $q.notify({
      message: "Successfully logged in",
      color: "green",
    });
    visible.value = false;
    emit("modalClosed");
  } else {
    $q.notify({
      message: `${error.value}`,
      color: "red",
    });
  }
};

const onSendOtp = async () => {
  const res = await sendOtp(email.value);
  console.log("resi", res);
  if (res.error) {
    $q.notify({
      message: `${res?.error}`,
      color: "red",
    });
  } else if(res.message){
    $q.notify({
      message: `${res?.message}`,
      color: "green",
    });
    isForgotPwd.value = false;
    isOtp.value = true;
  }
  
};
const onResetPassword = async () => {
  const res = await resetPassword(otpCode.value, newPassword.value);
  if (res.error) {
    $q.notify({
      message: `${res.error.Error}`,
      color: "red",
    });
  }
  if (res.Message == "Password reset successfully") {
    isForgotPwd.value = false;
    isOtp.value = false;
    $q.notify({
      message: "Password reset successful.",
      color: "green",
    });
  }
};

watch(
  () => props.isVisible,
  (newValue, oldValue) => {
    visible.value = newValue;
  }
);
</script>
