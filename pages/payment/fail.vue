<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>

<template>
  <div class=" tw-flex tw-h-screen tw-w-full tw-items-center tw-justify-center tw-bg-gray-100">
    <div class="tw-bg-white tw-p-6 md:tw-mx-auto">
      <div class="tw-flex tw-w-full tw-justify-center">
        <div class="tw-flex tw-h-16 tw-w-16 tw-items-center tw-justify-center tw-rounded-full tw-bg-red-500">
          <q-icon name="close" size="xl" class="text-white tw-size-16" />
        </div>
      </div>
      <div class="tw-space-y-4 tw-text-center">
        <h3 class="tw-text-center tw-text-base tw-font-semibold tw-text-gray-900 md:tw-text-2xl">
          Payment failure!
        </h3>
        <p class="tw-my-2 tw-text-gray-600">
          We couldn't process your payment please try again, please!!
        </p>
        <p> Have a great day!  </p>
        <div class="tw-py-10 tw-text-center">
          <q-btn to="/" color="primary">
            Go Back
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>
