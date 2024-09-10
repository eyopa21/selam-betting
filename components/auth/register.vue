<script setup lang="ts">
import type { SignUpInputs } from '~/types/auth'

const emit = defineEmits<{
  otpSent: [string]
}>()
const $q = useQuasar()
const showPassword = ref(false)
const { register, error, loading } = useAuth()
const layout = useLayout()
const State = reactive<SignUpInputs>({
  username: '',
  email: '',
  password: '',
  password2: '',
  first_name: '',
  last_name: '',
  phone_number: '',
  address: {
    address_line: '',
    admin_area: '',
    locality: '',
    postal_code: '',
    thoroughfare: '',
    premise: '',
    sub_premise: '',
    latitude: 0,
    longitude: 0,
  },
})

async function onSubmit() {
  try {
    const res = await register({
      username: State.username,
      email: State.email,
      password: State.password,
      password2: State.password2,
      address: State.address,
      first_name: State.first_name,
      last_name: State.last_name,
      phone_number: State.phone_number,
    })
    if (res && 'error' in res) {
      $q.notify({
        message: res.error,
        color: 'red',
      })
    } else if (res && 'message' in res) {
      emit('otpSent', State.email)
    }
  } catch (err) {
    $q.notify({
      message: 'error',
      icon: 'announcement',
      position: 'top',
    })
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        State.address.latitude = position.coords.latitude
        State.address.longitude = position.coords.longitude
        console.log('goody', position)
        $q.notify({
          message: 'Success',
          icon: 'announcement',
          position: 'top',
        })
      },
      (err) => {
        $q.notify({
          message: err.message,
          icon: 'announcement',
          position: 'right',
        })
      },
    )
  } else {
    error.value = 'Geolocation is not supported by this browser.'
  }
}
</script>

<template>
  <div>
    <h3 class="tw-text-center tw-text-2xl tw-font-bold tw-text-primary-700">
      Sign Up
    </h3>
    <q-form class="q-gutter-md tw-my-8" @submit="onSubmit">
      <div>
        <q-input
          v-model="State.username" type="text" dense outlined label="Username"
          :rules="[(val: string) => (val && val.length > 0) || 'Invalid username']"
        />
      </div>
      <div>
        <q-input
          v-model="State.phone_number" dense outlined label="Phone number" :rules="[
            (val) => !!val || 'Phone number is required',
            (val) => validatePhoneNumber(val) || 'Invalid phone number 09, 07, +2519, +2517',
          ]"
        />
      </div>
      <div>
        <q-input
          v-model="State.email" dense outlined label="Email" :rules="[
            (val) => !!val || 'Email is required',
            (val) => validateEmail(val) || 'Invalid email',
          ]"
        />
      </div>
      <div class="tw-grid tw-grid-cols-2 tw-gap-2">
        <q-input
          v-model="State.first_name" dense outlined label="First Name"
          :rules="[(val: string) => (val && val.length > 0) || 'First name is required']"
          class="tw-col-span-2 sm:tw-col-span-1"
        />
        <q-input
          v-model="State.last_name" dense outlined label="Last name"
          :rules="[(val: string) => (val && val.length > 0) || 'Last name is required']"
          class="tw-col-span-2 sm:tw-col-span-1"
        />
      </div>
      <div class="tw-grid tw-grid-cols-2 tw-gap-2">
        <q-input
          v-model="State.password" outlined dense :type="!showPassword ? 'password' : 'text'"
          label="Your Password *" lazy-rules :rules="[
            (val) => !!val || 'Password is required',
            (val) => val.length >= 6 || 'Minimum of 6 Letters is required',
          ]" class="tw-col-span-2 sm:tw-col-span-1"
        >
          <template #append>
            <q-icon
              :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>
        <q-input
          v-model="State.password2" outlined dense :type="!showPassword ? 'password' : 'text'"
          label="Your Password *" lazy-rules
          :rules="[(val: string) => (val === State.password) || 'Password doesn\'t match']"
          class="tw-col-span-2 sm:tw-col-span-1"
        >
          <template #append>
            <q-icon
              :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>
      </div>
      <div class="tw-flex tw-w-full tw-gap-4">
        <q-input
          v-model="State.address.address_line" dense outlined label="Address" lazy-rules
          :rules="[(val: string) => (val && val.length > 0) || 'Invalid address']" class="tw-w-full"
        />
        <q-btn dense size="md" class="tw-h-10" icon="add_location_alt" @click="getLocation()" />
      </div>

      <p class="tw-my-2 tw-text-red-500">
        {{ error }}
      </p>

      <q-btn
        label="Register" type="submit"
        class="tw-flex tw-w-[96%] tw-justify-center tw-bg-[#8E203A] tw-font-semibold tw-text-white"
        :loading="loading"
      />
      <p class="text-center tw-text-gray-500">
        Already have an account?
        <span class="tw-cursor-pointer tw-text-[#8E203A]" @click="layout.showRegister = false; layout.showLogin = true">sign in</span>
      </p>
      <hr class="tw-my-4 tw-text-gray-700">
      <p class="text-center tw-text-gray-500">
        By clicking this button you confirm that you have read and agree to
        the <span class="tw-text-blue-500">Terms and Conditions</span> and
        <span class="tw-text-blue-500">Privacy Policy</span> of the
        HarifSport and confirm that you are a legal age
      </p>
    </q-form>
  </div>
</template>
