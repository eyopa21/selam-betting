<script setup lang="ts">
import type { Body } from '~/server/api/auth/update-user-info.put'

definePageMeta({
  layout: 'account',
  pageType: 'authenticated',
})
const { $authentication } = useNuxtApp()
const progress = ref(0)
const userStore = useUserStore()
const state = ref({
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address: '',

})

state.value.firstName = userStore.user?.user.first_name ?? ''
state.value.lastName = userStore.user?.user.last_name ?? ''
state.value.username = userStore.user?.user.username ?? ''
state.value.phoneNumber = userStore.user?.user.phone_number ?? ''
state.value.email = userStore.user?.user.email ?? ''
state.value.address = userStore.user?.user.address.address_line ?? ''

const loading = ref(false)
async function updateUserInfo() {
  loading.value = true
  try {
    const response = await $fetch('/api/auth/update-user-info', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${$authentication.accessToken.value}`,
      },
      body: {
        username: state.value.username,
        first_name: state.value.firstName,
        last_name: state.value.lastName,
        phone_number: state.value.lastName,
        address: state.value.address,
      } as Body,
    })

    useSuccessNotification('Account Updated Successfully')
  } catch (err) {
    useErrorNotifications(ref(err))
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="tw-px-4 tw-text-primary-500">
    <div class="tw-font-bold ">
      <h4 class="tw-text-lg">
        Personal Profile
      </h4>
      <p>Fill in the empty fields to take advantage of the enhanced features of the HarifSport website</p>
    </div>
    <div class="tw-mt-2">
      <q-bar dark class="bg-white text-primary tw-py-5">
        <div class=" text-left text-weight-bold tw-pl-4">
          FILL IN PROFILE
        </div>
      </q-bar>
      <q-linear-progress :value="progress" color="red-10" size="6px" />
    </div>
    <div class="tw-mt-4">
      <div class="tw-flex tw-justify-between tw-gap-6">
        <!-- <div class="tw-flex tw-w-1/2 tw-flex-col tw-gap-4">
          <div class="tw-border  tw-bg-white tw-p-4">
            <h5 class="tw-text-lg tw-font-bold">
              ACCOUNT
            </h5>
            <div class="tw-space-y-2 tw-py-4">
              <q-input type="text" outlined label="Account" dense class="tw-shadow-md" />
              <q-input type="password" outlined label="Password" dense class="tw-shadow-md" />
              <q-input type="date" outlined label="Issued date" class="tw-shadow-md" />
            </div>
          </div>
          <div class="tw-border  tw-bg-white tw-p-4">
            <h5 class="tw-text-lg tw-font-bold">
              CONTACTS
            </h5>
            <div class="tw-space-y-2 tw-py-4">
              <q-input type="text" outlined label="Phone number" dense class="tw-shadow-md" />
              <q-input type="email" outlined label="Email" dense class="tw-shadow-md" />
              <div class="tw-flex tw-items-start tw-gap-2">
                <q-icon name="error" class="tw-pt-2" color="blue-grey-7" size="sm" />
                <span>To change the email address linked to your account you need to contact
                  <span
                    class="tw-cursor-pointer tw-font-bold tw-text-yellow-400 tw-underline-offset-4 hover:tw-underline"
                  >
                    customer
                    support
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div> -->
        <q-form class="tw-w-full" @submit="updateUserInfo">
          <div class="tw-flex tw-h-full tw-w-full tw-flex-col">
            <div class="tw-grow tw-border tw-bg-white tw-p-4 tw-pb-12">
              <h5 class="tw-text-lg tw-font-bold">
                PERSONAL INFORMATION
              </h5>
              <q-for class="tw-mt-4 tw-grid tw-grid-cols-2 tw-gap-4">
                <q-input v-model="state.firstName" type="text" outlined label="First name" class="tw-shadow-md" />
                <q-input v-model="state.email" type="email" outlined label="Email" class="tw-shadow-md" />
                <q-input v-model="state.lastName" type="text" outlined label="Last name" class="tw-shadow-md" />
                <!-- <q-input type="date" outlined label="Document issued date" class="tw-shadow-md" /> -->
                <!-- <q-input type="date" outlined label="Date of birth" class="tw-shadow-md" /> -->
                <q-input v-model="state.phoneNumber" type="text" outlined label="Phone number" class="tw-shadow-md" />
                <div class="tw-space-y-4">
                  <q-input v-model="state.username" type="text" outlined label="User name" class="tw-shadow-md" />
                  <q-input
                    v-model="state.address"
                    type="text" outlined label="Permanent registration address"
                    class="tw-shadow-md"
                  />
                </div>
                <!-- <q-input type="text" outlined label="National Id" class="tw-shadow-md" /> -->
              </q-for>
            </div>
            <div class="tw-mt-16 tw-px-8">
              <q-btn type="submit" class="tw-w-full" color="primary" size="lg" :loading>
                SAVE
              </q-btn>
            </div>
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>
