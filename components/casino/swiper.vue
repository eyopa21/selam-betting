<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperType } from 'swiper'
import { Pagination } from 'swiper/modules'
import type { AllGamesRoot } from '~/types/casino/all-games'

const props = defineProps<{
  slides: AllGamesRoot['results'][number]['games']
  gameName: string
  groupId: string
}>()

import 'swiper/css'
import 'swiper/css/pagination'

const modules = [Pagination]

let swiperInstance: SwiperType | null = null

function onSwiper(swiper: SwiperType): void {
  swiperInstance = swiper
}

function slidePrev(): void {
  if (swiperInstance) {
    swiperInstance.slidePrev()
  }
}

function slideNext(): void {
  if (swiperInstance) {
    swiperInstance.slideNext()
  }
}

const { $authentication } = useNuxtApp()
const layout = useLayout()
const isMobile = useMediaQuery('(max-width: 768px)')

function handleClick(game: NonNullable<AllGamesRoot['results'][number]['games']>[number], isPractice: boolean) {
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

const slidesPerRow = computed(() => {
  if (isSmallScreen.value) {
    return 1.1
  } else if (isMediumScreen.value) {
    return 2.2
  } else if (isLargeScreen.value) {
    return 3.3
  } else if (isXLargeScreen.value) {
    return 4.1
  } else {
    return 5.5
  }
})
</script>

<template>
  <div class="tw-h-full">
    <div class="tw-my-0 tw-mt-4  ">
      <div class=" tw-flex tw-w-full tw-items-center tw-justify-between  tw-px-4">
        <h1 class="tw-my-0  tw-text-lg tw-font-extrabold tw-capitalize tw-text-gray-300 lg:tw-text-4xl">
          {{ props.gameName }}
        </h1>
        <div class="tw-flex tw-gap-2 tw-space-x-2 lg:tw-gap-8">
          <div class="tw-space-x-2">
            <q-btn push round dense color="orange" text-color="black" icon="arrow_left" @click="slidePrev" />
            <q-btn push round dense color="orange" text-color="black" icon="arrow_right" @click="slideNext" />
          </div>
          <q-btn
            :to="`/casino/games/${props.groupId}`" color="purple-8"
            class="tw-group tw-px-4 !tw-text-white lg:tw-px-8"
            dense
          >
            <span class="lg:tw-mr-2">More</span>
            <q-icon
              name="arrow_forward"
              class="lg:block tw-hidden tw-transition-all tw-duration-500 group-hover:tw-translate-x-4"
            />
          </q-btn>
        </div>
      </div>
      <!-- <q-separator inset size="1px" color="grey-8" /> -->
    </div>

    <div class="tw-place-content-center tw-place-items-center  tw-p-2 lg:tw-p-8">
      <Swiper
        :modules="modules"
        :slides-per-view="slidesPerRow"
        :space-between="20" @swiper="onSwiper"
      >
        <SwiperSlide v-for="(game, index) in props.slides" :key="index">
          <q-img
            :src="game.logo_url" :alt="game.label" fit="cover" class="image-container  tw-h-64  tw-rounded-xl "
            placeholder-src="/casino/logo.svg"
          >
            <div class="caption absolute-full text-subtitle2 flex flex-center">
              <div class="tw-mt-3  tw-flex tw-justify-around tw-space-x-4 ">
                <q-btn
                  size="sm" color="deep-purple-14" label="Play"
                  class="tw-h-6 tw-w-full tw-rounded-xl tw-ring-1 tw-ring-white" @click="handleClick(game, false)"
                />
                <q-btn
                  size="sm" color="black" label="Practice"
                  class=" tw-h-6 tw-w-full tw-rounded-xl tw-ring-1 tw-ring-white" @click="handleClick(game, true)"
                />
              </div>
            </div>
          </q-img>
        </SwiperSlide>
      </Swiper>
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
