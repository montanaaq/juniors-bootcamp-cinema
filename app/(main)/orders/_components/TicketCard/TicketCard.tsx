'use client'

import { formatDate } from '@/app/(main)/film/[id]/checkout/_components/CheckoutWizard/utils'
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle
} from '@/components/ui'
import { cn } from '@/lib/utils'
import { useMutation } from '@siberiacancode/reactuse'
import { BanIcon, CircleCheckIcon, CircleHelpIcon, TicketIcon } from 'lucide-react'
import { useState } from 'react'

import { putApiCinemaOrdersCancel, type CinemaTicket } from '@generated/api'

import { STATUS_LABEL } from './constants/status-label.const'

interface TicketCardProps {
  ticket: CinemaTicket
  orderId: string
  number: number
  isRefunded: boolean
  onRefund: (ticketId: string) => void
}

export const TicketCard = ({ ticket, orderId, number, isRefunded, onRefund }: TicketCardProps) => {
  const [isRefundOpen, setIsRefundOpen] = useState(false)

  const isPaid = ticket.status === 'paid' && !isRefunded

  const cancelMutation = useMutation((orderId: string) =>
    putApiCinemaOrdersCancel({ body: { orderId } }).then(response => response.data)
  )

  const onRefundConfirm = async () => {
    await cancelMutation.mutateAsync(orderId)
    onRefund(ticket._id)
    setIsRefundOpen(false)
  }

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

      <span
        className={cn(
          'inline-flex w-fit items-center gap-4 rounded-full px-4 py-2 font-bold',
          isPaid ? 'bg-success' : 'bg-danger/20'
        )}
      >
        {isPaid ? STATUS_LABEL.paid : STATUS_LABEL.cancelled}
        {isPaid ? (
          <CircleCheckIcon size={18} strokeWidth={2.5} />
        ) : (
          <BanIcon size={18} strokeWidth={2.5} />
        )}
      </span>

      <div className="flex flex-col font-medium text-lg">
        <span className="text-muted-fg">Дата и время</span>
        <span>{`${formatDate(ticket.seance.date)}, ${ticket.seance.time}`}</span>
      </div>

      <div className="flex flex-col font-medium text-lg">
        <span className="text-muted-fg">Место</span>
        <span>{`${ticket.row} ряд, ${ticket.column} место`}</span>
      </div>

      {isPaid && (
        <Button
          variant="secondary"
          size="lg"
          className="w-full font-medium"
          onClick={() => setIsRefundOpen(true)}
        >
          Вернуть билет
        </Button>
      )}

      <Dialog open={isRefundOpen} onOpenChange={setIsRefundOpen}>
        <DialogContent className="px-4 py-6">
          <div className="flex flex-col items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-fg">
              <CircleHelpIcon size={28} />
            </div>
            <DialogTitle className="text-center">Вы уверены, что хотите вернуть билет?</DialogTitle>
          </div>

          {cancelMutation.error && (
            <p className="text-center text-danger">
              {cancelMutation.error.message || 'Не удалось вернуть билет'}
            </p>
          )}

          <DialogFooter className="flex flex-col gap-4">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="w-full"
              disabled={cancelMutation.isLoading}
              onClick={onRefundConfirm}
            >
              {cancelMutation.isLoading ? 'Возврат...' : 'Вернуть'}
            </Button>
            <DialogClose asChild>
              <Button
                type="button"
                size="lg"
                className="w-full"
                disabled={cancelMutation.isLoading}
              >
                Отменить
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
