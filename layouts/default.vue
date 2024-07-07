<template>
  <div class="dark:tw-bg-primary-800">
    <q-layout view="lHh LpR lff">
      <q-header elevated class="tw-bg-secondary-800 dark:tw-bg-gray-800">
        <Header />
      </q-header>

      <q-page-container class="tw-bg-gray-900">

        <div class="">
          <q-drawer v-model="layout.showDrawer" show-if-above :mini="layout.miniState"
            @mouseover="layout.miniState = false" @mouseout="layout.miniState = true" mini-to-overlay :width="300"
            :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">


            <q-scroll-area  class="fit tw-no-scrollbar tw-bg-primary-700" :horizontal-thumb-style="{ opacity: '0' }">
              <div v-if="layout.miniState" class="tw-flex tw-flex-col tw-gap-4 tw-m-2 tw-mt-8 ">
                <span> <q-icon name="sports_football" size="md" color="white"/></span>
                <span><q-icon name="sports_soccer" size="md" color="white"/></span>
                <span><q-icon name="sports_tennis" size="md" color="white"/></span>
                <span><q-icon name="sports_basketball" size="md" color="white"/></span>
                <span><q-icon name="two_wheeler" size="md" color="white"/></span>
                <span> <q-icon name="sports_football" size="md" color="white"/></span>
                <span><q-icon name="sports_soccer" size="md" color="white"/></span>
                <span><q-icon name="sports_tennis" size="md" color="white"/></span>
                <span><q-icon name="sports_basketball" size="md" color="white"/></span>
                <span><q-icon name="two_wheeler" size="md" color="white"/></span>
                <span><q-icon name="sports_basketball" size="md" color="white"/></span>
                <span><q-icon name="two_wheeler" size="md" color="white"/></span>
                
                
              </div>
              
              <HomeFilter  />
            </q-scroll-area>
 
          </q-drawer>
        </div>
        <div class="tw-grid tw-grid-cols-12 w-full tw-gap-4 tw-py-8">

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
