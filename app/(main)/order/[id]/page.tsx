import type { Metadata } from 'next'
import type { FC } from 'react'

import { CheckIcon } from 'lucide-react'
import { notFound } from 'next/navigation'

import { getApiCinemaOrders } from '@generated/api'

interface OrderPageProps {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = {
  title: 'Заказ оплачен',
  robots: { index: false, follow: false }
}

const OrderPage: FC<OrderPageProps> = async ({ params }) => {
  const { id } = await params
  const response = await getApiCinemaOrders({
    headers: {
      authorization: `Bearer`
    }
  })

  const order = response.data.orders.find(order => order._id === id)

  if (!order) {
    notFound()
  }

  return (
    <section>
      <CheckIcon />
      <h1>Оплата прошла успешно</h1>
    </section>
  )
}

export default OrderPage
