<template>
  <div class="tw-flex tw-justify-between items-center tw-py-1">
    <q-toolbar>
      <q-btn @click="layout.showLeftDrawer = !layout.showLeftDrawer" flat round dense icon="menu" />
      <q-toolbar-title>
<NavLogo/>
      </q-toolbar-title>
    </q-toolbar>

    <div class="lg:tw-flex tw-justify-center tw-items-start tw-hidden">
      <ul v-for="option in menuOptions" :key="option.name">
        <a :href="option.link" class="tw-font-semibold tw-mx-4 tw-whitespace-nowrap">
          {{ option.name }}
        </a>
      </ul>
    </div>
    <div class="tw-my-auto lg:tw-flex lg:tw-justify-between tw-gap-2 tw-hidden tw-mr-4 tw-items-center">
      <q-btn v-if="!$authentication.loggedIn.value" label="LOGIN" no-wrap icon="login"
        class="tw-font-bold tw-bg-gray-500" unelevated @click="layout.showLogin = true" />
      <q-btn v-if="!$authentication.loggedIn.value" no-wrap icon="app_registration" label="REGISTER" unelevated
        class="tw-font-bold bg-positive" @click="layout.showRegister = true" />
      <div v-if="$authentication.loggedIn.value" class="tw-flex tw-text-center tw-gap-2 tw-py-1">

        <q-btn color="amber-8" class="tw-w-full" label="2,000ETB" dense />
        <q-btn  label="Deposit" color="secondary" dense />
        <q-btn dense round flat icon="redeem" class="tw-text-xl">
          <q-badge color="blue" floating transparent> 2 </q-badge>
        </q-btn>
        <q-btn dense round flat icon="email" class="tw-text-xl">
          <q-badge color="blue" floating transparent> 2 </q-badge>
        </q-btn>
        <q-btn dense round flat icon="person" class="tw-text-xl">
          <q-badge color="red" floating transparent rounded></q-badge>
        </q-btn>
        <q-btn round flat icon="logout" dense class="tw-text-xl tw-text-red-600" @click="logout()" />
        <!-- <q-btn icon="phone" dense round flat class="tw-text-lg" @click="logout()" />
        <div class="tw-border-x tw-border-gray-400 tw-p-1">
          <q-btn icon="public" dense round flat class="tw-text-lg" />
        </div>
        <q-btn icon="translate" dense round flat class="tw-text-lg" /> -->
      </div>


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
            <q-btn v-if="!$authentication.loggedIn.value" icon="login" label="LOGIN"
              class="tw-font-bold tw-bg-gray-500 tw-mr-4 tw-text-nowrap" unelevated @click="layout.showLogin = true" />
            <q-btn v-if="!$authentication.loggedIn.value" icon="person" label="REGISTER" unelevated
              class="tw-font-bold tw-bg-primary-500" @click="layout.showRegister = true" />
            <q-btn v-if="$authentication.loggedIn.value" icon="logout" label="LOG OUT" unelevated
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
    name: "Sport",
    link: "#",
  },
  {
    name: "Live",
    link: "#",
  },
  {
    name: "Jackpot",
    link: "#",
  },
  {
    name: "Virtual Sport",
    link: "#",
   },
   {
     name: "Casino",
     link: "/casino",
   },
  {
    name: "Promotions",
    link: "#",
  },
  {
    name: " Deposit",
    link: "#",
  },
  {
    name: "Rules",
    link: "#",
  },
])

</script>
