<script setup lang="ts">
import { biCheckLg } from '@quasar/extras/bootstrap-icons'
import type { NuxtError } from '#app'

const isOpen = ref(false)
const userStore = useUserStore()
const { $authentication } = useNuxtApp()
const amount = ref(0)
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
        amount: amount.value,
      },
    })
    if (res) {
      $q.notify({
        message: `You have successfully converted Birr${amount.value}`,
        color: 'green',
      })
      isOpen.value = false
      form.value.reset()
    }
  } catch (err) {
    useErrorNotifications(ref(err as NuxtError))
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <q-btn icon="restart_alt" label="Convert to Stake" color="primary" @click="isOpen = true" />
  <q-dialog v-model="isOpen">
    <div>
      <q-form
        ref="form"
        class="q-gutter-md"
        @submit="onSubmit"
      >
        <q-card>
          <q-card-section>
            <div class="text-h6">
              Convert To Stake
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section style="max-height: 50vh" class="scroll">
            <div class="tw-flex tw-flex-col tw-space-y-8">
              <div class="tw-flex tw-w-full tw-items-center tw-gap-8 ">
                <label for="available" class="tw-flex  tw-w-2/3 tw-flex-col tw-text-xl tw-font-bold">
                  <span>Available amount:</span>

                </label>
                <q-field filled dense>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="0">
                      ETB {{ userStore.user?.payout_balance.balance }}
                    </div>
                  </template>
                </q-field>
              </div>
              <div class="tw-flex tw-w-full tw-items-center tw-gap-8">
                <label for="available" class="tw-flex tw-w-full tw-flex-col tw-text-xl tw-font-bold">
                  <span>Enter Amount:</span>
                  <span class="tw-text-xs tw-font-thin">Amount (Min5.00 ETB / Max 15,000.00 ETB):</span>
                </label>
                <q-input
                  v-model="amount"
                  type="number"
                  dense
                  lazy-rules
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
            <q-btn :loading="loading" type="submit" flat label="Proceed" color="primary" />
          </q-card-actions>
        </q-card>
      </q-form>
    </div>
  </q-dialog>
</template>
