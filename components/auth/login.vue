<script setup lang="ts">
const emit = defineEmits<{
  forgot: [void]
}>()

enum LoginOption {
  phone = 'phone',
  username = 'username',
}

const $q = useQuasar()
const layout = useLayout()
const { login, loading, error } = useAuth()
const showPassword = ref(false)
const state = ref({
  username: '',
  phoneNumber: '',
  password: '',
  remember: false,
})
const loginWith = ref<LoginOption>(LoginOption.username)
async function onSubmit() {
  const res = await login({
    username: state.value.username,
    password: state.value.password,
  })
  if (res?.data.success) {
    $q.notify({
      message: 'Successfully logged in',
      color: 'green',
    })
    layout.value.showLogin = false
  } else {
    $q.notify({
      message: `${error.value}`,
      color: 'red',
    })
  }
}
</script>

<template>
  <div>
    <h3 class="tw-text-center tw-text-2xl tw-font-bold tw-text-primary-700">
      Sign In
    </h3>
    <div class="tw-my-4 tw-flex tw-items-center tw-justify-between tw-gap-4">
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
      />
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
      />
    </div>
    <q-form class="q-gutter-md tw-my-8" @submit="onSubmit">
      <q-input
        v-if="loginWith === LoginOption.username"
        v-model="state.username"
        dense
        outlined
        label="Username"
        lazy-rules
        :rules="[(val: string) => (val && val.length > 0) || 'Invalid username']"
      />
      <q-input
        v-if="loginWith === LoginOption.phone"
        v-model="state.phoneNumber"
        dense
        outlined
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
        :rules="[(val: string) => (val && val.length > 0) || 'Invalid password']"
      >
        <template #append>
          <q-icon
            :name="showPassword ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="showPassword = !showPassword"
          />
        </template>
      </q-input>

      <div class="tw-flex tw-items-center tw-justify-between">
        <q-toggle v-model="state.remember" label="Remember" />
        <p class="tw-cursor-pointer tw-text-red-400" @click="emit('forgot')">
          Forgot password?
        </p>
      </div>

      <q-btn
        label="Submit"
        type="submit"
        class="tw-flex tw-w-[96%] tw-justify-center tw-bg-[#8E203A] tw-font-semibold tw-text-white"
        :loading="loading"
      />

      <hr class="tw-text-gray-700">
      <p class="text-center tw-text-gray-500">
        Don't have an account?
        <span class="tw-cursor-pointer tw-text-[#8E203A]" @click="layout.showLogin = false; layout.showRegister = true">Create now</span>
      </p>
    </q-form>
  </div>
</template>
