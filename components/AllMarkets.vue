<template>
  <div class="tw-w-full dark:tw-bg-secondary-900 tw-rounded">
    <div>
      <q-tabs
        v-model="tabValue"
        inline-label
        outside-arrows
        mobile-arrows
        class="bg-primary text-white shadow-2 tw-opacity-80 dark:tw-opacity-100"
      >
        <q-tab name="all-market" label="All Market" class="tw-font-bold">
          <p class="tw-text-white">({{ marketCount }})</p>
        </q-tab>
        <div
          v-for="market in visibleMarkets"
          class="tw-flex tw-justify-around tw-items-center"
        >
          <q-tab :name="market.marketName" :label="market.marketName">
            <p class="tw-text-white">({{ market.values.length }})</p>
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
          class="dark:tw-bg-secondary-800 dark:tw-text-white tw-text-gray-700 tw-mb-2 tw-border dark:tw-border-none"
          :aria-expanded="true"
          header-class="dark:tw-bg-secondary-700 tw-bg-gray-200"
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
  values: [{ value: string; odd: string }];
}
const props = defineProps<{
  markets: any[];
  marketCount: number;
}>();

const visibleMarkets = computed(() => {
  if (props.markets) {
    const ret = props.markets.map((market) => {
      const val = [];
      market.outcomes.forEach((outcome: any) => {
        val.push({
          value: outcome.name,
          odd: outcome.betting_offers[0]?.odds
            ? outcome.betting_offers[0].odds.toFixed(2).toString()
            : "1",
        });
      });
      return {
        marketName: market.bettingTypeId,
        values: val,
      };
    });
    return ret;
  } else {
    return [];
  }
});

const tabValue = ref("all-market");

const filteredMarkets: Ref<Market[]> = ref([]);

watch(tabValue, () => {
  filterMarkets();
});

function filterMarkets() {
  if (tabValue.value == "all-market") {
    filteredMarkets.value = visibleMarkets.value as Market[];
  } else {
    filteredMarkets.value = (visibleMarkets.value as Market[]).filter(
      (market) => market.marketName == tabValue.value
    );
  }
}

filterMarkets();
</script>
