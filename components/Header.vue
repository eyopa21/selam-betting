<template>
  <div class="tw-flex tw-justify-between items-center tw-py-1">
    <q-toolbar>
      <q-btn @click="layout.showDrawer = !layout.showDrawer" flat round dense icon="menu" />
      <q-toolbar-title>
        <div>
          <img @click="navigateTo('/')" class="tw-w-44" src="/images/logo.png" />
        </div>
      </q-toolbar-title>
    </q-toolbar>

    <div class="lg:tw-flex tw-justify-center tw-items-start tw-hidden">
      <ul v-for="option in menuOptions" :key="option.name">
        <li class="tw-font-semibold tw-mx-4 tw-whitespace-nowrap">
          {{ option.name }}
        </li>
      </ul>
    </div>
    <div class="tw-my-auto lg:tw-flex lg:tw-justify-between tw-gap-2 tw-hidden tw-mr-4 tw-items-center">
      <q-btn v-if="!userStore.user && !userStore.loadingUser" label="LOGIN" no-wrap icon="login"
        class="tw-font-bold tw-bg-gray-500" unelevated @click="layout.showLogin = true" />
      <q-btn v-if="!userStore.user && !userStore.loadingUser" no-wrap icon="app_registration" label="REGISTER"
        unelevated class="tw-font-bold bg-positive" @click="layout.showRegister = true" />
      <div v-if="userStore.user && !userStore.loadingUser" class="tw-flex tw-text-center tw-gap-2">
        <p
          class="tw-text-[#FADF99] tw-font-bold tw-text-lg tw-flex tw-items-center tw-border tw-rounded tw-border-gray-600 tw-p-1 tw-mr-2">
          <span><img src="/images/$.png" alt="" class="tw-w-4 tw-aspect-auto" /></span>
          1,000 ETB
        </p>
        <p
          class="tw-text-white tw-font-bold tw-text-lg tw-flex tw-items-center tw-border tw-rounded tw-border-gray-600 tw-p-1">
          + Deposit
        </p>
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
        <q-btn icon="phone" dense round flat class="tw-text-lg" @click="logout()" />
        <div class="tw-border-x tw-border-gray-400 tw-p-1">
          <q-btn icon="public" dense round flat class="tw-text-lg" />
        </div>
        <q-btn icon="translate" dense round flat class="tw-text-lg" />
      </div>
      <q-spinner v-if="userStore.loadingUser" color="primary" size="2em" />
      <div></div>
    </div>
    <!-- mobile menu -->
    <div class="lg:tw-hidden">
      <q-btn unelevated icon="menu">
        <q-menu fit class="tw-bg-primary-600 tw-w-[100vw]">
          <q-list v-for="option in menuOptions">
            <q-item clickable class="text-white font-bold">
              <q-item-section>{{ option.name }} </q-item-section>
            </q-item>
          </q-list>
          <div class="tw-flex tw-justify-start tw-my-2 tw-text-white tw-mx-2">
            <q-btn v-if="!userStore.user && !userStore.loadingUser" icon="login" label="LOGIN"
              class="tw-font-bold tw-bg-gray-500 tw-mr-4 tw-text-nowrap" unelevated @click="layout.showLogin = true" />
            <q-btn v-if="!userStore.user && !userStore.loadingUser" icon="person" label="REGISTER" unelevated
              class="tw-font-bold tw-bg-primary-500" @click="layout.showRegister = true" />
            <q-btn v-if="userStore.user && !userStore.loadingUser" icon="logout" label="LOG OUT" unelevated
              class="tw-font-bold tw-bg-primary-500" @click="logout()" />
          </div>
        </q-menu>
      </q-btn>
    </div>
    <Signin  />
    <Signup />
  </div>
</template>

<script setup lang="ts">

import { menuOptions } from "../composables/dummyData";
const layout = useLayout();
const userStore = useUserStore();


const { logout } = useAuth();



</script>
