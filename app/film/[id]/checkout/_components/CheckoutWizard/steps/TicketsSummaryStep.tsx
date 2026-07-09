'use client'

import type { FC } from 'react'

import { useIntl } from 'react-intl'

import type { CreatePaymentTicketsDto, Film, FilmScheduleSeance, Seat } from '@generated/api'

import SummaryField from '../components/SummaryField'
import { formatSelectedSeatsLabel, formatDate } from '../utils'

interface TicketsSummaryStepProps {
  film: Film
  selectedDate: string
  selectedSlot: FilmScheduleSeance
  tickets: CreatePaymentTicketsDto[]
  seats: Seat[]
  totalPrice: number
}

export const TicketsSummaryStep: FC<TicketsSummaryStepProps> = ({
  film,
  selectedDate,
  selectedSlot,
  tickets,
  totalPrice
}) => {
  const intl = useIntl()

  return (
    <div className="flex flex-col gap-4">
      <SummaryField label="Фильм" value={film.name} />
      <SummaryField label="Количество" value={`${tickets.length}`} />
      <SummaryField
        label="Дата и время"
        value={`${formatDate(selectedDate)}, ${selectedSlot.time}`}
      />
      <SummaryField
        label="Зал"
        value={`${intl.formatMessage({
          id: `hall.name.${selectedSlot.hall.name}`
        })}`}
      />
      <SummaryField label="Места" value={formatSelectedSeatsLabel(tickets)} />
      <p className="text-3xl font-bold">Сумма: {totalPrice} ₽</p>
    </div>
  )
}
