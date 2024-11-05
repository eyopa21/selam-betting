import type { TPageType } from '~/utils/auth/page-type.enum'

import type { TPagePackageType } from '~/utils/auth/page-package-type.enum'

declare module '#app' {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface PageMeta {
    /**
     * @default TPageType.PUBLIC
     */
    /**
     * @default TPagePackageType.PRE_MATCH
     */

    pageType?: TPageType
    requiresAuth?: boolean
    pagePackageType?: TPagePackageType
  }
}

export { }
