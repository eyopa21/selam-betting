<script setup lang="ts">
const emit = defineEmits<{
  refetch: [void]
}>()

const { $authentication } = useNuxtApp()
const showPassword = ref(false)
const isOpen = ref(false)
const state = ref({
  amount: 0,
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
  <q-btn label="Request Cashout" no-caps icon-right="send" dark unelevated class="bg-positive text-white s tw-mx-8  tw-w-full" @click="isOpen = true" />
  <q-dialog v-model="isOpen">
    <div>
      <q-form
        ref="form"
        class="q-gutter-md"
        @submit="requestCashout"
      >
        <q-card class="tw-w-96 tw-p-4">
          <q-card-section>
            <div class="text-h6">
              Process your cashout
            </div>
          </q-card-section>

          <q-separator />
          <q-card-section>
            <div class="tw-space-y-8">
              <q-input
                v-model="state.amount"
                placeholder="amount"
                dense
                label="Amount In Birr"
                hint="Amount (Min5.00 ETB / Max 15,000.00 ETB)"
                outlined
                class="tw-w-full "
                filled
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
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right" class="tw-mt-4">
            <q-btn type="submit" class="tw-w-full" :label="loading ? 'Loading...' : 'CONFIRM'" color="red-10" size="lg" />
          </q-card-actions>
        </q-card>
      </q-form>
    </div>
  </q-dialog>
</template>
