<script setup lang="ts">
import type { NearByRoot } from '~/types/forMe/nearBy'

const range = ref(10)
const loading = ref(false)

const { getLocation } = useLocation()
const { $authentication } = useNuxtApp()

const agents = ref<NearByRoot>()

async function search() {
  loading.value = true
  try {
    const location = await getLocation()
    const response = await $fetch(`/api/betForMe/near-by-search/?longitude=${location?.lon}&latitude=${location?.lat}&range=${range.value}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${$authentication.accessToken.value}`,
      },
    })
    if (response) {
      agents.value = response
    }
  } catch (err) {
    useErrorNotifications(ref(err))
  } finally {
    loading.value = false
  }
}
search()
</script>

<template>
  <div>
    <div class="tw-pr-2">
      <h4 class="tw-text-xl tw-font-bold tw-uppercase">
        Search for nearby
      </h4>
      <div class="tw-flex tw-w-full tw-justify-between tw-gap-4 tw-py-2">
        <q-input v-model="range" borderless type="number" label="Enter the maximum range" class=" tw-h-12 tw-w-full tw-rounded-md tw-bg-white tw-p-1 tw-pl-4 tw-ring-1" dense icon="magnify">
          <template #prepend>
            <q-icon name="search" />
          </template>
          <template #append>
            <div class="tw-text-sm">
              ( km )
            </div>
          </template>
        </q-input>
        <q-btn :loading class="tw-h-12 tw-self-center tw-px-8" @click="search">
          Search
        </q-btn>
      </div>
    </div>

    <q-separator class="tw-mt-4" />
    <div v-if="agents" class="tw-p-2">
      {{ agents?.count }} agents
    </div>
    <div class="tw-border  tw-bg-white tw-p-4">
      <q-list separator class="rounded-borders">
        <div v-if="loading">
          <SkeletonsNearbySearch />
        </div>
        <div v-else>
          <div v-if="!agents?.results?.length" class="tw-bg-primary-500 tw-p-8">
            <VUENoItemsFound title="Agents" message="Please, Adjust the distance and search again" :search="false" />
          </div>
          <q-item v-for="i in agents?.results" :key="i.id" v-ripple class="q-mb-sm" clickable>
            <q-item-section avatar>
              <q-avatar>
                <VUEAsyncImg :relative-path="i.profile_picture" />
              </q-avatar>
            </q-item-section>
            <q-item-section class="tw-border-2 tw-px-2">
              <q-item-label> {{ `${i.user_account.first_name} ${i.user_account.last_name}` }} </q-item-label>
            </q-item-section>
            <q-item-section side>
              <div class="tw-border-2 tw-bg-gray-100 tw-p-2 tw-px-4">
                {{ +i.distance.toFixed(2) }} km
              </div>
            </q-item-section>
            <q-separator spaced inset />
          </q-item>
        </div>
      </q-list>
    </div>
  </div>
</template>
