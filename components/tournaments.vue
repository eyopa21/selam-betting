<script setup lang="ts">
import type { CountriesResult, Root } from '~/types/countries'
import type { Tournaments } from '~/types/tournaments'

const props = defineProps<{
  sportId: string;
}>();

const countries = ref<CountriesResult[]>([])
const page = ref(1);
const isLoading = ref(false);
const hasMore = ref(true);

const nodes = computed(() => {
  return countries.value?.map(count => {
    return {
      id: count.id,
      label: count.name,
      lazy: true
    }
  })
})


const lazy = ref(nodes)


const getTournamentForSport = async (countryId: number) => {


  const { data, error } = await useLazyFetch <{data: Tournaments}>(
    `/api/tournaments/${props.sportId}/?countryId=${countryId}`
  )
  console.log("tourn", data.value);
  if (error.value) {
    console.log("Error fetching tournaments:", error.value);
    throw new Error(error.value.message);
  }

  if (data.value?.data?.results?.length) {
    return data.value?.data?.results 
  } 

};

const getCountries = async () => {
  if (isLoading.value || !hasMore.value) return; // Prevent multiple concurrent fetches or fetching when no more data

  isLoading.value = true;
  const { data, error } = await useFetch <{ data: Root }>(
    `/api/tournaments/countries/?page=${page.value}`, {
      cache: 'force-cache'
    }
  )

  if (error.value) {
    console.error("cannot fetch countries", error.value);
    isLoading.value = false;
    return;
  } else {
    console.log("count", data.value?.data);
    if (data.value?.data?.results?.length) {
      
      countries.value.push(...data?.value?.data?.results)
      hasMore.value = !!data.value.data.next
    } else {
      hasMore.value = false
    }
    isLoading.value = false;
  }
}
getCountries()

const loadMore = async (index: number, done: () => void) => {
  console.log("index", index);
  setTimeout(async () => {

    page.value++;
    await getCountries();
    done();
  }, 5000)
};



const isCountriesEmpty = computed(() => {
  if (isLoading.value) return false
  else if (!countries.value.length) return true

  return false
})


interface LazyLoadParams {
  node: any;
  done: (children?: readonly any[]) => void;
  fail: () => void;
  key: string;
}


async function onLazyLoad({ node, done, fail }: LazyLoadParams ){

  console.log('node', node);
  try {
  
   const tournaments =  await getTournamentForSport(node.id)

    if (!tournaments) {
      // fail()
      done([{
        label: 'No tournaments found',
        expandable: false,
        disabled: true,
      }])
    }
    else if (tournaments.length) {
      done(tournaments?.map((tour:any) => {
        return {
          label: tour.name,
          handler: () => {
            navigateTo(`/sports/${tour.id}`)
          }

        }
      }))
   }
  } catch (err) {
    fail()
}

}
</script>


<template>
  <div class="">
    <div v-if="isLoading && !countries?.length">
      <VUESkeleton />
    </div>
    <div v-else>
      <div v-if="isCountriesEmpty">
        Can not fetch countries
      </div>
      <q-infinite-scroll v-else @load="loadMore" :offset="500" class="tw-max-h-64  tw-h-32">

        <div>
          <NavPopularCountries />
        </div>
        <q-tree default-expand-all :nodes="lazy" dense no-connectors text-color="white" color="white" node-key="label"
          @lazy-load="onLazyLoad" class="tw-mx-4">
          <template v-slot:default-header="prop">
            <div class="row items-center  tw-p-1">
              <div class="text-weight-bold tw-cursor-pointer ">{{ prop.node.label }}</div>
            </div>
          </template>

        </q-tree>

        <template v-slot:loading>
          <div v-if="hasMore" class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>

      </q-infinite-scroll>

    </div>
  </div>
</template>
