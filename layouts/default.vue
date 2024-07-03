<template>
  <div class="dark:tw-bg-primary-800">
    <q-layout view="lHh lpr lff">
      <q-header elevated class="tw-bg-secondary-800 dark:tw-bg-primary-700">
        <Header />
      </q-header>

      <q-page-container>

        <div class="">
          <q-drawer v-model="layout.showDrawer" show-if-above :mini="layout.miniState"
            @mouseover="layout.miniState = false" @mouseout="layout.miniState = true" mini-to-overlay :width="300"
            :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">

            <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: '0' }">
              <HomeFilter />
            </q-scroll-area>

          </q-drawer>
        </div>
        <div class="tw-grid tw-grid-cols-12 w-full custom-container tw-gap-4 tw-py-8">

          <div class="lg:tw-col-span-10 tw-col-span-12">
            <slot />
          </div>
          <div class="tw-col-span-2 tw-hidden lg:tw-block">
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
const layout = useLayout();
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
