'use client'

import { useMap } from '@siberiacancode/reactuse'

import type { CreatePaymentTicketsDto, FilmHall, Seat } from '@generated/api'

import { formatSelectedSeatsLabel } from '../../utils'

interface UseSeatsStepParams {
  hall: FilmHall
  initialTickets: CreatePaymentTicketsDto[]
  conflictSeats: CreatePaymentTicketsDto[]
}

export const useSeatsStep = ({ hall, initialTickets, conflictSeats }: UseSeatsStepParams) => {
  const ticketsMap = useMap<string, CreatePaymentTicketsDto>(
    initialTickets.map(ticket => [`${ticket.row}-${ticket.column}`, ticket])
  )

  const tickets = [...ticketsMap.value.values()]

  const isConflict = (row: number, column: number) =>
    conflictSeats?.some(seat => seat.row === row && seat.column === column)

  const toggleTicket = (ticket: CreatePaymentTicketsDto) => {
    const key = `${ticket.row}-${ticket.column}`

    if (ticketsMap.has(key)) {
      ticketsMap.remove(key)
    } else {
      ticketsMap.set(key, ticket)
    }
  }

  const findTicket = (ticket: Pick<CreatePaymentTicketsDto, 'row' | 'column'>) =>
    ticketsMap.value.get(`${ticket.row}-${ticket.column}`)

  const selectedSeats = tickets
    .map(ticket => hall.places[ticket.row - 1]?.[ticket.column - 1] as Seat | undefined)
    .filter((seat): seat is Seat => !!seat)

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0)
  const selectedSeatsLabel = formatSelectedSeatsLabel(tickets)

  return {
    tickets,
    ticketsCount: ticketsMap.size,
    isConflict,
    toggleTicket,
    findTicket,
    selectedSeats,
    selectedSeatsLabel,
    totalPrice
  }
}
