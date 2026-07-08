'use client'

import { useIntl } from 'react-intl'

import type { Film, FilmScheduleSeance } from '@generated/api'

import { formatDate } from '../utils/format-date'

type Ticket = { row: number; column: number }

interface TicketsSummaryStepProps {
  film: Film
  selectedDate: string
  selectedSlot: FilmScheduleSeance
  tickets: Ticket[]
  totalPrice: number
}

interface SummaryItemProps {
  label: string
  value: string
}

export const TicketsSummaryStep = ({
  film,
  selectedDate,
  selectedSlot,
  tickets,
  totalPrice
}: TicketsSummaryStepProps) => {
  const intl = useIntl()

  const selectedSeatsLabel = tickets
    .map(ticket => `${ticket.row} ряд, ${ticket.column} место`)
    .join('; ')

  return (
    <div className="grid gap-4 text-lg sm:grid-cols-2">
      <SummaryItem label="Фильм" value={film.name} />
      <SummaryItem label="Сеанс" value={`${formatDate(selectedDate)}, ${selectedSlot.time}`} />
      <SummaryItem
        label="Зал"
        value={`${intl.formatMessage({
          id: `hall.name.${selectedSlot.hall.name}`
        })}`}
      />
      <SummaryItem label="Места" value={selectedSeatsLabel} />
      <SummaryItem label="Количество" value={`${tickets.length}`} />
      <SummaryItem label="Итого" value={`${totalPrice} ₽`} />
    </div>
  )
}

const SummaryItem = ({ label, value }: SummaryItemProps) => (
  <div className="rounded-12 bg-secondary p-4">
    <span className="block text-sm text-muted-fg">{label}</span>
    <strong>{value}</strong>
  </div>
)
