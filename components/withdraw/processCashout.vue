<script setup lang="ts">
const emit = defineEmits<{
  refetch: [void]
}>()

const { $authentication } = useNuxtApp()
const showPassword = ref(false)
const isOpen = ref(false)
const state = ref({
  amount: null,
  password: undefined,
})

const loading = ref(false)

async function requestCashout() {
  loading.value = true
  try {
    const response = await $fetch('/api/finance/cashout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${$authentication.accessToken.value}`,
      },
      body: {
        amount: +state.value.amount,
        password: state.value.password,
      },
    })
    if (response) {
      emit('refetch')
      useSuccessNotification('Process successful')
      isOpen.value = false
      state.value.amount = 0
      state.value.password = undefined
    }
  } catch (err) {
    useErrorNotifications(ref(err))
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <q-btn label="Request Cashout" icon-right="send" dark unelevated class="bg-positive text-white s tw-mx-8  tw-w-full" @click="isOpen = true" />
  <q-dialog v-model="isOpen" backdrop-filter="brightness(50%)">
    <div>
      <q-form
        ref="form"
        class="q-gutter-md"
        @submit="requestCashout"
      >
        <q-card class="tw-w-96">
          <q-card-section class="row items-center q-pb-none q-pa-md">
            <div class="text-h6 q-ml-md">
              Process Cashout
            </div>
            <q-space />
            <q-btn v-close-popup icon="close" size="sm" dense flat rounded />
          </q-card-section>

          <q-separator />
          <q-card-section>
            <div class="q-pa-md tw-grid tw-grid-cols-1 tw-gap-4">
              <q-input
                v-model="state.amount"
                placeholder="amount"
                dense
                label="Amount In Birr"
                hint="Amount (Min5.00 ETB / Max 15,000.00 ETB)"
                outlined
                name="amount"
                type="number"
                lazy-rules
                :rules="[
                  val => val >= 5 || 'Minimum deposit amount is 5 Birr',
                  val => val <= 15000 || 'Maximum deposit amount is 15,000 Birr',
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
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right" class="tw-mt-4">
            <q-btn type="submit" :label="loading ? 'Loading...' : 'Confirm'" no-caps unelevated color="primary" />
          </q-card-actions>
        </q-card>
      </q-form>
    </div>
  </q-dialog>
</template>
