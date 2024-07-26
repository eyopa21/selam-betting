







<template>
  <q-layout view="lHh LpR fff" class="dark:tw-bg-primary-800">

    <q-header elevated class="tw-bg-secondary-800 dark:tw-bg-gray-800">
      <Header />
    </q-header>

    <q-drawer v-model="layout.showLeftDrawer" side="left" behavior="mobile">
      <q-scroll-area class="fit">
        <HomeFilter />
      </q-scroll-area>
    </q-drawer>

    <q-drawer show-if-above v-model="layout.showRightDrawer" side="right" :mini="layout.rightMiniState"
      class="tw-bg-secondary-800 dark:tw-bg-gray-800 tw-px-2">

      <div class="tw-w-full  tw-flex tw-justify-center tw-my-4">
        <q-btn @click="layout.rightMiniState = !layout.rightMiniState" padding="none" color="primary"
          class="full-width">
          <span v-if="!layout.rightMiniState" class="tw-text-xs">Collapse Block</span>
          <q-icon name="double_arrow" :class="{'tw-rotate-180': layout.rightMiniState}" />
          <q-tooltip v-if="layout.rightMiniState" anchor="top left" self="center middle">Expand/Collapse</q-tooltip>
        </q-btn>
      </div>
      <NavMiniRightDrawerContent v-if="layout.rightMiniState" />
      <Slips v-else />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated>
      <Footer />
    </q-footer>

  </q-layout>
</template>

<script setup>

const userStore = useUserStore();
const layout = useLayout();
onMounted(async () => {
  await userStore.getUser();
});
</script>