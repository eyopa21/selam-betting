<template>
  <div class="tw-py-2 tw-flex tw-justify-between custom-container items-center">
    <div class="tw-ml-4">
      <NuxtImg sizes="250px" src="/images/logo.png" />
    </div>
    <div class="lg:tw-flex tw-items-end tw-hidden">
      <ul v-for="option in menuOptions">
        <li class="tw-font-semibold tw-mx-4 tw-whitespace-nowrap">
          {{ option.name }}
        </li>
      </ul>
    </div>
    <div class="tw-my-auto lg:tw-flex tw-gap-2 tw-hidden tw-mr-4">
      <q-btn
        icon="login"
        label="LOGIN"
        class="tw-font-bold tw-bg-gray-500"
        unelevated
      />
      <q-btn
        icon="person"
        label="REGISTER"
        unelevated
        class="tw-font-bold tw-bg-primary-500"
      />
      <div></div>
    </div>
    <!-- mobile menu -->
    <div class="lg:tw-hidden">
      <q-btn unelevated icon="menu">
        <q-menu fit class="tw-bg-primary-600 tw-w-[100vw]">
          <q-list v-for="option in menuOptions">
            <q-item clickable class="text-white font-bold">
              <q-item-section>{{ option.name }}</q-item-section>
            </q-item>
          </q-list>
          <div class="tw-flex tw-justify-start tw-my-2 tw-text-white tw-mx-2">
            <q-btn
              icon="login"
              label="LOGIN"
              class="tw-font-bold tw-bg-gray-500 tw-mr-4"
              unelevated
            />
            <q-btn
              icon="person"
              label="REGISTER"
              unelevated
              class="tw-font-bold tw-bg-primary-500"
            />
          </div>
        </q-menu>
      </q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { menuOptions } from "../composables/dummyData";
</script>
