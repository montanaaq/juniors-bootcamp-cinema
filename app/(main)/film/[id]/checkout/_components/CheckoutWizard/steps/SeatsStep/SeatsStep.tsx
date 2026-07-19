'use client'

import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui'
import { cn } from '@/lib/utils'
import { TicketIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { type CSSProperties } from 'react'
import { useIntl } from 'react-intl'

import type { CreatePaymentTicketsDto, FilmHall, FilmScheduleSeance, Seat } from '@generated/api'

import SummaryField from '../../components/SummaryField'
import { HELP_LABELS } from '../../constants/help-labels.const'
import { formatDate } from '../../utils'
import { useSeatsStep } from './useSeatsStep'

interface SeatsStepProps {
  filmName: string
  selectedDate: string
  selectedSlot: FilmScheduleSeance
  filmId: string
  hall: FilmHall
  initialTickets: CreatePaymentTicketsDto[]
  conflictSeats: CreatePaymentTicketsDto[]
  onSubmit: (seats: Seat[], tickets: CreatePaymentTicketsDto[]) => void
}

export const SeatsStep = ({
  filmName,
  selectedDate,
  selectedSlot,
  filmId,
  hall,
  initialTickets,
  conflictSeats,
  onSubmit
}: SeatsStepProps) => {
  const intl = useIntl()
  const {
    tickets,
    ticketsCount,
    isConflict,
    toggleTicket,
    findTicket,
    selectedSeats,
    selectedSeatsLabel,
    totalPrice
  } = useSeatsStep({ hall, initialTickets, conflictSeats })

  const summaryItems = [
    { label: 'Количество билетов', value: String(ticketsCount) },
    { label: 'Фильм', value: filmName },
    { label: 'Дата и время', value: `${formatDate(selectedDate)}, ${selectedSlot.time}` },
    { label: 'Зал', value: intl.formatMessage({ id: `hall.name.${hall.name}` }) },
    { label: 'Места', value: selectedSeatsLabel || 'Места не выбраны' },
    { label: 'Итого', value: `${totalPrice} ₽` }
  ]

  return (
    <div className="flex justify-between gap-4">
      <div className="w-[55%] flex gap-6 flex-col py-6">
        <TooltipProvider>
          <div className="flex flex-col gap-3 overflow-x-auto w-fit">
            <div className="flex min-w-max items-center">
              <span className="w-8 font-semibold text-muted-fg">Ряд</span>
            </div>
            {hall.places.map((row, rowIndex) => (
              <div
                key={rowIndex}
                style={{ '--seats': row.length } as CSSProperties}
                className="flex min-w-max items-center gap-[clamp(0.75rem,calc(1.875rem-var(--seats)*0.075rem),1.5rem)]"
              >
                <span className="w-8 font-semibold text-muted-fg">{rowIndex + 1}</span>
                {(row as Seat[]).map((seat, columnIndex) => {
                  const base = { row: rowIndex + 1, column: columnIndex + 1 }
                  const selected = findTicket(base)
                  const isBlocked = seat.type === 'blocked'
                  const conflict = isConflict(base.row, base.column)

                  return (
                    <Tooltip key={columnIndex} open={!!selected}>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          disabled={isBlocked}
                          aria-pressed={!!selected}
                          aria-label={`${base.row} ряд, ${base.column} место, ${seat.price} рублей`}
                          onClick={() => toggleTicket(base)}
                          className={cn(
                            'size-5 rounded-4 border border-seat-available bg-seat-available transition hover:border-seat-available-hover',
                            !!selected && 'border-seat-selected-border bg-seat-selected',
                            isBlocked &&
                              'cursor-not-allowed border-transparent bg-seat-blocked hover:border-transparent',
                            conflict && 'border-danger bg-danger/20 hover:border-danger'
                          )}
                        >
                          <span className="sr-only">
                            {base.row} ряд, {base.column} место
                          </span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="flex items-center gap-2 px-3 py-2 rounded-12">
                        <div className="flex flex-col gap-0.5">
                          <div className="flex justify-between items-center h-full">
                            <span className="text-base">{seat.price} ₽</span>
                            <button
                              type="button"
                              aria-label="Убрать место"
                              onClick={e => {
                                e.stopPropagation()
                                toggleTicket(base)
                              }}
                              className="shrink-0 rounded-full p-0.5 opacity-70 hover:opacity-100"
                            >
                              <XIcon className="size-5" />
                            </button>
                          </div>
                          <span className="text-sm text-surface">
                            {base.row} ряд, {base.column} место
                          </span>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  )
                })}
              </div>
            ))}
            <div className="flex items-center justify-around mt-3">
              {HELP_LABELS.map(el => (
                <div
                  key={`${el.color}-${el.label}`}
                  className="flex items-center justify-between gap-2"
                >
                  <div className={`bg-${el.color} size-5 rounded-4`}></div>
                  <span className="text-sm">{el.label}</span>
                </div>
              ))}
            </div>
          </div>
        </TooltipProvider>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="secondary" size="lg" asChild className="w-full">
            <Link href={`/film/${filmId}`} prefetch="auto">
              Назад
            </Link>
          </Button>
          <Button
            type="button"
            size="lg"
            disabled={!ticketsCount}
            onClick={() => onSubmit(selectedSeats, tickets)}
            className="w-full"
          >
            Продолжить
          </Button>
        </div>
      </div>
      <div className="w-[40%] flex flex-col gap-4 bg-secondary rounded-24 px-10 py-6 h-fit">
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-bold text-2xl">Ваши билеты</h1>
          <div className="flex items-center justify-center bg-accent-quaternary size-12 rounded-full">
            <TicketIcon color="white" size={24} />
          </div>
        </div>
        {summaryItems.map(item => (
          <SummaryField key={item.label} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  )
}
