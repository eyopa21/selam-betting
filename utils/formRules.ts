export function validatePassword(password: string): boolean {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/
  return passwordRegex.test(password)
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i
  return emailRegex.test(email)
}

export function validatePhoneNumber(phone: string): boolean {
  const phoneNumberRegex = /^(09|07)\d{8}$|^\+2519|^\+2517\d{8}$|^2519|^2517\d{8}$/

  return phoneNumberRegex.test(phone)
}
