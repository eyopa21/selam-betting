<script setup lang="ts">
const layout = useLayout()
const userStore = useUserStore()

const { logout } = useAuth()

const menuOptions = ref([
  {
    name: 'Home',
    link: '/',
    icon: null,
    active: false,
  },
  {
    name: 'Profile',
    link: '/account/profile',
    icon: null,
    active: false,
  },
  // {
  //   name: 'Promotions',
  //   link: '/account/vip-cashback',
  //   icon: null,
  //   active: false,
  // },
  {
    name: 'Withdraw',
    link: '/account/withdraw',
    icon: null,
    active: false,
  },

])
</script>

<template>
  <div class="items-center tw-m-4 tw-flex tw-justify-between tw-rounded-2xl tw-bg-primary-800 tw-py-1">
    <q-toolbar>
      <!-- <q-btn flat round dense icon="menu" @click="layout.showLeftDrawer = !layout.showLeftDrawer" /> -->
      <q-toolbar-title>
        <NavLogo />
      </q-toolbar-title>
    </q-toolbar>

    <div class="tw-hidden tw-items-start tw-justify-center lg:tw-flex">
      <ul v-for="option in menuOptions" :key="option.name" class="tw-gap-2">
        <q-btn flat dense :icon="option.icon ?? undefined" no-wrap :to="option.link" :text-color="option.active ? 'white' : 'grey-3' " class="tw-mr-2 tw-rounded tw-px-3">
          {{ option.name }}
        </q-btn>
      </ul>
    </div>

    <div class="tw-my-auto tw-mr-4 tw-hidden tw-items-center tw-gap-2 lg:tw-flex lg:tw-justify-between">
      <q-btn color="amber-10" class="tw-w-full  tw-px-4 !tw-text-white" icon="currency_pound" no-wrap :label="`${userStore.user?.stake_balance.stake_balance}ETB`" dense />
      <q-btn
        flat
        to="/account/deposit"
        icons="add" label="Deposit" color="primary" dense no-wrap text-color="grey-3"
        class="tw-px-4"
      />

      <q-btn round flat icon="logout" dense class="tw-text-xl tw-text-red-600" @click="logout()" />
    </div>
    <!-- mobile menu -->
    <div class="lg:tw-hidden">
      <q-btn unelevated icon="menu">
        <q-menu fit class="tw-w-screen tw-bg-primary-800">
          <q-list v-for="option in menuOptions" :key="option.name">
            <q-item clickable class="text-white font-bold">
              <q-btn flat :to="option.link">
                {{ option.name }}
              </q-btn>
            </q-item>
          </q-list>
          <div class="tw-m-2 tw-flex tw-justify-start tw-text-white">
            <q-btn
              icon="logout" label="LOG OUT" unelevated class="tw-bg-primary-500 tw-font-bold"
              @click="logout()"
            />
          </div>
        </q-menu>
      </q-btn>
    </div>
    <AuthSignIn />
    <AuthSignUp />
  </div>
</template>
