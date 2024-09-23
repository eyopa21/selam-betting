import { defineStore } from 'pinia'
import type { GeneralRoot } from '~/server/api/general/get-client-preference'

export const useGeneralClientInfo = defineStore('general', () => {
  const generalClientInfo = ref<GeneralRoot>()

  function setGeneralInfo(info: GeneralRoot) {
    generalClientInfo.value = info
  }

  return {
    generalClientInfo,
    setGeneralInfo,
  }
}, {
  persist: true,
})
