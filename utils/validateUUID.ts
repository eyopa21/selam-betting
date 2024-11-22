export function validateUUID(routeParams: string) {
  const uuidRegEx = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  const isValid = uuidRegEx.test(String(routeParams))
  if (!isValid) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid  URL.  Please go home page and try again',
    })
  }
  return isValid
}
