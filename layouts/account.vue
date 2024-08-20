<script setup>
const layout = useLayout();
const showLeftDrawer = ref(true)
</script>
<template>


    <q-layout view="hHh lpR lff" class="dark:tw-bg-primary-800">

        <q-header elevated class="tw-bg-secondary-800 dark:tw-bg-gray-800">
            <Header />
        </q-header>

        <q-drawer v-model="layout.showLeftDrawer" side="left">
            <q-scroll-area class="fit">
                <HomeFilter />
            </q-scroll-area>
        </q-drawer>

        <q-page-container>
            <div class="tw-m-2 ">
                <q-banner v-if="$route.name === 'account-deposit'" inline-actions class="text-white tw-bg-primary-700 ">
                    <div class="text-accent tw-font-bold">
                        <q-icon name="monetization_on" color="amber-10" size="sm" />
                        To discover the world of gaming and winning, top up your account using any payment method from
                        Worldwide!
                    </div>
                    <template v-slot:action>
                        <q-btn flat color="white" icon="close" />
                    </template>
                </q-banner>
                <div :class="$route.name === 'account-bonus' ? 'dark:tw-bg-primary-800 tw-bg-primary-800' : 'dark:tw-bg-gray-200 tw-bg-gray-200'"
                    class="  tw-min-h-screen tw-mt-4 tw-p-2">
                    <div v-if="$route.name === 'account-deposit' || $route.name === 'account-withdraw'"
                        class="tw-font-extrabold tw-text-lg tw-leading-tight tw-border-b-2">
                        <span>Account Number: </span>
                        <span class="tw-text-amber-500">12097267625</span>
                    </div>
                    <slot />
                </div>
            </div>
        </q-page-container>

        <q-footer bordered class="tw-bg-primary-800 text-white">
            
                    <div class="tw-flex tw-justify-end tw-p-4">
                        <div class=" tw-bg-green-500 tw-rounded-full tw-p-2">
                            <q-icon name="maps_ugc" size="xl"/>
                        </div>
                    </div>
               
        </q-footer>

    </q-layout>



</template>


