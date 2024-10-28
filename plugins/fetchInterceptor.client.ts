// plugins/fetchInterceptor.client.ts

export default defineNuxtPlugin((nuxtApp) => {
  // Save the original useFetch function
  const originalUseFetch = nuxtApp.$fetch

  // Override useFetch
  nuxtApp.$fetch = async (...args) => {
    // Destructure resource and options from arguments
    const [resource, options] = args

    // Intercept and modify the options (request configuration)
    const newOptions = {
      ...options,
      headers: {
        ...(options?.headers || {}),
        Authorization: 'Bearer YOUR_TOKEN', // Example of adding a custom header
      },
    }

    // Log or modify the request as needed
    console.log('Intercepted request:', resource, newOptions)

    // Call the original fetch function
    const response = await originalUseFetch(resource, newOptions)

    // Log or modify the response as needed
    console.log('Intercepted response:', response)

    return response
  }
})
