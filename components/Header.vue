<template>
  <div class="tw-flex tw-justify-between custom-container items-center tw-py-1">
    <div class="tw-ml-4">
      <img class="tw-w-64" src="/images/logo.png" />
    </div>
    <div class="lg:tw-flex tw-items-end tw-hidden">
      <ul v-for="option in menuOptions">
        <li class="tw-font-semibold tw-mx-4 tw-whitespace-nowrap">
          {{ option.name }}
        </li>
      </ul>
    </div>
    <div class="tw-my-auto lg:tw-flex tw-gap-2 tw-hidden tw-mr-4">
      <q-btn
        v-if="!userStore.user && !userStore.loadingUser"
        icon="login"
        label="LOGIN"
        class="tw-font-bold tw-bg-gray-500"
        unelevated
        @click="signInModal = true"
      />
      <q-btn
        v-if="!userStore.user && !userStore.loadingUser"
        icon="person"
        label="REGISTER"
        unelevated
        class="tw-font-bold tw-bg-primary-500"
        @click="signUpModal = true"
      />
      <q-btn
        v-if="userStore.user && !userStore.loadingUser"
        icon="person"
        label="LOG OUT"
        unelevated
        class="tw-font-bold tw-bg-primary-500"
        @click="logout()"
      />
      <q-spinner v-if="userStore.loadingUser" color="primary" size="2em" />
      <div></div>
    </div>
    <!-- mobile menu -->
    <div class="lg:tw-hidden">
      <q-btn unelevated icon="menu">
        <q-menu fit class="tw-bg-primary-600 tw-w-[100vw]">
          <q-list v-for="option in menuOptions">
            <q-item clickable class="text-white font-bold">
              <q-item-section>{{ option.name }}</q-item-section>
            </q-item>
          </q-list>
          <div class="tw-flex tw-justify-start tw-my-2 tw-text-white tw-mx-2">
            <q-btn
              v-if="!userStore.user && !userStore.loadingUser"
              icon="login"
              label="LOGIN"
              class="tw-font-bold tw-bg-gray-500 tw-mr-4"
              unelevated
              @click="signInModal = true"
            />
            <q-btn
              v-if="!userStore.user && !userStore.loadingUser"
              icon="person"
              label="REGISTER"
              unelevated
              class="tw-font-bold tw-bg-primary-500"
              @click="signUpModal = true"
            />
            <q-btn
              v-if="userStore.user && !userStore.loadingUser"
              icon="logout"
              label="LOG OUT"
              unelevated
              class="tw-font-bold tw-bg-primary-500"
              @click="logout()"
            />
          </div>
        </q-menu>
      </q-btn>
    </div>
    <Signin
      :is-visible="signInModal"
      @modalClosed="signInModal = false"
      @register="
        signInModal = false;
        signUpModal = true;
      "
    />
    <Signup
      :is-visible="signUpModal"
      @modalClosed="signUpModal = false"
      @login="
        signUpModal = false;
        signInModal = true;
      "
    />
  </div>
</template>

<script setup lang="ts">
import { menuOptions } from "../composables/dummyData";

const userStore = useUserStore();

const { logout } = useAuth();

const signInModal = ref(false);
const signUpModal = ref(false);
</script>
