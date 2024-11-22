import { useMediaQuery } from '@vueuse/core'

export const isSmallScreen = useMediaQuery('(max-width: 639px)') // Below Tailwind `sm`
export const isMediumScreen = useMediaQuery('(min-width: 640px) and (max-width: 1023px)') // Between `sm` and `lg`
export const isLargeScreen = useMediaQuery('(min-width: 1024px) and (max-width: 1279px)') // Between `lg` and `xl`
export const isXLargeScreen = useMediaQuery('(min-width: 1280px) and (max-width: 1535px)') // Between `xl` and `2xl`
export const is2XLargeScreen = useMediaQuery('(min-width: 1536px)') // Above `2xl`
