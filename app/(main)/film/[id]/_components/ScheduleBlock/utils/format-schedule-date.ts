const scheduleDateFormatter = new Intl.DateTimeFormat('ru-RU', {
  timeZone: 'UTC',
  weekday: 'short',
  day: 'numeric',
  month: 'short'
})

const weekdayFormatter = new Intl.DateTimeFormat('ru-RU', {
  timeZone: 'UTC',
  weekday: 'short'
})

export const formatScheduleDate = (date: string) => {
  const [day, month, year] = date.split('.')
  const fullYear = Number(year) + 2000
  const parsedDate = new Date(Date.UTC(fullYear, Number(month) - 1, Number(day)))
  const label = scheduleDateFormatter.format(parsedDate).replace(/\.$/, '')

  return {
    day: `${day}.${month}`,
    label,
    weekday: weekdayFormatter.format(parsedDate)
  }
}
