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
      <VUESkeleton />
    </div>
    <div v-else>
      <div v-if="isTournamentEmpty">
        No Leagues found
      </div>
      <q-infinite-scroll v-else @load="loadMore" :offset="500" class="tw-max-h-64  tw-h-32">

        <q-list dense bordered padding class="rounded-borders ">
          <q-item v-for="(item, index) in items" :key="index" clickable v-ripple
            @click="$router.push(`/sports/${item.id}`)">
            <q-item-section>
              {{ item.name }}
            </q-item-section>
          </q-item>


        </q-list>

        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>

      </q-infinite-scroll>

    </div>
  </div>
</template>
