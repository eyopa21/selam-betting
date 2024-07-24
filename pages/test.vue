<template>
    <div class="q-pa-md q-gutter-sm tw-text-white">

        <q-tree :nodes="lazy" no-connectors text-color="white" color="white" default-expand-all node-key="label"
            @lazy-load="onLazyLoad">
            <template v-slot:default-header="prop">
                <div class="row items-center">

                    <div class="text-weight-bold tw-cursor-pointer">{{ prop.node.label }}</div>
                </div>
            </template>

            <template v-slot:default-body="prop">
                <div v-if="prop.node.story">
                    <span class="text-weight-bold">This node has a story</span>: {{ prop.node.story }}
                </div>

            </template>
        </q-tree>

    </div>
</template>

<script setup>
const countries = ref([])
const getTournamentForSport = async () => {



    const { data, error } = await useFetch(
        `/api/tournaments/1`
    )


    if (error.value) {
        console.log("Error fetching tournaments:", error.value);
        return;
    }

    if (data.value?.data?.results?.length) {


        return data.value?.data?.results
    }

};


const getCountries = async () => {
    const { data, error } = await useFetch(
        `/api/tournaments/countries`
    )

    if (error.value) {
        console.error("cannot fetch countries", error.value);
    } else {
        console.log("count", data.value.data.results);
        countries.value = data.value.data.results
    }
}
getCountries()


const nodes = computed(() => {
    return countries.value?.map(count => {
        return {
            label: count.name,
            lazy: true
        }
    })
})


const lazy = ref(nodes)

async function onLazyLoad({ node, key, done, fail }) {
    // call fail() if any error occurs


    // simulate loading and setting an empty node
    if (key.indexOf('Lazy load empty') > -1) {
        done([])
        return
    }
    const test = await getTournamentForSport()
    console.log("tour", test);
    const label = node.label
    done(test?.map(tour => {
        return {
            label: tour.name,
            selectable: true,
            tickable: true,
            handler: () => {
                console.log("wowowowow", tour.id);
            }

        }
    }))

}


</script>
