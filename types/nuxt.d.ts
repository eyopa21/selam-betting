// types/nuxt.d.ts

import type { ComputedRef } from 'vue'
import type { AuthSessionSchema } from './login'

declare module '#app' {
  type NuxtApp = {
    $authentication: {
      session: ComputedRef<AuthSessionSchema | null>
      loggedIn: ComputedRef<boolean>
      updateSession: (candidate: AuthSessionSchema | null) => void
      accessToken: ComputedRef<string | null>
      userId: ComputedRef<string | null>
      logout: () => void
    }
  }
}

declare module 'vue' {
  type ComponentCustomProperties = {
    $authentication: {
      session: ComputedRef<AuthSessionSchema | null>
      loggedIn: ComputedRef<boolean>
      updateSession: (candidate: AuthSessionSchema | null) => void
      accessToken: ComputedRef<string | null>
      userId: ComputedRef<string | null>
      logout: () => void
    }
  }
}
