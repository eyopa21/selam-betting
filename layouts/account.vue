<script setup lang="ts">
const layout = useLayout()
layout.value.showLeftDrawer = true
</script>

<template>
  <q-layout
    view="hhh lpr lff"
    container class="dark:tw-bg-primary-900"
  >
    <q-header reveal elevated class="tw-w-full tw-bg-secondary-800 dark:tw-bg-gray-900">
      <Header />
    </q-header>
    <q-drawer v-model="layout.showLeftDrawer" :draggable="false" persistent show-if-above side="left" class=" tw-relative tw-bg-primary-900">
      <HomeFilter />
    </q-drawer>
    <q-page-container>
      <div class="tw-m-2 ">
        <q-banner v-if="$route.name === 'account-deposit'" inline-actions class="text-white tw-bg-primary-700 ">
          <div class="text-accent tw-font-bold">
            <q-icon name="monetization_on" color="amber-10" size="sm" />
            To discover the world of gaming and winning, top up your account using any payment method from
            Worldwide!
          </div>
          <template #action>
            <q-btn flat color="white" icon="close" />
          </template>
        </q-banner>
        <div
          :class="$route.name === 'account-bonus' ? 'dark:tw-bg-primary-800 tw-bg-primary-800' : 'dark:tw-bg-gray-200 tw-bg-gray-200'"
          class="  tw-mt-4 tw-min-h-screen tw-p-2"
        >
          <div
            v-if="$route.name === 'account-deposit' || $route.name === 'account-withdraw'"
            class="tw-border-b-2 tw-text-lg tw-font-extrabold tw-leading-tight"
          >
            <span>Account Number: </span>
            <span class="tw-text-amber-500">12097267625</span>
          </div>
          <div>
            <slot />
          </div>
        </div>
      </div>
    </q-page-container>
    <q-footer reveal bordered class="text-white tw-bg-primary-800">
      <div class="tw-flex tw-justify-end tw-p-4">
        <div class=" tw-rounded-full tw-bg-green-500 tw-p-2">
          <q-icon name="maps_ugc" size="xl" />
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>
