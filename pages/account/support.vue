<script setup lang="ts">
definePageMeta({
  layout: 'account',
  pageType: 'authenticated',
})
const { $authentication } = useNuxtApp()
const openMessenger = ref(false)
const loading = ref(false)

const state = ref({
  subject: '',
  description: '',
  attachment: [],
})
async function onSubmit() {
  loading.value = true
  try {
    const response = await $fetch('/api/contact/create-ticket', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${$authentication.accessToken.value}`,
      },
      body: {
        ...state.value,
        attachment: state.value.attachment[0],
      },
    })
    if (response) {
      useSuccessNotification('You have send your message, and we will get back to you soon')
      onReset()
    }
  } catch (err) {
    useErrorNotifications(ref(err))
  } finally {
    loading.value = false
  }
}
function onReset() {
  state.value.subject = ''
  state.value.description = ''
  state.value.attachment = []
  openMessenger.value = false
}
</script>

<template>
  <div class="tw-text-primary-500">
    <div class="tw-flex tw-items-center tw-justify-between tw-p-2 tw-pl-4 tw-font-bold tw-uppercase">
      <div>
        <h4 class="tw-text-lg">
          Support Center
        </h4>
        <p>For all your website queries</p>
      </div>
      <CustomerSupportChat />
    </div>
    <div class="tw-mt-2 tw-grid  tw-grid-cols-1 tw-gap-4 tw-px-4 lg:tw-grid-cols-3">
      <div class="tw-col-span-2">
        <CustomerSupportContact />
      </div>
      <div class="">
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
            <q-btn :loading type="submit" color="primary" class="tw-w-full">
              SAVE
            </q-btn>
            <q-btn type="reset" color="blue-grey-2" text-color="primary" class="tw-w-full">
              CLEAR
            </q-btn>
          </div>
        </q-form>
      </div>
    </div>

    <!-- <CustomerSupportFaq /> -->
  </div>
</template>
