import type { FilmSchedule, HallGroup } from '@generated/api'

export const groupSeancesByHall = (schedule?: FilmSchedule): HallGroup[] => {
  if (!schedule) return []

  const groups = new Map<string, HallGroup>()

  schedule.seances.forEach((seance, index) => {
    const hallName = seance.hall.name
    const currentGroup = groups.get(hallName) ?? {
      ...seance.hall,
      seances: []
    }

    currentGroup.seances.push({
      ...seance,
      id: `${schedule.date}-${hallName}-${seance.time}-${index}`
    })
    groups.set(hallName, currentGroup)
  })

  return Array.from(groups.values())
}
