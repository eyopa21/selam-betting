export function useAuthenticatedImage() {
  const loading = ref(false)
  const { $authentication } = useNuxtApp()

  async function getImage(relativeUrl: string) {
    console.log('rel', relativeUrl)
    loading.value = true
    try {
      const response = await $fetch(`/api/app/get-image?image=${relativeUrl}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${$authentication.accessToken.value}`,
        },
      })
      if (response) {
        const blobUrl = URL.createObjectURL(response as Blob)
        return blobUrl
      }
    } catch (err) {
      useErrorNotifications(ref(err))
    } finally {
      loading.value = false
    }
  }
  return {
    getImage,
  }
}
