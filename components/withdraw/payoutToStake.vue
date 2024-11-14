<script setup lang="ts">
import type { NuxtError } from '#app'

const isOpen = ref(false)
const userStore = useUserStore()
const { $authentication } = useNuxtApp()
const { fetchUserInfo } = useUserInfo()
const state = ref({
  amount: null,
})
const form = ref()
const loading = ref(false)
const $q = useQuasar()

async function onSubmit() {
  loading.value = true
  try {
    const res = await $fetch('/api/finance/payout-to-stake', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${$authentication.accessToken.value}`,
      },
      body: {
        amount: state.value.amount,
      },
    })
    if (res) {
      $q.notify({
        message: `You have successfully converted Birr${state.value.amount}`,
        color: 'green',
      })
      isOpen.value = false
      form.value.reset()
      await fetchUserInfo()
    }
  } catch (err) {
    useErrorNotifications(ref(err as NuxtError))
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <q-btn icon="restart_alt" unelevated label="Convert to Stake" class="tw-h-12" color="primary" @click="isOpen = true" />
  <q-dialog v-model="isOpen" backdrop-filter="brightness(50%)">
    <div>
      <q-form
        ref="form"
        class="q-gutter-md"
        @submit="onSubmit"
      >
        <q-card class="tw-w-96">
          <q-card-section class="row items-center q-pb-none q-pa-md">
            <div class="text-h6 q-ml-md">
              Convert to Stake
            </div>
            <q-space />
            <q-btn v-close-popup icon="close" size="sm" dense flat rounded />
          </q-card-section>

          <q-separator />

          <q-card-section style="max-height: 50vh" class="scroll">
            <div class="q-pa-md tw-grid tw-grid-cols-1 tw-gap-4">
              <div class="tw-flex tw-w-full tw-items-center tw-gap-8 ">
                <q-field class="tw-w-full" outlined disable label="Available amount:" stack-label>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="0">
                      ETB {{ userStore.user?.payout_balance.balance }}
                    </div>
                  </template>
                </q-field>
              </div>

              <div class="tw-flex tw-w-full tw-items-center tw-gap-8">
                <q-input
                  v-model="state.amount"
                  type="number"
                  dense
                  outlined
                  label="Enter Amount:"
                  hint="Amount (Min5.00 ETB / Max 15,000.00 ETB):"
                  lazy-rules
                  class="tw-w-full"
                  :rules="[
                    val => val > 0 || 'Invalid stake amount',
                    val => val <= +userStore.user?.payout_balance.balance! || 'You have no enough balance',
                  ]"
                />
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn :loading="loading" no-caps type="submit" unelevated label="Proceed" color="primary" />
          </q-card-actions>
        </q-card>
      </q-form>
    </div>
  </q-dialog>
</template>
