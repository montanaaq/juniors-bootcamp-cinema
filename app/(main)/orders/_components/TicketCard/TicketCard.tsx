import { formatDate } from '@/app/(main)/film/[id]/checkout/_components/CheckoutWizard/utils'
import { Button } from '@/components/ui'
import { CircleCheckIcon, TicketIcon } from 'lucide-react'

import type { CinemaTicket } from '@generated/api'

import { STATUS_LABEL } from './constants/status-label.const'

interface TicketCardProps {
  ticket: CinemaTicket
  number: number
}

export const TicketCard = ({ ticket, number }: TicketCardProps) => {
  const isPaid = ticket.status === 'paid'

  return (
    <div className="flex w-82 flex-col gap-2 rounded-16 border border-border-hard p-6 dark:border-border-soft">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-muted-fg">Билет</span>
          <span className="text-3xl">{number}</span>
        </div>
        <div className="flex size-12 items-center justify-center rounded-full bg-accent-quaternary text-accent-quaternary-fg">
          <TicketIcon size={20} />
        </div>
      </div>

      {isPaid && (
        <span className="inline-flex w-fit items-center gap-4 rounded-full bg-success px-4 py-2 font-bold">
          {STATUS_LABEL[ticket.status]}
          <CircleCheckIcon size={16} strokeWidth={2.5} />
        </span>
      )}

      <div className="flex flex-col font-medium text-lg">
        <span className="text-muted-fg">Дата и время</span>
        <span>{`${formatDate(ticket.seance.date)}, ${ticket.seance.time}`}</span>
      </div>

      <div className="flex flex-col font-medium text-lg">
        <span className="text-muted-fg">Место</span>
        <span>{`${ticket.row} ряд, ${ticket.column} место`}</span>
      </div>

      {isPaid && (
        <Button variant="secondary" size="lg" className="w-full font-medium">
          Вернуть билет
        </Button>
      )}
    </div>
  )
}
