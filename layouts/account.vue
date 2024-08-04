<template>
    <NuxtLayout name="default">


        <div class="tw-m-2 ">
            <q-banner inline-actions class="text-white tw-bg-primary-700 ">
                <div class="text-accent tw-font-bold">
                    <q-icon name="monetization_on" color="amber-10" size="sm" />
                    To discover the world of gaming and winning, top up your account using any payment method from
                    Worldwide!
                </div>
                <template v-slot:action>
                    <q-btn flat color="white" icon="close" />
                </template>
            </q-banner>
            <div class=" dark:tw-bg-gray-200 tw-bg-gray-200 tw-min-h-screen tw-mt-4 tw-p-2">
                <div class="tw-font-extrabold tw-text-lg tw-leading-tight tw-border-b-2">
                    <span>Account Number: </span>
                    <span class="tw-text-amber-500">12097267625</span>
                </div>
                <slot />
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
       
</script>

