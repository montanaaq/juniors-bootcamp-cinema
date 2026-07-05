export const formatScheduleDate = (date: string) => {
  const [day, month, year] = date.split('.')
  const fullYear = Number(year) + 2000
  const parsedDate = new Date(fullYear, Number(month) - 1, Number(day))
  const label = new Intl.DateTimeFormat('ru-RU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  })
    .format(parsedDate)
    .replace(/\.$/, '')

  return {
    day: `${day}.${month}`,
    label,
    weekday: new Intl.DateTimeFormat('ru-RU', {
      weekday: 'short'
    }).format(parsedDate)
  }
}
