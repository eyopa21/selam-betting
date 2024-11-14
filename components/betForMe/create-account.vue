<script setup lang="ts">
import type { NuxtError } from '#app'
import type { CreateBetForMeAccountBody } from '~/server/api/betForMe/create-account.post'

const { $authentication } = useNuxtApp()
const loading = ref(false)
const state = ref<Partial<CreateBetForMeAccountBody>>({
  profile_picture: undefined,
  id_images: [{} as File, {} as File],
})
// function onFileAdded(files: File[]) {
//   state.value.profile_picture = files[0]
// }

// function onIdFileAdded(files: File[]) {
//   state.value.id_images = [files[0], files[1]]
// }

async function createAccount() {
  if (!state.value.profile_picture || !state.value.id_images?.[0] || !state.value.id_images?.[1]) {
    useErrorNotifications(ref('Please Provide Profile Picture and Id Image Front and Back'))
  } else {
    loading.value = true
    const form = new FormData()
    form.append('profile_picture', state.value.profile_picture! as File)
    state.value.id_images!.forEach((file) => {
      form.append(`id_images`, file as File)
    })
    form.append('level', '')

    try {
      const res = await $fetch('/api/betForMe/create-account', {
        method: 'POST',
        headers: {

          Authorization: `Bearer ${$authentication.accessToken.value}`,
        },
        body: form,

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
}
</script>

<template>
  <div class="tw-px-4 tw-text-primary-500">
    <div class="tw-mt-4">
      <div class="tw-flex tw-justify-between tw-gap-6">
        <div class="tw-flex tw-w-full tw-flex-col ">
          <div class=" tw-bg-white tw-p-4">
            <h5 class="tw-text-lg tw-font-bold">
              Profile Picture
            </h5>
            <div>
              <!-- <q-uploader
                style="max-width: 100%"
                class="tw-w-full"
                @added="onFileAdded"
              /> -->
              <q-file v-model="state.profile_picture" color="grey-3" outlined dense label="Label">
                <template #append>
                  <q-icon name="attachment" />
                </template>
              </q-file>
            </div>
          </div>
          <div class=" tw-bg-white tw-p-4 tw-pt-0">
            <h5 class="tw-text-lg tw-font-bold">
              ID Images
            </h5>

            <!-- <q-uploader
              style="max-width: 100%"
              multiple
              max-files="2"

              class="tw-w-full"
              @added="onIdFileAdded"
            /> -->
            <q-file v-model="state.id_images" color="grey-3" dense outlined label="Label" multiple :max-files="2">
              <template #append>
                <q-icon name="attachment" />
              </template>
            </q-file>
          </div>
          <q-btn class="tw-mt-4" :loading color="primary" @click="createAccount">
            Create
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>
