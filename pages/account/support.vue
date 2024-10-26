<script setup lang="ts">
definePageMeta({
  layout: 'account',
  pageType: 'authenticated',
})

const openMessenger = ref(false)

const state = ref({
  subject: '',
  description: '',
  attachment: undefined,
})

function onSubmit() {

}

function onReset() {

}
</script>

<template>
  <div class="tw-text-primary-500">
    <div class="tw-p-2 tw-pl-4 tw-font-bold tw-uppercase">
      <h4 class="tw-text-lg">
        Support Center
      </h4>
      <p>For all your website queries</p>
    </div>
    <div class="tw-mt-2 tw-grid tw-grid-cols-3 tw-gap-4 tw-px-4">
      <div class="tw-col-span-2">
        <CustomerSupportContact />
      </div>
      <div
        v-if="!openMessenger"
        class="tw-flex tw-min-h-64 tw-flex-col tw-items-center tw-justify-between tw-rounded-xl tw-bg-white tw-p-4 tw-text-center tw-shadow-xl"
      >
        <div class="tw-flex tw-h-full tw-flex-col tw-place-content-center tw-items-center">
          <q-icon name="question_answer" size="xl" color="primary" />
          <p class="tw-text-lg tw-font-extrabold">
            Online consultant
          </p>
          <p class="tw-font-semibold">
            Ask any questions directly in the chat
          </p>
        </div>
        <q-btn class="tw-mt-auto tw-w-full tw-align-bottom" color="primary" @click="openMessenger = true">
          ORDER CALLBACK
        </q-btn>
      </div>
      <!-- <div
        class="tw-flex tw-min-h-64 tw-flex-col tw-items-center tw-justify-center tw-rounded-xl tw-bg-white tw-p-4 tw-text-center tw-shadow-xl"
      >
        <q-icon name="support_agent" size="xl" color="primary" />
        <p class="tw-text-lg tw-font-extrabold">
          Callback
        </p>
        <p class="tw-font-semibold">
          Please complete a request and an operator will get back to you shortly
        </p>
        <div class="tw-flex tw-w-full tw-flex-col tw-gap-2 tw-pt-8">
          <q-input outlined label="First name" dense class="tw-shadow-xl" />
          <q-input outlined label="Phone number" dense />

          <q-input autogrow outlined label="Please describe the issue here" />
        </div>
        <q-btn class="tw-mt-4 tw-w-full" color="primary">
          ORDER CALLBACK
        </q-btn>
      </div> -->

      <q-form
        v-else
        class="tw-flex  tw-min-h-64 tw-flex-col tw-items-center tw-justify-center tw-rounded-xl tw-bg-white tw-p-4 tw-text-center tw-shadow-xl"
        @submit="onSubmit"
        @reset="onReset"
      >
        <q-icon name="privacy_tip" size="xl" color="primary" />
        <p class="tw-text-lg tw-font-extrabold">
          Customer Support query
        </p>
        <div class="tw-flex tw-h-full tw-w-full tw-flex-col  tw-gap-2 tw-pt-4">
          <div class="tw-flex tw-w-full tw-gap-4">
            <q-input
              v-model="state.subject"
              outlined label="Subject"
              dense
              class="tw-w-full"
              lazy-rules
              :rules="[val => val && val.length > 0 || 'Subject is required']"
            />
          </div>
          <q-input
            v-model="state.description"
            type="textarea"
            outlined label="Compose message" dense
            class=" "
            lazy-rules
            :rules="[
              (val) => val && val.length > 0 || 'Description is required',
              (val) => val && val.length >= 10 || 'Minimum of 10 chars is required',
            ]"
          />
          <q-file v-model="state.attachment" outlined label="Attachment" class="tw-mt-4 ">
            <template #append>
              <q-icon name="attachment" color="primary" />
            </template>
          </q-file>
        </div>
        <div class="tw-mt-6 tw-flex tw-w-full tw-justify-between tw-gap-4">
          <q-btn type="submit" color="primary" class="tw-w-full">
            SAVE
          </q-btn>
          <q-btn type="reset" color="blue-grey-2" text-color="primary" class="tw-w-full">
            CLEAR
          </q-btn>
        </div>
      </q-form>
    </div>
    <hr>
    <CustomerSupportFaq />
  </div>
</template>
