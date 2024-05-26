<template>
  <div
    class="tw-bg-secondary-800 tw-rounded tw-p-3 tw-text-text-primary tw-w-full"
  >
    <p class="tw-font-semibold tw-m-0 tw-p-0">Filter</p>
    <q-list v-for="filter in filters">
      <q-expansion-item expand-separator :label="filter.filterGroup" dense>
        <q-list v-for="value in filter.values" class="tw-ml-4">
          <div class="tw-flex tw-my-2">
            <q-avatar size="xs" class="tw-mr-2">
              <NuxtImg :src="value.image" />
            </q-avatar>
            <p>{{ value.name }}</p>
          </div>
        </q-list>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { filters } from "../composables/dummyData";
</script>
