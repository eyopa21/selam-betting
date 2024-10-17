<script setup lang="ts">
const layout = useLayout()
</script>

<template>
  <q-layout view="hhh lpr lff" container class="dark:tw-bg-primary-900">
    <q-header elevated class="tw-bg-secondary-800 dark:tw-bg-gray-800">
      <Header />
    </q-header>

    <q-drawer v-model="layout.showLeftDrawer" side="left" class="tw-bg-primary-900 tw-p-2" @hide="layout.showSideBarProfileMenu = false">
      <HomeFilter />
    </q-drawer>

    <q-page-container>
      <div class=" tw-m-2 tw-ml-0 tw-mt-4 tw-rounded-3xl tw-bg-primary-700 tw-p-4">
        <slot />
      </div>
    </q-page-container>

    <q-drawer
      v-model="layout.showRightDrawer" show-if-above side="right" :mini="layout.rightMiniState"
      class="tw-bg-secondary-800  tw-px-2  tw-pt-3 dark:tw-bg-primary-900"
    >
      <div class="tw-rounded-2xl tw-bg-primary-800 tw-p-4">
        <div class=" tw-flex tw-w-full tw-justify-center ">
          <q-btn
            padding="none" color="primary" class="full-width -tw-mx-2"
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
      </div>
    </q-drawer>

    <q-footer elevated>
      <Footer />
    </q-footer>
  </q-layout>
</template>
