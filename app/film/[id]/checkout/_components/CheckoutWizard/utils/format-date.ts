export const formatDate = (date: string) => {
  const [day, month, year] = date.split('.')
  const fullYear = Number(year) + 2000
  const parsedDate = new Date(Date.UTC(fullYear, Number(month) - 1, Number(day)))

  return new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'UTC',
    day: 'numeric',
    month: 'long',
    weekday: 'long'
  }).format(parsedDate)
}
