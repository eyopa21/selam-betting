<script setup lang="ts">
const isOpen = ref(false)
const userStore = useUserStore()

const amount = ref(0)

function onSubmit() {
  console.log('hello')
}
</script>

<template>
  <q-btn icon="request_page" label="Request Payout" color="red-10" @click="isOpen = true" />
  <q-dialog v-model="isOpen">
    <div>
      <q-form
        class="q-gutter-md"
        @submit="onSubmit"
      >
        <q-card>
          <q-card-section>
            <div class="text-h6 tw-uppercase">
              Request For Payout
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section style="max-height: 50vh" class="scroll">
            <div class="tw-flex tw-min-w-96 tw-flex-col tw-space-y-8">
              <div class="tw-flex tw-w-full tw-items-center tw-gap-8 ">
                <q-field class="tw-w-full" filled label="Available stake balance" stack-label>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="0">
                      ETB {{ userStore.user?.stake_balance.stake_balance }}
                    </div>
                  </template>
                </q-field>
              </div>
              <div class="tw-flex tw-w-full tw-items-center tw-gap-8">
                <q-input
                  v-model="amount"
                  type="number"
                  dense
                  outline
                  label="Enter Amount:"
                  hint="Amount (Min5.00 ETB / Max 15,000.00 ETB):"
                  lazy-rules
                  class="tw-w-full"
                  :rules="[
                    val => val > 5 || 'Invalid payout amount',
                    val => val <= +userStore.user?.stake_balance.stake_balance! || 'You have no enough balance',
                  ]"
                />
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn type="submit" flat label="Proceed" color="primary" />
          </q-card-actions>
        </q-card>
      </q-form>
    </div>
  </q-dialog>
</template>
