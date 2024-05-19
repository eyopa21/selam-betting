<template>
  <div class="tw-w-full tw-bg-secondary-900 tw-rounded">
    <div>
      <q-tabs
        v-model="tabValue"
        inline-label
        outside-arrows
        mobile-arrows
        class="bg-primary text-white shadow-2"
      >
        <q-tab name="all-market" label="All Market">
          <p class="tw-text-white">(112)</p>
        </q-tab>
        <div
          v-for="market in marketNames"
          class="tw-flex tw-justify-around tw-items-center"
        >
          <q-tab :name="market.name" :label="market.name">
            <p class="tw-text-white">({{ market.length }})</p>
          </q-tab>
        </div>
      </q-tabs>
      <q-list class="tw-p-4">
        <q-expansion-item
          v-for="market in filteredMarkets"
          dense
          dense-toggle
          expand-separator
          :label="market.marketName"
          class="tw-bg-secondary-800 tw-text-white tw-mb-2"
          :aria-expanded="true"
          header-class="tw-bg-secondary-700"
        >
          <div class="tw-grid tw-grid-cols-3">
            <Odd
              class="tw-m-2 tw-col-span-1"
              v-for="value in market.values"
              :value="value.value"
              :odd="value.odd"
            />
          </div>
        </q-expansion-item>
      </q-list>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Market {
  marketName: string;
  values: [value: string, odd: string];
}
const props = defineProps<{
  markets: Market[];
}>();

const tabValue = ref("all-market");

const marketNames = computed(() =>
  props.markets.map((m) => ({ name: m.marketName, length: m.values.length }))
);

const filteredMarkets: Ref<Market[]> = ref([]);

watch(tabValue, () => {
  filterMarkets();
});

function filterMarkets() {
  if (tabValue.value == "all-market") {
    filteredMarkets.value = props.markets;
  } else {
    filteredMarkets.value = props.markets.filter(
      (market) => market.marketName == tabValue.value
    );
  }
}

filterMarkets();
</script>
