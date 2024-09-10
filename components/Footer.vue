<script setup lang="ts">
import { footerItems } from '../composables/dummyData'
</script>

<template>
  <!-- mobile footer -->
  <div class="lg:tw-hidden">
    <q-list v-for="(item, key) in footerItems" :key bordered class="rounded-borders">
      <q-expansion-item
        expand-separator
        :label="item.title"
        class="tw-font-semibold"
      >
        <ul v-for="(listItem, k) in item.items" :key="k">
          <li class="tw-mx-6 tw-my-2 tw-font-semibold">
            <a :href="listItem.link">{{ listItem.item }}</a>
          </li>
        </ul>
      </q-expansion-item>
    </q-list>
  </div>
  <!-- Desktop Footer -->
  <div
    class="tw-hidden tw-justify-around tw-bg-gray-800 tw-py-12 lg:tw-flex"
  >
    <div v-for="(item, key) in footerItems" :key>
      <p
        class="tw-max-w-min tw-whitespace-nowrap tw-border-b-4 tw-border-green-700 tw-text-lg tw-font-semibold tw-text-white"
      >
        {{ item.title }}
      </p>
      <ul v-for="(listItem, k) in item.items" :key="k">
        <li class="tw-my-2 tw-font-semibold">
          <a :href="listItem.link">{{ listItem.item }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
