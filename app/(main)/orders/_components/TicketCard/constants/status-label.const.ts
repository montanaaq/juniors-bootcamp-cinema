import type { CinemaTicket } from '@generated/api'

export const STATUS_LABEL: Record<CinemaTicket['status'], string> = {
  paid: 'оплачен',
  cancelled: 'отменён'
} as const
