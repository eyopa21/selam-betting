<script setup lang="ts">

console.log("tournamentssss");
const props = defineProps<{
  sportId: string;
}>();


const items = ref<League[]>([]);
const page = ref(1);
const isLoading = ref(false);
const hasMore = ref(true);

const getTournamentForSport = async () => {
  if (isLoading.value || !hasMore.value) return; // Prevent multiple concurrent fetches or fetching when no more data
  isLoading.value = true;

  const { data, error } = await useFetch(
    `/api/tournaments/${props.sportId}/?page=${page.value}`
  )
console.log("data", data.value);
  if (error.value) {
    console.log("Error fetching tournaments:", error.value);
    isLoading.value = false;
    return;
  }

  if (data.value?.data?.results?.length) {
    items.value.push(...data.value?.data?.results);
    
    hasMore.value = data.value.data.next !== null;
  } else {
    hasMore.value = false;
  }

  isLoading.value = false;
};

const loadMore = async (index: number, done: () => void) => {
    console.log("index", index);
    setTimeout(async () => {

        await getTournamentForSport();
      done();
        page.value++;
    }, 5000)
};

// Initial loada
getTournamentForSport();

const isTournamentEmpty = computed(() => {
  if (isLoading.value) return false
  else if (!items.value.length) return true

  return false
})
</script>


<template>
  <div class=" max-w-full">
    <div v-if="isLoading && !items?.length">
      <VUESkeleton/>
    </div>
    <div v-else class="q-pa-md">
      <div v-if="isTournamentEmpty">
      No Leagues found
      </div>
      <q-infinite-scroll v-else @load="loadMore" :offset="500" class="tw-max-h-64 tw-h-32">
        <div v-for="(item, index) in items" :key="index" class="caption tw-border tw-w-64">
          <p class="tw-hover:underline tw-p-1 tw-truncate">{{ index }} - {{ item.name }}</p>
        </div>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
        
      </q-infinite-scroll>
      
    </div>
  </div>
</template>
