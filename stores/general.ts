import { defineStore } from 'pinia'
import type { AdsRoot, BannerRoot, GeneralRoot, SystemNameAndLogo } from '~/server/api/general/get-client-preference'

export const useGeneralClientInfo = defineStore('general', () => {
  const generalClientInfo = ref<{
    general: GeneralRoot
    nameAndLogo: SystemNameAndLogo
    ads: AdsRoot['results']
    banners: BannerRoot['results']
  }>()

  function setGeneralInfo(info: {
    general: GeneralRoot
    nameAndLogo: SystemNameAndLogo
    ads: AdsRoot['results']
    banners: BannerRoot['results']
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
