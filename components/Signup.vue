<template>
  <q-dialog v-model="visible" @hide="$emit('modalClosed')">
    <q-card class="tw-p-8">
      <q-icon
        name="close"
        class="tw-flex tw-justify-end tw-w-full"
        v-close-popup
      />
      <h3 class="tw-text-2xl tw-font-bold tw-text-primary-700 tw-text-center">
        Sign Up
      </h3>
      <q-form @submit="onSubmit" class="q-gutter-md tw-my-8">
        <q-input
          dense
          outlined
          v-model="signUpObj.username"
          label="Username"
          lazy-rules
          :rules="[(val:string) => (val && val.length > 0) || 'Invalid username']"
        />
        <q-input
          dense
          outlined
          v-model="signUpObj.email"
          label="Email"
          lazy-rules
          :rules="[(val:string) => (validateEmail(val)) || 'Invalid email']"
        />
        <div class="tw-grid tw-grid-cols-2 tw-gap-2">
          <q-input
            v-model="signUpObj.password"
            outlined
            dense
            :type="isPwd ? 'password' : 'text'"
            label="Your Password *"
            lazy-rules
            :rules="[(val:string) => (validatePassword(val)) || 'Invalid password']"
            class="sm:tw-col-span-1 tw-col-span-2"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-input
            v-model="signUpObj.password2"
            outlined
            dense
            :type="isPwd ? 'password' : 'text'"
            label="Your Password *"
            lazy-rules
            :rules="[(val:string) => (val === signUpObj.password) || 'Password have no similar value']"
            class="sm:tw-col-span-1 tw-col-span-2"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </div>
        <div class="tw-grid tw-grid-cols-2 tw-gap-2">
          <q-input
            dense
            outlined
            v-model="signUpObj.first_name"
            label="First Name"
            lazy-rules
            :rules="[(val:string) => (val && val.length > 0) || 'Invalid first name']"
            class="sm:tw-col-span-1 tw-col-span-2"
          />
          <q-input
            dense
            outlined
            v-model="signUpObj.last_name"
            label="Last name"
            lazy-rules
            :rules="[(val:string) => (val && val.length > 0) || 'Invalid last name']"
            class="sm:tw-col-span-1 tw-col-span-2"
          />
        </div>
        <q-input
          dense
          outlined
          v-model="signUpObj.phoneNumber"
          label="Phone number"
          lazy-rules
          :rules="[(val:string) => (val && val.length > 0) || 'Invalid phone']"
        />
        <q-input
          dense
          outlined
          v-model="signUpObj.address.address_line"
          label="Address"
          lazy-rules
          :rules="[(val:string) => (val && val.length > 0) || 'Invalid address']"
        />

        <q-btn
          label="Regiser"
          type="submit"
          class="tw-w-[96%] tw-flex tw-justify-center tw-bg-[#8E203A] tw-text-white tw-font-semibold"
        />
        <hr class="tw-text-gray-700 tw-my-4" />
        <p class="tw-text-gray-500 text-center">
          By clicking this button you confirm that you have read and agree to
          the <span class="tw-text-blue-500">Terms and Conditions</span> and
          <span class="tw-text-blue-500">Privacy Policy</span> of the HarifSport
          and confirm that you are a legal age
        </p>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import type { SignUpInputs } from "~/types/auth";

const props = defineProps<{
  isVisible: boolean;
}>();
const emit = defineEmits<{
  (event: "modalClosed"): void;
}>();

const { register } = useAuth();

const isPwd = ref(true);

const visible = ref(false);
const signUpObj = reactive<SignUpInputs>({
  username: "",
  email: "",
  password: "",
  password2: "",
  first_name: "",
  last_name: "",
  phoneNumber: "",
  address: {
    address_line: "",
    admin_area: null,
    locality: null,
    postal_code: null,
    thoroughfare: null,
    premise: null,
    sub_premise: null,
    latitude: null,
    longitude: null,
  },
});

const onSubmit = () => {
  register({
    username: signUpObj.username,
    email: signUpObj.email,
    password: signUpObj.password,
    password2: signUpObj.password2,
    address: signUpObj.address,
    first_name: signUpObj.first_name,
    last_name: signUpObj.last_name,
    phoneNumber: signUpObj.phoneNumber,
  });
};

watch(
  () => props.isVisible,
  (newValue, oldValue) => {
    visible.value = newValue;
  }
);
</script>
