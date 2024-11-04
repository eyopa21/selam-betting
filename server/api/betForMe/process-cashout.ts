import { exec } from 'node:child_process'
import type { NuxtError } from 'nuxt/app'

type ErrorResponse = {
  detail: string
  Error: string
}
export type ProcessCashoutBody = {
  voucher_code: string
  username: string
  amount: number
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const url = `${config.baseApiEndpoint}/betting/api/v1/cash_out_for_user/`
  const authHeader = getHeader(event, 'authorization')
  const body: ProcessCashoutBody = await readBody(event)
  try {
    // Convert body to JSON string
    const bodyString = JSON.stringify(body)
    // Construct the curl command
    const curlCommand = `curl -X GET "${url}" \
     -H "Content-Type: application/json" \
     -H "Authorization: ${authHeader!.toString()!}" \
     -H "X-API-KEY: ${config.serverApiKey}" \
     -d '${bodyString}'`

    // Execute the curl command
    exec(curlCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing curl: ${error}`)
        throw createError({
          statusCode: error.code,
          statusMessage: stderr || 'Curl Execution Error',
        })
      } else {
        console.log('Cuuuurl response:', stdout)
        // Parse response if needed
        const result = JSON.parse(stdout)
        if ('Error' in result) {
          throw createError({
            statusCode: 403,
            statusMessage: result.Error,
          })
        }
        return result
      }
    })
  } catch (err) {
    const error = err as NuxtError
    const errorResponse = error.data as ErrorResponse
    console.log('eriiiiiiiiiiiii', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: errorResponse?.Error ?? errorResponse?.detail ?? 'Connection Error',
    })
  }
})
