<script setup lang="ts">
enum LoginOption {
  phone = "phone",
  username = "username",
}

const emit = defineEmits<{
    forgot: [void]
}>()
const $q = useQuasar();
const layout = useLayout();
const { login, loading, error, sendOtp, resetPassword } = useAuth();
const showPassword = ref(false);
const state = ref({
  username: "",
  phoneNumber: "",
  password: "",
  remember: false,
});
const loginWith = ref<LoginOption>(LoginOption.username);
const onSubmit = async () => {
  const res = await login({
    username: state.value.username,
    password: state.value.password,
  });

  if (res?.data.success) {
    $q.notify({
      message: "Successfully logged in",
      color: "green",
    });
    layout.value.showLogin = false;
  } else {
    $q.notify({
      message: `${error.value}`,
      color: "red",
    });
  }
};
</script>

<template>
  <div>
    <h3 class="tw-text-2xl tw-font-bold tw-text-primary-700 tw-text-center">
      Sign In
    </h3>
    <div class="tw-flex tw-items-center tw-justify-between tw-my-4 tw-gap-4">
      <q-btn
        label="By phone"
        icon="phone"
        class="tw-w-full"
        :class="
          loginWith === LoginOption.phone
            ? 'tw-bg-primary-600 tw-text-white'
            : 'tw-bg-gray-300 tw-text-primary-500'
        "
        @click="loginWith = LoginOption.phone"
      ></q-btn>
      <q-btn
        label="username"
        icon="person"
        class="tw-w-full"
        :class="
          loginWith === LoginOption.username
            ? 'tw-bg-primary-600 tw-text-white'
            : 'tw-bg-gray-300 tw-text-primary-500'
        "
        @click="loginWith = LoginOption.username"
      ></q-btn>
    </div>
    <q-form @submit="onSubmit" class="q-gutter-md tw-my-8">
      <q-input
        v-if="loginWith === LoginOption.username"
        dense
        outlined
        v-model="state.username"
        label="Username"
        lazy-rules
        :rules="[(val: string) => (val && val.length > 0) || 'Invalid username']"
      />
      <q-input
        v-if="loginWith === LoginOption.phone"
        dense
        outlined
        v-model="state.phoneNumber"
        label="Your phone number"
        lazy-rules
        :rules="[(val: string) => (val && val.length > 0) || 'Invalid phone number']"
      />
      <q-input
        v-model="state.password"
        outlined
        dense
        :type="!showPassword ? 'password' : 'text'"
        label="Your Password *"
        lazy-rules
        :rules="[(val: string) => (val && val.length > 0) || 'Invalid username']"
      >
        <template v-slot:append>
          <q-icon
            :name="showPassword ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="showPassword = !showPassword"
          />
        </template>
      </q-input>

      <div class="tw-flex tw-justify-between tw-items-center">
        <q-toggle v-model="state.remember" label="Remember" />
        <p @click="emit('forgot')" class="tw-text-red-400 tw-cursor-pointer">Forgot password?</p>
      </div>

      <q-btn
        label="Submit"
        type="submit"
        class="tw-w-[96%] tw-flex tw-justify-center tw-bg-[#8E203A] tw-text-white tw-font-semibold"
        :loading="loading"
      />
      <p class="tw-text-gray-500 tw-font-semibold tw-text-xs tw-text-center">
        You can sign in to the website via
      </p>
      <div class="tw-flex tw-justify-center tw-items-center">
        <img
          src="/images/telegram.svg"
          alt=""
          class="tw-mr-4 tw-w-7 tw-aspect-square"
        />
        <img src="/images/google.svg" alt="" class="tw-w-7 tw-aspect-square" />
      </div>
      <hr class="tw-text-gray-700" />
      <p class="tw-text-gray-500 text-center">
        Dont have an account?
        <span class="tw-text-[#8E203A] tw-cursor-pointer" @click="layout.showLogin = false; layout.showRegister = true"
          >Create now</span
        >
      </p>
    </q-form>
  </div>
</template>
