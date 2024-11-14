<script setup lang="ts">
const { fetchUserInfo } = useUserInfo()
const isOpen = ref(false)
const loading = ref(false)
const showPassword = ref(false)
const form = ref(null)
const userStore = useUserStore()
const { $authentication } = useNuxtApp()
const state = ref({
  phoneNumber: undefined,
  amount: undefined,
  isPayout: false,
  password: undefined,

})

async function onSubmit() {
  loading.value = true
  try {
    const response = await $fetch('/api/finance/send-money-to-friend', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${$authentication.accessToken.value}`,
      },
      cache: 'force-cache',
      body: {
        amount: state.value.amount,
        is_stake_balance: !state.value.isPayout,
        password: state.value.password,
        phone_number: state.value.phoneNumber,
      },
    })
    if (response) {
      useSuccessNotification(response.Message)
      isOpen.value = false
      state.value.phoneNumber = state.value.amount = state.value.password = undefined
      await fetchUserInfo()
    } else {
      console.error('Failed to send your money')
    }
  } catch (err) {
    useErrorNotifications(ref(err))
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <q-btn icon="request_page" label="Send money to your friend" outline class="tw-h-12" unelevated color="primary" @click="isOpen = true" />
  <q-dialog v-model="isOpen" @hide=" state.phoneNumber = state.amount = state.password = undefined">
    <div>
      <q-form
        ref="form"
        class="q-gutter-md"
        @submit="onSubmit"
      >
        <q-card>
          <q-card-section>
            <div class="text-h6">
              Send money to your friend
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section style="max-height: 50vh" class="scroll">
            <div class="tw-flex tw-flex-col tw-space-y-4">
              <div class="tw-flex tw-w-full tw-min-w-96 tw-flex-row tw-items-center tw-gap-8 ">
                <q-field class="tw-w-full" filled label="Available stake balance" stack-label>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="0">
                      ETB {{ userStore.user?.stake_balance.stake_balance }}
                    </div>
                  </template>
                </q-field>
                <q-field class="tw-w-full" filled label="Available payout balance" stack-label>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="0">
                      ETB {{ userStore.user?.payout_balance.balance }}
                    </div>
                  </template>
                </q-field>
              </div>
              <hr>
              <div class="tw-space-y-2">
                <q-input
                  v-model="state.phoneNumber"
                  counter maxlength="10"
                  placeholder="09/07XXXXXXXXX"
                  type="text"
                  dense
                  name="phone"
                  label="Phone number"
                  outlined
                  class="tw-w-full "
                  lazy-rules
                  :rules="[
                    (val) => !!val || 'Phone number is required',
                    (val) => validatePhoneNumber(val) || 'Invalid phone number 09, 07',
                  ]"
                />
                <q-input
                  v-model="state.amount"
                  type="number"
                  name="amount"
                  outlined
                  dense
                  label="Enter Amount"
                  hint="Amount (Min5.00 ETB / Max 15,000.00 ETB)"
                  lazy-rules
                  class="tw-w-full"
                  :rules="[
                    (val) => !!val || 'Amount is required',
                    val => val > 5 || 'Invalid payout amount',
                    val => ((val <= +userStore.user?.stake_balance.stake_balance! && !state.isPayout) || (val <= +userStore.user?.payout_balance.balance! && !!state.isPayout)) || 'You have no enough balance',
                  ]"
                />
                <q-input
                  v-model="state.password"

                  name="password"
                  outlined
                  :type="!showPassword ? 'password' : 'text'"

                  label="Password"
                  dense
                  lazy-rules
                  class="tw-w-full"
                  :rules="[
                    (val) => !!val || 'Password is required',
                    (val) => val.length >= 6 || 'Minimum of 6 chars is required',

                  ]"
                >
                  <template #append>
                    <q-icon
                      :name="showPassword ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="showPassword = !showPassword"
                    />
                  </template>
                </q-input>
                <div class="tw-flex tw-w-full tw-justify-end">
                  <q-toggle v-model="state.isPayout" label="Transfer from payout" />
                </div>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn type="submit" :loading flat label="Proceed" color="primary" />
          </q-card-actions>
        </q-card>
      </q-form>
    </div>
  </q-dialog>
</template>
