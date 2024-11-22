<script setup lang="ts">
import type { AllGamesRoot } from '~/types/casino/all-games'

const props = withDefaults(defineProps<{
  filterType: 'square' | 'circle'
  games: AllGamesRoot['results'][number]['games']
}>(), {
  filterType: 'square',
})
const { $authentication } = useNuxtApp()
const layout = useLayout()
const isMobile = useMediaQuery('(max-width: 768px)')
const filterType = ref<'square' | 'circle'>('square')

function handleClick(game: AllGamesRoot['results'][number]['games'][number], isPractice: boolean) {
  if (!$authentication.loggedIn.value) {
    layout.value.showLogin = true
  } else {
    if (!!isMobile.value && !game.mobile) {
      useErrorNotifications(ref('This game can not be played in mobile devices'))
    } else if (!isMobile.value && !game.desktop) {
      useErrorNotifications(ref('This game can not be played without mobile devices'))
    } else {
      if (isPractice) {
        navigateTo(`/casino/play/${game.id}?practice=true`)
      } else {
        navigateTo(`/casino/play/${game.id}`)
      }
    }
  }
}
</script>

<template>
  <div
    class="tw-grid  tw-gap-4 tw-gap-y-8"
    :class="filterType === 'square' ? 'tw-grid-cols-1 sm:grid-cols-2 lg:tw-grid-cols-4' : 'tw-grid-cols-2 sm:tw-grid-cols-3 md:tw-grid-cols-4 lg:tw-grid-cols-5  tw-place-items-center '"
  >
    <div
      v-for="(ii) in props.games" :key="ii.game_id"
      class="tw-relative tw-transition-all  tw-duration-500 hover:-tw-translate-y-2"
    >
      <div v-if="props.filterType === 'square'" class="tw-group">
        <!-- <q-img
          :src="ii.logo_url"
          :alt="ii.label"
          fit="cover"
          class="tw-h-64  tw-rounded-xl tw-ring tw-ring-violet-500  tw-ring-opacity-60"
          placeholder-src="/casino/logo.svg"
        />
        <div class="tw-mt-5 tw-flex tw-w-full tw-justify-between tw-space-x-4">
          <q-btn
            color="deep-purple-14" label="Play" class="tw-w-full tw-rounded-xl tw-ring-2 tw-ring-white"
            @click="handleClick(ii, false)"
          />
          <q-btn
            color="black" label="Practice" class=" tw-w-full tw-rounded-xl tw-ring-2 tw-ring-white "
            @click="handleClick(ii, true)"
          />
        </div> -->
        <q-img
          :src="ii.logo_url" :alt="ii.label" fit="cover" class="image-container  tw-h-64  tw-rounded-xl "
          placeholder-src="/casino/logo.svg"
        >
          <div class="caption absolute-full text-subtitle2 flex flex-center">
            <div class="tw-mt-3  tw-flex tw-justify-around tw-space-x-4 ">
              <q-btn
                size="sm" color="deep-purple-14" label="Play"
                class="tw-h-6 tw-w-full tw-rounded-xl tw-ring-1 tw-ring-white" @click="handleClick(ii, false)"
              />
              <q-btn
                size="sm" color="black" label="Practice"
                class=" tw-h-6 tw-w-full tw-rounded-xl tw-ring-1 tw-ring-white" @click="handleClick(ii, true)"
              />
            </div>
          </div>
        </q-img>
      </div>
      <div v-else class="tw-p-2 tw-shadow-md tw-shadow-primary-500">
        <q-avatar
          font-size="52px" color="primary" text-color="white"
          class="tw-size-[200px] tw-cursor-pointer tw-ring-1 tw-transition-all tw-duration-500  hover:tw-scale-105 2xl:tw-size-[250px]"
        >
          <q-img :src="ii.logo_url" />
        </q-avatar>
        <div class="tw-mt-3  tw-flex tw-justify-around tw-space-x-4 ">
          <q-btn
            size="sm" color="deep-purple-14" label="Play"
            class="tw-h-6 tw-w-full tw-rounded-xl tw-ring-1 tw-ring-white" @click="handleClick(ii, false)"
          />
          <q-btn
            size="sm" color="black" label="Practice"
            class=" tw-h-6 tw-w-full tw-rounded-xl tw-ring-1 tw-ring-white" @click="handleClick(ii, true)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-container {
  position: relative;
  overflow: hidden;
}

.caption {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  text-align: center;
  padding: 0.5rem;
  transform: translateY(100%);
  transition: transform 0.3s ease-in-out;
}

.image-container:hover .caption {
  transform: translateY(0);
}
</style>
