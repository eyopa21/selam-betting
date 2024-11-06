import { defineStore } from 'pinia'
import type { AdsRoot, BannerRoot, GeneralRoot, SystemNameAndLogo, ThemeRoot } from '~/server/api/general/get-client-preference'

export const useGeneralClientInfo = defineStore('general', () => {
  const generalClientInfo = ref<{
    general: GeneralRoot
    nameAndLogo: SystemNameAndLogo
    ads: AdsRoot['results']
    banners: BannerRoot['results']
    theme: ThemeRoot
  }>()

  function setGeneralInfo(info: {
    general: GeneralRoot
    nameAndLogo: SystemNameAndLogo
    ads: AdsRoot['results']
    banners: BannerRoot['results']
    theme: ThemeRoot
  }) {
    generalClientInfo.value = { ...info }
  }

  return {
    generalClientInfo,
    setGeneralInfo,
  }
}, {
  persist: true,
})
