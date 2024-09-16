<script setup lang="ts">
const props = defineProps<{
  url: string
  name: string
}>()

const emit = defineEmits<{
  pay: [string, number]
}>()
const getName = computed(() => {
  if (props.name === 'COMMERCIAL BANK OF ETHIOPIA') {
    return 'CBE'
  } else {
    return props.name
  }
})
const { $authentication } = useNuxtApp()
const imageData = ref<string | null>(null)
const state = ref({
  amount: 0,

})
const isOpen = ref(false)
const form = ref()
onMounted(async () => {
  try {
    const response = await $fetch<Blob>(`http://162.55.223.95:8000${props.url}`, {
      headers: {
        Authorization: `Bearer ${$authentication.accessToken.value}`,
      },
      cache: 'force-cache',
    })
    if (response) {
      imageData.value = URL.createObjectURL(response)
    } else {
      console.error('Failed to fetch the image:')
    }
  } catch (err) {
    console.error('Failed to fetch the image:', err)
  }
})

function onSubmit() {
  emit('pay', props.name, state.value.amount)
}
</script>

<template>
  <div class="tw-cursor-pointer tw-transition-all tw-duration-500 hover:tw-scale-105" @click="isOpen = true">
    <q-img v-if="imageData" fit="scale-down" :src="imageData" :alt="props.name" class="tw-h-20 tw-w-32" />
    <div class="tw-w-full tw-bg-primary-500 tw-text-center tw-capitalize tw-text-white">
      {{ getName }}
    </div>
  </div>
  <q-dialog v-model="isOpen">
    <div>
      <q-form
        ref="form"
        class="q-gutter-md"
        @submit="onSubmit"
      >
        <q-card class="tw-p-4">
          <q-card-section>
            <div class="text-h6">
              <q-img v-if="imageData" :src="imageData" fit="contain" class="tw-h-20 tw-w-full" />
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section style="max-height: 50vh" class="scroll tw-my-8">
            <div class="tw-grid tw-grid-cols-2 tw-gap-8">
              <label for="available" class="tw-flex   tw-flex-col tw-text-lg tw-font-bold">
                <span>Amount (Min5.00 ETB / Max 15000.00 ETB):</span>

              </label>
              <q-input
                v-model="state.amount"
                filled
                type="number"
                lazy-rules
                :rules="[
                  val => val >= 5 || 'Minimum deposit amount is 5 Birr',
                  val => val <= 15000 || 'Maximum deposit amount is 15,000 Birr',
                ]"
              />

              <!-- <label for="available" class="tw-text-md tw-flex tw-w-full tw-flex-col tw-place-content-center tw-font-bold">
                <span>Your telebirr account number:</span>

              </label>
              <q-input
                v-model="state.phoneNUmber"
                placeholder="09/07 XXX-XXX-XX"
                type="number"
                filled
                lazy-rules
              /> -->
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right" class="tw-mt-4">
            <q-btn type="submit" class="tw-w-full" label="CONFIRM" color="red-10" size="lg" />
          </q-card-actions>
        </q-card>
      </q-form>
    </div>
  </q-dialog>
</template>
