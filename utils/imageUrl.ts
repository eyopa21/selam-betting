export function absoluteImageUrl(relativePath: string) {
  const runtimeConfig = useRuntimeConfig()
  return runtimeConfig.public.baseImageUrl + relativePath
}

export async function getAuthenticatedImage(relativeUrl: string) {
  const { getImage } = useAuthenticatedImage()

  const image = await getImage(relativeUrl)

  return image
}
