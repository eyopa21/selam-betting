import { PageType } from '~/utils/auth/page-type.enum'

export default defineNuxtRouteMiddleware((to, _) => {
  const general = useGeneralClientInfo()
  const { $authentication } = useNuxtApp()

  // ! Defaults to authenticated to avoid accidentally allowing access for authenticated pages
  const pageType = to.meta.pageType ?? PageType.PUBLIC

  if (pageType !== PageType.PUBLIC) {
    if (pageType === PageType.AUTHENTICATED && !$authentication.loggedIn.value) {
      return navigateTo('/')
    }
  }

  if ((to.name === 'casino' || to.name === 'games-id') && !general.generalClientInfo?.general.is_casino_game) {
    return navigateTo('/')
  }
})
