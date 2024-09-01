<script setup lang="ts">
definePageMeta({
  layout: 'account',
})

const progress = ref(0.33)
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
        <div class="tw-flex tw-w-1/2 tw-flex-col tw-gap-4">
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
        </div>
        <div class="tw-flex tw-h-full tw-w-1/2 tw-flex-col">
          <div class="tw-grow tw-border tw-bg-white tw-p-4 tw-pb-12">
            <h5 class="tw-text-lg tw-font-bold">
              PERSONAL INFORMATION
            </h5>
            <div class="tw-mt-4 tw-grid tw-grid-cols-2 tw-gap-4">
              <q-input type="text" outlined label="First name" dense class="tw-shadow-md" />
              <q-input type="text" outlined label="Last name" dense class="tw-shadow-md" />
              <q-input type="text" outlined label="Account" dense class="tw-shadow-md" />
              <q-input type="date" outlined label="Document issued date" dense class="tw-shadow-md" />
              <q-input type="date" outlined label="Date of birth" dense class="tw-shadow-md" />
              <q-input type="text" outlined label="Country" dense class="tw-shadow-md" />
              <q-input type="text" outlined label="Place of birth" dense class="tw-shadow-md" />
              <q-input
                type="text" outlined label="Permanent registration address" dense
                class="tw-shadow-md"
              />
              <q-input type="text" outlined label="National Id" dense class="tw-shadow-md" />
            </div>
          </div>
          <div class="tw-mt-16 tw-px-8">
            <q-btn class="tw-w-full" color="primary" size="lg">
              SAVE
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
