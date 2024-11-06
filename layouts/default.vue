<script setup lang="ts">
const layout = useLayout()

layout.value.showSideBarProfileMenu = false
</script>

<template>
  <!-- view="hhh lpr lff"  -->
  <q-layout container view="hHh Lpr lff" class="dark:tw-bg-primary-900">
    <q-header elevated class="tw-bg-secondary-800 dark:tw-bg-primary-900">
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
      class="tw-h-full tw-bg-secondary-800  tw-px-2 tw-py-4  tw-pt-3 dark:tw-bg-primary-900"
    >
      <div class="tw-h-full tw-space-y-2 tw-rounded-2xl tw-bg-primary-800 tw-py-4" :class="layout.rightMiniState ? 'tw-p-2 ' : 'tw-p-3 '">
        <div class=" tw-flex tw-w-full tw-justify-center ">
          <q-btn
            padding="none" color="primary" class="full-width -tw-mx-2 tw-p-8"
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
