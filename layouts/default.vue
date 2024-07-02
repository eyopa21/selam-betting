<template>
  <div class="dark:tw-bg-primary-800">
    <q-layout view="lHh lpr lff">
      <q-header elevated class="tw-bg-secondary-800 dark:tw-bg-primary-700">
        <Header />
      </q-header>

      <q-page-container>
        <hr class="tw-h-4 tw-bg-secondary-800 tw-my-2" />
        <div class="tw-grid tw-grid-cols-12 w-full custom-container tw-gap-4 tw-py-8">
          <div class="tw-col-span-3 tw-hidden lg:tw-block">
            <div class="tw-sticky tw-top-24">
              <HomeFilter />
            </div>
          </div>
          <div class="lg:tw-col-span-6 tw-col-span-12">
            <slot />
          </div>
          <div class="tw-col-span-3 tw-hidden lg:tw-block">
            <div class="tw-sticky tw-top-24 max-w-full">
              <Slips />
            </div>
          </div>
        </div>
      </q-page-container>

      <q-footer elevated>
        <Footer />
      </q-footer>
    </q-layout>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();

onMounted(async () => {
  await userStore.getUser();
});
</script>

<style>
.custom-container {
  max-width: 1800px;
  margin: auto;
}
</style>
