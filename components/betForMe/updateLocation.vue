<script setup lang="ts">
import type { Address } from '~/types/betForMe'

const { $authentication } = useNuxtApp()
const { getLocation } = await useLocation()

const loading = ref(false)
const locationAddress = ref('')

async function updateLocation() {
  loading.value = true
  try {
    const location = await getLocation()
    const response = await $fetch('/api/auth/update-location', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${$authentication.accessToken.value}`,
      },
      body: {
        address_line: locationAddress.value,
        admin_area: '',
        locality: '',
        postal_code: '',
        thoroughfare: '',
        premise: '',
        sub_premise: '',
        latitude: Math.round(location!.lat * 100) / 100,
        longitude: Math.round(location!.lon * 100) / 100,
      } as Address,
    })
    if (response) {
      locationAddress.value = ''
      useSuccessNotification('Location updated successfully')
    }
  } catch (err) {
    useErrorNotifications(ref(err))
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="tw-p-8">
    <q-form
      class="q-gutter-md tw-min-w-96"
      @submit="updateLocation()"
    >
      <q-card>
        <q-card-section>
          <div class="text-h6">
            Update your location
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <div class="tw-flex tw-flex-col tw-space-y-8">
            <div class="tw-flex tw-w-full tw-items-center tw-gap-8">
              <q-input
                v-model="locationAddress"
                type="text"
                label="Your Current Address"
                class="tw-w-full"
                outlined
                dense
                lazy-rules
                :rules="[
                  val => val.length > 5 || 'Invalid address',
                ]"
              />
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn :loading type="submit" flat label="Proceed" color="primary" />
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>
