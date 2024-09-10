<script setup lang="ts">
const layout = useLayout()
</script>

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

    <q-drawer
      v-model="layout.showRightDrawer" show-if-above side="right" :mini="layout.rightMiniState"
      class="tw-bg-secondary-800 tw-px-2 dark:tw-bg-gray-800"
    >
      <div class="tw-my-4  tw-flex tw-w-full tw-justify-center">
        <q-btn
          padding="none" color="primary" class="full-width"
          @click="layout.rightMiniState = !layout.rightMiniState"
        >
          <span v-if="!layout.rightMiniState" class="tw-text-xs">Collapse Block</span>
          <q-icon name="double_arrow" :class="{ 'tw-rotate-180': layout.rightMiniState }" />
          <q-tooltip v-if="layout.rightMiniState" anchor="top left" self="center middle">
            Expand/Collapse
          </q-tooltip>
        </q-btn>
      </div>
      <NavMiniRightDrawerContent v-if="layout.rightMiniState" />
      <Slips v-else />
    </q-drawer>

    <q-page-container>
      <slot />
    </q-page-container>

    <q-footer elevated>
      <Footer />
    </q-footer>
  </q-layout>
</template>
