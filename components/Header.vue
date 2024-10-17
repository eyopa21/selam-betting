<script setup lang="ts">
const { $authentication } = useNuxtApp()

const layout = useLayout()
const userStore = useUserStore()
const general = useGeneralClientInfo()

const { logout } = useAuth()

const menuOptions = ref([
  {
    name: 'Sport',
    link: '#',
    show: true,
  },
  {
    name: 'Live',
    link: '#',
    show: true,
  },
  {
    name: 'Jackpot',
    link: '#',
    show: true,
  },
  {
    name: 'Virtual Sport',
    link: '#',
    show: true,
  },
  {
    name: 'Casino',
    link: '/casino',
    show: general.generalClientInfo?.is_casino_game,
  },
  {
    name: 'Promotions',
    link: '#',
    show: true,
  },
  {
    name: ' Deposit',
    link: '/account/deposit',
    show: true,
  },
  {
    name: 'Rules',
    link: '#',
    show: true,
  },
])
</script>

<template>
  <div class="items-center tw-m-4 tw-flex tw-justify-between tw-rounded-2xl tw-bg-primary-800 tw-py-1">
    <q-toolbar>
      <q-btn flat round dense icon="menu" @click="layout.showLeftDrawer = !layout.showLeftDrawer" />
      <q-toolbar-title>
        <NavLogo />
      </q-toolbar-title>
    </q-toolbar>

    <div class="tw-hidden tw-items-start tw-justify-center lg:tw-flex">
      <ul v-for="option in menuOptions" :key="option.name" :class="option.show ? 'tw-block' : 'tw-hidden'">
        <a
          :href="option.link"
          class="tw-mx-2 tw-whitespace-nowrap tw-font-semibold tw-underline-offset-4 hover:tw-text-primary-300 hover:tw-underline"
        >
          {{ option.name }}
        </a>
      </ul>
    </div>
    <div class="tw-my-auto tw-mr-4 tw-hidden tw-items-center tw-gap-2 lg:tw-flex lg:tw-justify-between">
      <q-btn
        v-if="!$authentication.loggedIn.value" label="LOGIN" no-wrap icon="login"
        class="tw-bg-gray-500 tw-font-bold" unelevated @click="layout.showLogin = true"
      />
      <q-btn
        v-if="!$authentication.loggedIn.value" no-wrap icon="app_registration" label="REGISTER" unelevated
        class="bg-positive tw-font-bold" @click="layout.showRegister = true"
      />
      <div
        v-if="$authentication.loggedIn.value"
        class="tw-my-auto tw-mr-4 tw-hidden tw-items-center tw-gap-2 lg:tw-flex lg:tw-justify-between"
      >
        <q-btn v-if="userStore.user?.stake_balance.stake_balance" color="amber-8" class="tw-w-full" :label="`${userStore.user?.stake_balance.stake_balance} ETB`" dense no-wrap />
        <q-btn label="Deposit" color="secondary" dense />
        <q-btn dense round flat icon="redeem" size="md" class="tw-text-xl">
          <q-badge color="blue" floating transparent>
            2
          </q-badge>
        </q-btn>
        <q-btn dense round flat icon="email" size="md" class="tw-text-xl">
          <q-badge color="blue" floating transparent>
            2
          </q-badge>
        </q-btn>
        <q-btn dense round flat icon="person" size="md" class="tw-text-xl" @click="layout.showSideBarProfileMenu = true; layout.showLeftDrawer = true">
          <q-badge color="red" floating transparent rounded />
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
        <q-menu fit class="tw-w-screen tw-bg-primary-600">
          <q-list v-for="option in menuOptions" :key="option.name">
            <q-item clickable class="text-white font-bold">
              <q-item-section>{{ option.name }} </q-item-section>
            </q-item>
          </q-list>
          <div class="tw-m-2 tw-flex tw-justify-start tw-text-white">
            <q-btn
              v-if="!$authentication.loggedIn.value" icon="login" label="LOGIN"
              class="tw-mr-4 tw-text-nowrap tw-bg-gray-500 tw-font-bold" unelevated @click="layout.showLogin = true"
            />
            <q-btn
              v-if="!$authentication.loggedIn.value" icon="person" label="REGISTER" unelevated
              class="tw-bg-primary-500 tw-font-bold" @click="layout.showRegister = true"
            />
            <q-btn
              v-if="$authentication.loggedIn.value" icon="logout" label="LOG OUT" unelevated
              class="tw-bg-primary-500 tw-font-bold" @click="logout()"
            />
          </div>
        </q-menu>
      </q-btn>
    </div>
    <AuthSignIn />
    <AuthSignUp />
  </div>
</template>
