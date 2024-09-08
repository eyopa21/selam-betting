<script setup lang="ts">
const { $authentication } = useNuxtApp()

const layout = useLayout()
const userStore = useUserStore()

const { logout } = useAuth()

const menuOptions = ref([
  {
    name: 'Home',
    link: '#',
    icon: null,
    active: false,
  },
  {
    name: 'Profile',
    link: '#',
    icon: 'person',
    active: true,
  },
  {
    name: 'Promotions',
    link: '#',
    icon: null,
    active: false,
  },
  {
    name: 'Withdraw',
    link: '#',
    icon: null,
    active: false,
  },

])
</script>

<template>
  <div class="items-center tw-flex tw-justify-between tw-py-1">
    <q-toolbar>
      <q-btn flat round dense icon="menu" @click="layout.showLeftDrawer = !layout.showLeftDrawer" />
      <q-toolbar-title>
        <NavLogo />
      </q-toolbar-title>
    </q-toolbar>

    <div class="tw-hidden tw-items-start tw-justify-center lg:tw-flex">
      <ul v-for="option in menuOptions" :key="option.name" class="tw-gap-2">
        <q-btn outline dense :icon="option.icon ?? undefined" no-wrap :href="option.link" :text-color="option.active ? 'white' : 'grey-5' " class="tw-rounded- tw-mr-2 tw-px-3">
          {{ option.name }}
        </q-btn>
      </ul>
    </div>

    <div class="tw-my-auto tw-mr-4 tw-hidden tw-items-center tw-gap-2 lg:tw-flex lg:tw-justify-between">
      <q-btn color="amber-4" outline class="tw-w-full" icon="currency_pound" no-wrap :label="`${userStore.user?.stake_balance.stake_balance}ETB`" dense />
      <q-btn
        icons="add" label="Deposit" color="primary" dense no-wrap outline text-color="grey-5"
        class="tw-px-4"
      />

      <q-btn round flat icon="logout" dense class="tw-text-xl tw-text-red-600" @click="logout()" />
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
