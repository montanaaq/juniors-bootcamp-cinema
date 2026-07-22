import type { Metadata } from 'next'
import type { FC } from 'react'

import { Button } from '@/components/ui'
import { getOrderByIdOrNotFound } from '@/lib'
import { CheckIcon } from 'lucide-react'
import Link from 'next/link'

import SummaryField from '../../film/[id]/checkout/_components/CheckoutWizard/components/SummaryField'
import { formatSelectedSeatsLabel } from '../../film/[id]/checkout/_components/CheckoutWizard/utils'
import { formatDate } from '../../film/[id]/checkout/_components/CheckoutWizard/utils/format-date'

interface OrderPageProps {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = {
  title: 'Оплата прошла успешно!',
  robots: { index: false, follow: false }
}

const OrderPage: FC<OrderPageProps> = async ({ params }) => {
  const { id } = await params
  const order = await getOrderByIdOrNotFound(id)

  const tickets = order.tickets
  const seance = tickets[0]?.seance
  const seatsLabel = formatSelectedSeatsLabel(tickets)
  const ticketNumbersLabel = tickets.map(ticket => ticket._id).join(', ')

  return (
    <section className="mx-auto flex w-full max-w-sm flex-col gap-8 py-10">
      <div className="flex size-16 items-center justify-center rounded-full bg-accent-quaternary text-accent-quaternary-fg">
        <CheckIcon size={28} />
      </div>

      <h1 className="font-extrabold text-3xl leading-8">Оплата прошла успешно</h1>

      <div className="flex flex-col gap-6">
        <SummaryField label="Количество билетов" value={String(tickets.length)} />
        <SummaryField label="Фильм" value={order.film.name} />
        {seance && (
          <SummaryField
            label="Дата и время"
            value={`${formatDate(seance.date)} в ${seance.time}`}
          />
        )}
        <SummaryField label="Места" value={seatsLabel} />
        <SummaryField label="Номера билетов" value={ticketNumbersLabel} />
      </div>

      <div className="border-t border-border-hard pt-6 text-base text-muted-fg dark:border-border-soft">
        Вся информация была продублирована в SMS
      </div>

      <div className="flex flex-col gap-3">
        <Button variant="secondary" size="lg" className="w-full">
          Детали заказа
        </Button>
        <Button asChild size="lg" className="w-full">
          <Link href="/">На главную</Link>
        </Button>
      </div>
    </section>
  )
}

export default OrderPage
