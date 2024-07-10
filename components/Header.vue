<template>
  <div class="tw-flex tw-justify-between items-center tw-py-1">
    <q-toolbar>
      <q-btn @click="layout.showDrawer = !layout.showDrawer" flat round dense icon="menu" />
      <q-toolbar-title>
        <div>
          <img class="tw-w-44" src="/images/logo.png" />
        </div>
      </q-toolbar-title>
    </q-toolbar>

    <div class="lg:tw-flex tw-items-end tw-hidden">
      <ul v-for="option in menuOptions" :key="option.name">
        <li class="tw-font-semibold tw-mx-4 tw-whitespace-nowrap">
          {{ option.name }}
        </li>
      </ul>
    </div>
    <div class="tw-my-auto lg:tw-flex lg:tw-justify-between tw-gap-2 tw-hidden tw-mr-4 tw-items-center">
      <q-btn v-if="!userStore.user && !userStore.loadingUser" label="LOGIN"
        class="tw-font-bold tw-bg-gray-500" unelevated @click="signInModal = true" />
      <q-btn v-if="!userStore.user && !userStore.loadingUser"  label="REGISTER" unelevated
        class="tw-font-bold bg-positive" @click="signUpModal = true" />
      <div v-if="userStore.user && !userStore.loadingUser" class="tw-flex tw-text-center tw-gap-2">
        <p
          class="tw-text-[#FADF99] tw-font-bold tw-text-lg tw-flex tw-items-center tw-border tw-rounded tw-border-gray-600 tw-p-1 tw-mr-2">
          <span><img src="/images/$.png" alt="" class="tw-w-4 tw-aspect-auto" /></span>
          1,000 ETB
        </p>
        <p
          class="tw-text-white tw-font-bold tw-text-lg tw-flex tw-items-center tw-border tw-rounded tw-border-gray-600 tw-p-1">
          + Deposite
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
          <q-list v-for="option in menuOptions" :key="option.name">
            <q-item clickable class="text-white font-bold">
              <q-item-section>{{ option.name }}</q-item-section>
            </q-item>
          </q-list>
          <div class="tw-flex tw-justify-start tw-my-2 tw-text-white tw-mx-2">
            <q-btn v-if="!userStore.user && !userStore.loadingUser" icon="login" label="LOGIN"
              class="tw-font-bold tw-bg-gray-500 tw-mr-4 tw-text-nowrap" unelevated @click="signInModal = true" />
            <q-btn v-if="!userStore.user && !userStore.loadingUser" icon="person" label="REGISTER" unelevated
              class="tw-font-bold tw-bg-primary-500" @click="signUpModal = true" />
            <q-btn v-if="userStore.user && !userStore.loadingUser" icon="logout" label="LOG OUT" unelevated
              class="tw-font-bold tw-bg-primary-500" @click="logout()" />
          </div>
        </q-menu>
      </q-btn>
    </div>
    <Signin :is-visible="signInModal" @modalClosed="signInModal = false" @register="
      signInModal = false;
    signUpModal = true;
    " />
    <Signup :is-visible="signUpModal" @modalClosed="signUpModal = false" @login="
      signUpModal = false;
    signInModal = true;
    " />
  </div>
</template>

<script setup lang="ts">
import { menuOptions } from "../composables/dummyData";

const userStore = useUserStore();

const layout = useLayout();
const { logout } = useAuth();

const signInModal = ref(false);
const signUpModal = ref(false);
</script>
