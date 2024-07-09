<template>
  <!-- mobile footer -->
  <div class="lg:tw-hidden">
    <q-list v-for="item in footerItems" bordered class="rounded-borders">
      <q-expansion-item
        expand-separator
        :label="item.title"
        class="tw-font-semibold"
      >
        <ul v-for="listItem in item.items">
          <li class="tw-font-semibold tw-my-2 tw-mx-6">
            <a :href="listItem.link">{{ listItem.item }}</a>
          </li>
        </ul>
      </q-expansion-item>
    </q-list>
  </div>
  <!-- Desktop Footer -->
  <div
    class="tw-hidden lg:tw-flex tw-justify-around tw-py-12 tw-bg-green-800"
  >
    <div v-for="item in footerItems">
      <p
        class="tw-text-white tw-font-semibold tw-text-lg tw-border-b-4 tw-border-green-700 tw-max-w-min tw-whitespace-nowrap"
      >
        {{ item.title }}
      </p>
      <ul v-for="listItem in item.items">
        <li class="tw-font-semibold tw-my-2">
          <a :href="listItem.link">{{ listItem.item }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { footerItems } from "../composables/dummyData";
</script>
