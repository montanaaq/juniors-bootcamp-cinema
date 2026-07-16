import type { CreatePaymentTicketsDto } from '@generated/api'

export const formatSelectedSeatsLabel = (tickets: CreatePaymentTicketsDto[]) =>
  tickets
    .map(ticket => {
      return `${ticket.row} ряд ${ticket.column} место`
    })
    .join(', ')
