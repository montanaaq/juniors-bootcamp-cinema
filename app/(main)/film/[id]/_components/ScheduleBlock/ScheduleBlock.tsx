'use client'

import type { FC } from 'react'

import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { XIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useIntl } from 'react-intl'

import type { FilmSchedule, SelectedSlot } from '@generated/api'

import { ScheduleNotFound } from './NotFound'
import { formatScheduleDate, groupSeancesByHall } from './utils'

interface FilmScheduleProps {
  filmId: string
  filmSchedule: FilmSchedule[]
}

export const ScheduleBlock: FC<FilmScheduleProps> = ({ filmId, filmSchedule }) => {
  filmSchedule = filmSchedule.slice(0, 4)

  const intl = useIntl()
  const [selectedDate, setSelectedDate] = useState(filmSchedule[0]?.date)
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null)

  const selectedSchedule =
    filmSchedule.find(schedule => schedule.date === selectedDate) ?? filmSchedule[0]

  const hallGroups = groupSeancesByHall(selectedSchedule)

  const onDateChange = (date: string) => {
    setSelectedDate(date)
    setSelectedSlot(null)
  }

  const onSlotClick = (slot: SelectedSlot) => {
    setSelectedSlot(currentSlot => (currentSlot?.id === slot.id ? null : slot))
  }

  const checkoutHref =
    selectedDate && selectedSlot
      ? `/film/${filmId}/checkout?${new URLSearchParams({
          date: selectedDate,
          time: selectedSlot.time,
          hall: selectedSlot.hall.name
        }).toString()}`
      : undefined

  if (!filmSchedule.length) {
    return <ScheduleNotFound />
  }

  return (
    <section className="flex min-w-0 flex-col gap-8 rounded-16 bg-background flex-1 lg:flex-none lg:w-1/2">
      <Tabs value={selectedDate} onValueChange={onDateChange}>
        <TabsList className="flex max-w-full justify-start overflow-x-auto">
          {filmSchedule.map(schedule => {
            const formattedDate = formatScheduleDate(schedule.date)

            return (
              <TabsTrigger
                key={schedule.date}
                value={schedule.date}
                className="min-w-28 flex-none text-lg leading-5 p-2.5"
              >
                <span className="capitalize">{formattedDate.label}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        {selectedSchedule && (
          <TabsContent value={selectedSchedule.date} className="flex flex-col gap-8">
            {hallGroups.map(hallGroup => (
              <section key={hallGroup.name} className="flex flex-col gap-2">
                <h3 className="font-bold text-xl leading-7">
                  {intl.formatMessage({
                    id: `hall.name.${hallGroup.name}`,
                    defaultMessage: `${hallGroup.name} зал`
                  })}
                </h3>

                <div className="flex flex-wrap gap-3">
                  {hallGroup.seances.map(seance => {
                    const isSelected = selectedSlot?.id === seance.id

                    return (
                      <Button
                        key={seance.id}
                        type="button"
                        size="lg"
                        variant={isSelected ? 'primary' : 'secondary'}
                        className="h-13 w-28 gap-2 font-extrabold"
                        aria-pressed={isSelected}
                        onClick={() => onSlotClick(seance)}
                      >
                        <span>{seance.time}</span>
                        {isSelected && (
                          <span aria-hidden="true" className="text-xl leading-none">
                            <XIcon />
                          </span>
                        )}
                      </Button>
                    )
                  })}
                </div>
              </section>
            ))}
          </TabsContent>
        )}
      </Tabs>

      <Button
        asChild={!!checkoutHref}
        disabled={!checkoutHref}
        type="button"
        size="lg"
        className="h-13 w-82 max-w-full"
      >
        {checkoutHref ? <Link href={checkoutHref}>Продолжить</Link> : 'Продолжить'}
      </Button>
    </section>
  )
}
