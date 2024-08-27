<template>
    <div class="tw-flex tw-justify-between items-center tw-py-1">
        <q-toolbar>
            <q-btn @click="layout.showLeftDrawer = !layout.showLeftDrawer" flat round dense icon="menu" />
            <q-toolbar-title>
                <NavLogo />
            </q-toolbar-title>
        </q-toolbar>

        <div class="lg:tw-flex tw-justify-center tw-items-start tw-hidden">
            <ul v-for="option in menuOptions" :key="option.name" class="tw-gap-2">
                <q-btn outline dense :href="option.link" text-color="cyan-8" class="tw-px-2 tw-mr-2">
                    {{ option.name }}
                </q-btn>
            </ul>
        </div>

        <div class="tw-my-auto lg:tw-flex lg:tw-justify-between tw-gap-2 tw-hidden tw-mr-4 tw-items-center">



            <q-btn color="amber-4" outline class="tw-w-full" icon="currency_pound"  no-wrap label="2,000ETB" dense />
            <q-btn icons="add" label="Deposit" color="primary" dense no-wrap outline text-color="cyan-8" class="tw-px-4" />
           
           
            <q-btn round flat icon="logout" dense class="tw-text-xl tw-text-red-600" @click="logout()" /> 




        </div>
        <!-- mobile menu -->
        <div class="lg:tw-hidden">
            <q-btn unelevated icon="menu">
                <q-menu fit class="tw-bg-primary-600 tw-w-[100vw]">
                    <q-list v-for="option in menuOptions" :key="option.name">
                        <q-item clickable class="text-white font-bold">
                            <q-item-section>{{ option.name }} </q-item-section>
                        </q-item>
                    </q-list>
                    <div class="tw-flex tw-justify-start tw-my-2 tw-text-white tw-mx-2">

                        <q-btn  icon="logout" label="LOG OUT" unelevated
                            class="tw-font-bold tw-bg-primary-500" @click="logout()" />
                    </div>
                </q-menu>
            </q-btn>
        </div>
        <AuthSignIn />
        <AuthSignUp />
    </div>
</template>

<script setup lang="ts">
const { $authentication } = useNuxtApp();


const layout = useLayout();
const userStore = useUserStore();


const { logout } = useAuth();

const menuOptions = ref([
    {
        name: "Home",
        link: "#",
        icon: ''
    },
    {
        name: "Profile",
        link: "#",
        icon: ''
    },
    {
        name: "Promotions",
        link: "#",
        ico: ''
    },
    {
        name: "Withdraw",
        link: "#",
        ico: ''
    },
    
])

</script>
