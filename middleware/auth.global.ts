import { PagePackageType } from '~/utils/auth/page-package-type.enum'
import { PageType } from '~/utils/auth/page-type.enum'

export default defineNuxtRouteMiddleware((to, _) => {
  const general = useGeneralClientInfo()
  const { $authentication } = useNuxtApp()

  // ! Defaults to authenticated to avoid accidentally allowing access for authenticated pages
  const pageType = to.meta.pageType ?? PageType.PUBLIC
  const pagePackageType = to.meta.pagePackageType

  console.log(pagePackageType)

  if (pageType !== PageType.PUBLIC) {
    if (pageType === PageType.AUTHENTICATED && !$authentication.loggedIn.value) {
      return navigateTo('/')
    }
  }

  if (!general.generalClientInfo?.general?.is_casino_game && !general.generalClientInfo?.general?.is_live_match && !general.generalClientInfo?.general?.is_pre_match) {
    createError({
      statusCode: 403,
      statusMessage: 'This client have no any packages',
    })
  }

  if ((pagePackageType === 'is_casino_game') && (!general.generalClientInfo?.general?.is_casino_game && general.generalClientInfo?.general?.is_pre_match)) {
    return navigateTo('/')
  }
  if ((pagePackageType === 'is_casino_game') && (!general.generalClientInfo?.general?.is_casino_game && general.generalClientInfo?.general?.is_live_match)) {
    return navigateTo('/live')
  }

  if ((pagePackageType === 'is_pre_match') && (!general.generalClientInfo?.general?.is_pre_match && general.generalClientInfo?.general?.is_casino_game)) {
    return navigateTo('/casino')
  }
  if ((pagePackageType === 'is_pre_match') && (!general.generalClientInfo?.general?.is_pre_match && general.generalClientInfo?.general?.is_live_match)) {
    return navigateTo('/live')
  }

  if ((pagePackageType === 'is_live_match') && (!general.generalClientInfo?.general?.is_live_match && general.generalClientInfo?.general?.is_casino_game)) {
    return navigateTo('/casino')
  }
  if ((pagePackageType === 'is_live_match') && (!general.generalClientInfo?.general?.is_live_match && general.generalClientInfo?.general?.is_pre_match)) {
    return navigateTo('/')
  }
})
