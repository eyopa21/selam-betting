<template>
  <div class="tw-w-full dark:tw-bg-secondary-900 tw-rounded">

    <div v-if="loading">
      <VUESkeleton/>
    </div>
    <div v-else>
      
      <q-tabs v-model="tabValue" inline-label outside-arrows mobile-arrows
        class="bg-primary text-white shadow-2 tw-opacity-80 dark:tw-opacity-100">
        <q-tab name="all-market" label="All Market" class="tw-font-bold">
          <p class="tw-text-white">({{ count }})</p>
        </q-tab>
        <div v-for="market in visibleMarkets" class="tw-flex tw-justify-around tw-items-center">
          <q-tab :name="market.marketName" :label="market.marketName">
            <p class="tw-text-white">({{ market.values.length }}, {{ props.matchDetail.id }})</p>
          </q-tab>
        </div>
      </q-tabs>
      <q-list class="tw-p-4">
        <q-expansion-item v-for="market in filteredMarkets" dense dense-toggle expand-separator
          :label="market.marketName"
          class="dark:tw-bg-secondary-800 dark:tw-text-white tw-text-gray-700 tw-mb-2 tw-border dark:tw-border-none"
          :aria-expanded="true" header-class="dark:tw-bg-secondary-700 tw-bg-gray-200">
          <div class="tw-grid tw-grid-cols-3">

            <Odd class="tw-m-2 tw-col-span-1" v-for="outcome in market.values" :matchDetail="props.matchDetail"
              :value="outcome.name" :odd="outcome.odd" :eventId="outcome.eventId" :outcomeId="outcome.outcomeId" />
          </div>
        </q-expansion-item>
      </q-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MarketResults, Markets } from '~/types/matches';

interface Market {
  marketName: string;
  values: Outcome[];
}

interface Outcome {
  outcomeId: number
  eventId: number,
  name: string
  odd: number
}



const props = defineProps<{
  matchDetail: {
    id: number,
    teams: string,
    league: string
    date: string
    time: string
  }
 

}>();





const count = ref<string | undefined>(undefined)
const markets = ref<MarketResults[] >([])


 
 const loading = ref(true)

    const {data, error} = await useFetch(`/api/markets/${props.matchDetail.id}/?pageSize=${10}`);
  if(error.value) {
    console.log("eroror", error.value);
    loading.value = false
  } else if(data.value?.data ) {
    count.value = data.value.data.count
    markets.value = data.value.data.results
    setTimeout(() => {
      
      loading.value = false
    }, 5000);
  }
   
  






const visibleMarkets = computed(() => {
  if (markets.value.length) {
    const ret = markets.value?.map((market) => {
      const val: Outcome[] = [];
      market.outcomes.forEach((outcome: any) => {
        val.push({
          outcomeId: outcome.id,
          eventId: market?.id,
          name: outcome.name,
          odd: outcome.betting_offers[0]?.odds
            ? outcome.betting_offers[0].odds.toFixed(2).toString()
            : "1",
        });
      });
      return {
        marketName: market.name,
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
console.log("id", props.matchDetail.id);
filterMarkets();
</script>
