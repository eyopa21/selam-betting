<template>
    <div @click="pay()" class="tw-cursor-pointer hover:tw-scale-105 tw-transition-all tw-duration-500">
        <q-img v-if="imageData" fit="scale-down" :src="imageData" :alt="props.name" class="tw-w-32 tw-h-20" />
        <div class="tw-w-full tw-capitalize tw-text-white tw-text-center tw-bg-primary-500">
            {{ getName }}
        </div>
    </div>
</template>

<script setup lang="ts">
import type { InputBody } from '~/server/api/finance/pay.post';

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
            cache: 'force-cache',
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


async function pay() {
    try {
        const response = await $fetch('/api/finance/pay', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${$authentication.accessToken.value}`,
            },
            cache: 'force-cache',
            body: {
                amount: 1,
                is_direct_payment: false,
                paymentMethods: props.name
            } as InputBody
        });
        if (response.error === false && response.data.paymentUrl) {
            console.log("response", response);
            window.open(response.data.paymentUrl)
        } else {
            console.error('Failed to fetch the image:');
        }
    } catch (err) {
        console.log("pay err", err);
    }
   
}


</script>
