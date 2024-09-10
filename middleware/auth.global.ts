import { PageType } from '~/utils/auth/page-type.enum'

export default defineNuxtRouteMiddleware((to, _) => {
  const { $authentication } = useNuxtApp()

  // ! Defaults to authenticated to avoid accidentally allowing access for authenticated pages
  const pageType = to.meta.pageType ?? PageType.PUBLIC
  console.log('page', pageType)
  if (pageType !== PageType.PUBLIC) {
    if (pageType === PageType.AUTHENTICATED && !$authentication.loggedIn.value) {
      return navigateTo('/')
    }
  }
})
