<script setup lang="ts">
import type { SignUpInputs } from "~/types/auth";
const $q = useQuasar();

const props = defineProps<{
  isVisible: boolean;
}>();
const emit = defineEmits<{
  (event: "modalClosed"): void;
  (event: "login"): void;
}>();

const { register, error, loading, verifyOtp } = useAuth();

const isPwd = ref(true);
const isOtp = ref(false);

const otpCode = ref("");

const visible = ref(false);
const State = reactive<SignUpInputs>({
  username: "",
  email: "",
  password: "",
  password2: "",
  first_name: "",
  last_name: "",
  phone_number: "",
  address: {
    address_line: "",
    admin_area: "",
    locality: "",
    postal_code: "",
    thoroughfare: "",
    premise: "",
    sub_premise: "",
    latitude: 0,
    longitude: 0,
  },
});

const onSubmit = async () => {
  console.log("state ", State);
  const res = await register({
    username: State.username,
    email: State.email,
    password: State.password,
    password2: State.password2,
    address: State.address,
    first_name: State.first_name,
    last_name: State.last_name,
    phone_number: State.phone_number,
  });

  if (res?.message === "OTP sent successfully") {
    isOtp.value = true;
  }
  if (res?.error) {
    $q.notify({
      message: res.error,
      color: "red",
    });
  }
};

const verifyOTP = async () => {
  verifyOtp(State.email, otpCode.value).then(res => {
    isOtp.value = true;
    $q.notify({
      message: "Registered successfully!",
      color: "green",
    });
    emit("login");
  }).catch(error => {
    $q.notify({
      message: error,
      color: "red",
    });
  })



};

watch(
  () => props.isVisible,
  (newValue, oldValue) => {
    visible.value = newValue;
  }
);

const getLocation = () => {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        State.address.latitude = position.coords.latitude;
        State.address.longitude = position.coords.longitude;
        console.log("goody", position);
        $q.notify({
          message: 'Success',
          icon: 'announcement',
          position: 'top'
        });
      },
      (err) => {
        $q.notify({
          message: err.message,
          icon: 'announcement',
          position: 'right'
        });
      }
    );
  } else {
    error.value = "Geolocation is not supported by this browser.";
  }

};
</script>
<template>
  <q-dialog v-model="visible" @hide="$emit('modalClosed')">
    <q-card class="tw-p-8">
      <div class="tw-flex tw-justify-end tw-w-full">
        <q-btn icon="close" v-close-popup />
      </div>
      <div v-if="!isOtp">
        <h3 class="tw-text-2xl tw-font-bold tw-text-primary-700 tw-text-center">
          Sign Up
        </h3>
        <q-form @submit="onSubmit" class="q-gutter-md tw-my-8">
          <div>
            <q-input type="text" dense outlined v-model="State.username" label="Username"
              :rules="[(val: string) => (val && val.length > 0) || 'Invalid username']" />
          </div>
          <div>
            <q-input dense outlined v-model="State.phone_number" label="Phone number" :rules="[
              (val) => !!val || 'Phone number is required',
              (val) => validatePhoneNumber(val) || 'Invalid phone number 09, 07, +2519, +2517'
            ]" />
          </div>
          <div>
            <q-input dense outlined v-model="State.email" label="Email" :rules="[
              (val) => !!val || 'Email is required',
              (val) => validateEmail(val) || 'Invalid email'
            ]" />
          </div>
          <div class="tw-grid tw-grid-cols-2 tw-gap-2">
            <q-input dense outlined v-model="State.first_name" label="First Name"
              :rules="[(val: string) => (val && val.length > 0) || 'First name is required']"
              class="sm:tw-col-span-1 tw-col-span-2" />
            <q-input dense outlined v-model="State.last_name" label="Last name"
              :rules="[(val: string) => (val && val.length > 0) || 'Last name is required']"
              class="sm:tw-col-span-1 tw-col-span-2" />
          </div>
          <div class="tw-grid tw-grid-cols-2 tw-gap-2">
            <q-input v-model="State.password" outlined dense :type="isPwd ? 'password' : 'text'" label="Your Password *"
              lazy-rules :rules="[
                (val) => !!val || 'Password is required',
                (val) => val.length >= 6 || 'Minimum of 6 Letters is required'
              ]" class="sm:tw-col-span-1 tw-col-span-2">

              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                  @click="isPwd = !isPwd" />
              </template>
            </q-input>
            <q-input v-model="State.password2" outlined dense :type="isPwd ? 'password' : 'text'"
              label="Your Password *" lazy-rules
              :rules="[(val: string) => (val === State.password) || 'Password doesn\'t match']"
              class="sm:tw-col-span-1 tw-col-span-2">
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                  @click="isPwd = !isPwd" />
              </template>
            </q-input>
          </div>
          <div class="tw-flex tw-w-full tw-gap-4">
            <q-input dense outlined v-model="State.address.address_line" label="Address" lazy-rules
              :rules="[(val: string) => (val && val.length > 0) || 'Invalid address']" class="tw-w-full" />
            <q-btn @click="getLocation()" dense size="md" class="tw-h-10" icon="add_location_alt" />
          </div>

          <p class="tw-text-red-500 tw-my-2">{{ error }}</p>

          <q-btn label="Register" type="submit"
            class="tw-w-[96%] tw-flex tw-justify-center tw-bg-[#8E203A] tw-text-white tw-font-semibold"
            :loading="loading" />
          <p class="tw-text-gray-500 text-center">
            Already have an account?
            <span class="tw-text-[#8E203A] tw-cursor-pointer" @click="$emit('login')">sign in</span>
          </p>
          <hr class="tw-text-gray-700 tw-my-4" />
          <p class="tw-text-gray-500 text-center">
            By clicking this button you confirm that you have read and agree to
            the <span class="tw-text-blue-500">Terms and Conditions</span> and
            <span class="tw-text-blue-500">Privacy Policy</span> of the
            HarifSport and confirm that you are a legal age
          </p>
        </q-form>
      </div>
      <div v-if="isOtp">
        <q-icon name="mail"
          class="tw-flex tw-justify-center tw-text-9xl tw-aspect-square tw-text-primary-700 tw-w-full mx-auto" />
        <p class="tw-text-gray-700 tw-font-semibold tw-text-center tw-text-3xl">
          Please check your email
        </p>
        <p class="tw-text-gray-500 tw-text-center tw-text-md tw-font-semibold tw-my-4">
          We've sent a code to {{ State.email }}
        </p>
        <q-form @submit="verifyOTP" class="q-gutter-md tw-my-8">
          <q-input dense outlined v-model="otpCode" label="Code" lazy-rules class="tw-my-4" />
          <q-btn label="Verify" type="submit"
            class="tw-w-[96%] tw-flex tw-justify-center tw-bg-[#8E203A] tw-text-white tw-font-semibold tw-my-2" />
        </q-form>
        <p class="tw-text-center tw-text-gray-600">
          Go back to
          <span class="tw-text-[#8E203A] tw-cursor-pointer" @click="isOtp = false">Sign up</span>
        </p>
      </div>
    </q-card>
  </q-dialog>
</template>
