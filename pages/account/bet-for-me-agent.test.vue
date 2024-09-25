<script setup lang="ts">
import type { NuxtError } from '#app'
import type { CreateBetForMeAccountBody } from '~/server/api/betForMe/create-account.post'

definePageMeta({
  layout: 'account',
  pageType: 'authenticated',
})

const { $authentication } = useNuxtApp()
const loading = ref(false)
const state = ref<Partial<CreateBetForMeAccountBody>>({
  profile_picture: undefined,
  id_images: undefined,
})
function onFileAdded(files: File[]) {
  console.log('files', files[0])
  state.value.profile_picture = files[0]
}

function onIdFileAdded(files: File[]) {
  console.log('files', files)
  state.value.id_images = [files[0], files[1]]
}

async function createAccount() {
  loading.value = true
  try {
    const res = await $fetch('/api/betForMe/create-account', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${$authentication.accessToken.value}`,
      },
      body: state.value,
    })
    if (res) {
      useSuccessNotification('You have successfully created create an account')
    }
  } catch (err) {
    useErrorNotifications(ref(err as NuxtError))
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="tw-px-4 tw-text-primary-500">
    <div class="tw-font-bold ">
      <h4 class="tw-text-lg">
        Personal Profile {{ state.profile_picture }}
      </h4>
      <p>Fill in the empty fields to take advantage of the enhanced features of the HarifSport website</p>
    </div>
    <div class="tw-mt-2">
      <q-bar dark class="bg-white text-primary tw-py-5">
        <div class=" text-left text-weight-bold tw-pl-4">
          FILL IN PROFILE
        </div>
      </q-bar>
    </div>
    <div class="tw-mt-4">
      <div class="tw-flex tw-justify-between tw-gap-6">
        <div class="tw-flex tw-w-1/2 tw-flex-col tw-gap-4">
          <div class="tw-border  tw-bg-white tw-p-4">
            <h5 class="tw-text-lg tw-font-bold">
              ACCOUNT
            </h5>
            <div>
              <q-uploader
                style="max-width: 300px"
                @added="onFileAdded"
              />
            </div>
          </div>
          <div class="tw-border  tw-bg-white tw-p-4">
            <h5 class="tw-text-lg tw-font-bold">
              CONTACTS
            </h5>

            <q-uploader
              style="max-width: 300px"
              multiple
              max-files="2"
              @added="onIdFileAdded"
            />
          </div>
        </div>

        <q-btn :loading @click="createAccount">
          Create
        </q-btn>
      </div>
    </div>
  </div>
</template>
