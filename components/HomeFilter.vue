<template>
  <div class="tw-bg-secondary-800 tw-rounded tw-p-3 text-white tw-w-full">
    <p class="tw-font-semibold tw-m-0 tw-p-0">Filter</p>
    <q-scroll-area style="height: 80vh; max-width: 300px">
      <q-list v-for="filter in filters">
        <q-expansion-item
          expand-separator
          :label="filter.filterGroup"
          dense
          class="text-white"
        >
          <q-list v-for="value in filter.values" class="tw-ml-4">
            <div class="tw-flex tw-my-2">
              <q-avatar size="xs" class="tw-mr-2">
                <NuxtImg :src="value.image" />
              </q-avatar>
              <p class="text-white">{{ value.name }}</p>
            </div>
          </q-list>
        </q-expansion-item>
      </q-list>
    </q-scroll-area>
  </div>
</template>

<script setup lang="ts">
import { filters } from "../composables/dummyData";
</script>
