export const formatPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, '').slice(-10)
  if (digits.length < 10) return phone

  return `+7 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 8)}-${digits.slice(8, 10)}`
}
