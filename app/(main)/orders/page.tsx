import type { Metadata } from 'next'

import { getOrdersOrEmpty } from '@/lib'

import TicketsList from './_components/TicketsList/TicketsList'

export const metadata: Metadata = {
  title: 'История покупки билетов',
  robots: { index: false, follow: false }
}

const OrdersPage = async () => {
  const orders = await getOrdersOrEmpty()
  const tickets = orders.flatMap(order =>
    order.tickets.map(ticket => ({ ...ticket, filmName: order.film.name }))
  )

  return (
    <section className="flex flex-col gap-8 py-10">
      <h1 className="font-extrabold text-3xl leading-8">История покупки билетов</h1>
      <TicketsList tickets={tickets} />
    </section>
  )
}

export default OrdersPage
