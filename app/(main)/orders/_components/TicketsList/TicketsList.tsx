'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { useState } from 'react'

import type { CinemaTicket } from '@generated/api'

import { TicketCard } from '../TicketCard/TicketCard'

interface TicketsListProps {
  tickets: CinemaTicket[]
}

type TicketsTab = 'active' | 'history'

const TicketsList = ({ tickets }: TicketsListProps) => {
  const [tab, setTab] = useState<TicketsTab>('active')

  const activeTickets = tickets.filter(ticket => ticket.status === 'paid')

  const visibleTickets = tab === 'active' ? activeTickets : tickets

  return (
    <Tabs value={tab} onValueChange={value => setTab(value as TicketsTab)}>
      <TabsList>
        <TabsTrigger value="active">Активные</TabsTrigger>
        <TabsTrigger value="history">История</TabsTrigger>
      </TabsList>

      <TabsContent value={tab} className="flex flex-wrap gap-6">
        {visibleTickets.length ? (
          visibleTickets.map((ticket, index) => (
            <TicketCard
              key={ticket._id}
              ticket={ticket}
              number={index + 1}
              orderId={ticket.orderId}
            />
          ))
        ) : (
          <p className="text-muted-fg">Билетов пока нет</p>
        )}
      </TabsContent>
    </Tabs>
  )
}

export default TicketsList
