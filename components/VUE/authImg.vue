<template>
    <q-img v-if="imageData" fit="scale-down" :src="imageData" :alt="props.name" class="tw-w-32 tw-h-20" />
    <div class="tw-w-full tw-capitalize tw-text-white tw-text-center tw-bg-primary-500">
        {{ getName }}
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    url: string
    name: string
}>()


const getName = computed(() => {
    if (props.name === 'COMMERCIAL BANK OF ETHIOPIA') {
        return 'CBE'
    } else {
        return props.name
    }
})

const { $authentication } = useNuxtApp();
const imageData = ref<string | null>(null);

onMounted(async () => {
    try {
        const response = await $fetch<Blob>(`http://162.55.223.95:8000${props.url}`, {
            headers: {
                Authorization: `Bearer ${$authentication.accessToken.value}`,
            },
            cache: 'force-cache'
        });
        if (response) {
            imageData.value = URL.createObjectURL(response);
            console.log("image", imageData);
        } else {
            console.error('Failed to fetch the image:');
        }
    } catch (err) {
        console.error('Failed to fetch the image:', err);
}
    
});
</script>
