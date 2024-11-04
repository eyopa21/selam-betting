import { navigateTo, useNuxtApp } from '#app'

export function useErrorHandler() {
  // const { $authentication } = useNuxtApp()
  const handleError = (err: { statusCode: number }) => {
    // Only call `useRouter` or `navigateTo` within the function scope
    if (err.statusCode === 401) {
      // $authentication.logout()
      navigateTo('/') // Redirect to homepage on 401 error
    }

    if (tryUseNuxtApp()) {
      console.log('goody')
      const { $authentication } = useNuxtApp()
      if (err.statusCode === 401) {
        $authentication.logout()
        navigateTo('/') // Redirect to homepage on 401 error
      }
    } else {
      return process.env.STAND_TYPE
    }
  }

  return { handleError }
}
