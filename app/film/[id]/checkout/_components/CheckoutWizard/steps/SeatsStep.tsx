'use client'

import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useState } from 'react'

import type { FilmScheduleSeance } from '@generated/api'

type Ticket = { row: number; column: number }

type SeatsStepProps = {
  hall: FilmScheduleSeance['hall']
  initialTickets: Ticket[]
  onSubmit: (tickets: Ticket[]) => void
}

export const SeatsStep = ({ hall, initialTickets, onSubmit }: SeatsStepProps) => {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets)

  const toggleTicket = (ticket: Ticket) => {
    setTickets(currentTickets => {
      const exists = currentTickets.some(
        currentTicket => currentTicket.row === ticket.row && currentTicket.column === ticket.column
      )

      if (exists) {
        return currentTickets.filter(
          currentTicket =>
            currentTicket.row !== ticket.row || currentTicket.column !== ticket.column
        )
      }

      return [...currentTickets, ticket]
    })
  }

  const isSelected = (ticket: Ticket) =>
    tickets.some(
      currentTicket => currentTicket.row === ticket.row && currentTicket.column === ticket.column
    )

  return (
    <div className="flex flex-col gap-6">
      <div className="mx-auto h-3 w-3/4 rounded-full bg-muted" />

      <div className="flex flex-col gap-2 overflow-x-auto">
        {hall.places.map((row, rowIndex) => (
          <div key={rowIndex} className="flex min-w-max items-center gap-2">
            <span className="w-8 text-sm font-bold text-muted-fg">{rowIndex + 1}</span>
            {row.map((_, columnIndex) => {
              const ticket = { row: rowIndex + 1, column: columnIndex + 1 }

              return (
                <button
                  key={columnIndex}
                  type="button"
                  aria-pressed={isSelected(ticket)}
                  aria-label={`${ticket.row} ряд, ${ticket.column} место`}
                  onClick={() => toggleTicket(ticket)}
                  className={cn(
                    'flex size-10 items-center justify-center rounded-8 border border-ring text-sm font-extrabold transition hover:border-border-hard',
                    isSelected(ticket) && 'bg-primary text-primary-fg'
                  )}
                >
                  {columnIndex + 1}
                </button>
              )
            })}
          </div>
        ))}
      </div>

      <Button
        type="button"
        size="lg"
        className="w-fit self-end"
        disabled={tickets.length === 0}
        onClick={() => onSubmit(tickets)}
      >
        Продолжить
      </Button>
    </div>
  )
}
