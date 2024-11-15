<script setup lang="ts">
const error = useError()
</script>

<template>
  <!-- This is an example component -->
  <div class="tw-flex tw-h-screen tw-w-screen tw-items-center tw-bg-gray-50">
    <div class="tw-container tw-flex tw-flex-col tw-items-center tw-justify-between tw-px-5 tw-text-gray-700 md:tw-flex-row">
      <div class="tw-mx-8 tw-w-full lg:tw-w-1/2">
        <pre>

       {{ error }}
     </pre>
        <div class="tw-font-dark tw-mb-8 tw-text-7xl tw-font-extrabold tw-text-green-500">
          {{ error?.statusCode }}
        </div>
        <p class="tw-mb-8 tw-text-2xl tw-font-light tw-leading-normal md:tw-text-3xl">
          {{ error?.statusMessage }}
        </p>
        <!-- <pre>{{ error }}</pre> -->
        <q-btn class="" color="primary" size="lg" to="/">
          back to homepage
        </q-btn>
      </div>
      <div class="tw-mx-5 tw-my-12 tw-w-full lg:tw-flex lg:tw-w-1/2 lg:tw-justify-end">
        <img src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg" class="" alt="Page not found">
      </div>
    </div>
  </div>
</template>
