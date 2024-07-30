
<script setup lang="ts">
const layout = useLayout();
const {$authentication} = useNuxtApp()

</script>

<template>
    <div class="tw-text-white">
        <div class="tw-flex tw-mt-16 tw-gap-32 tw-flex-col  tw-items-center tw-justify-between ">
            <div class="tw-block tw-rotate-90">
                <q-btn v-if="!$authentication.loggedIn.value" no-wrap icon="app_registration" label="REGISTER" unelevated
                    class="tw-font-bold bg-positive" @click="layout.showRegister = true" />
            </div>
            <div class="tw-block tw-rotate-90 ">
                <q-btn v-if="!$authentication.loggedIn.value" no-wrap icon="book_online" label="My Bets" unelevated
                    class="tw-font-bold" @click="layout.showRegister = true" />
            </div>
            
        </div>
        
    </div>
</template>