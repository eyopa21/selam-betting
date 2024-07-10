<template>
  <div class="dark:tw-bg-primary-800">
    <q-layout view="hHh LpR fff">
      <q-header elevated class="tw-bg-secondary-800 dark:tw-bg-gray-800">
        <Header />
      </q-header>

      <q-drawer v-model="layout.showDrawer"  side="left"  show-if-above
              :width="300"
              
            :class="$q.dark.isActive ? 'tw-gray-800' : 'tw-gray-800'">
              <HomeFilter  />
          </q-drawer>

      <q-page-container class="tw-bg-gray-900">

        <div class="">
          
        </div>
        <div class="tw-grid tw-grid-cols-12 w-full tw-ml-4 tw-gap-4 tw-py-8">

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
