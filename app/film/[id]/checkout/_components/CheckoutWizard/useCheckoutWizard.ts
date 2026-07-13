import type { DebitCardFormValues, PersonFormValues } from '@/src/schemas/schemas'

import { useMutation, useStep } from '@siberiacancode/reactuse'
import { useState } from 'react'

import type {
  CreateCinemaPaymentDto,
  CreatePaymentTicketsDto,
  Film,
  FilmScheduleSeance,
  PaymentResponse,
  Seat
} from '@generated/api'
import { postApiCinemaPayment } from '@generated/api'

export const useCheckoutWizard = (
  film: Film,
  selectedDate: string,
  selectedSlot: FilmScheduleSeance
) => {
  const stepper = useStep(4)
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])
  const [tickets, setTickets] = useState<CreatePaymentTicketsDto[]>([])
  const [person, setPerson] = useState<PersonFormValues | null>(null)
  const [conflictTickets, setConflictTickets] = useState<CreatePaymentTicketsDto[]>([])

  const paymentMutation = useMutation<CreateCinemaPaymentDto, PaymentResponse>(body =>
    postApiCinemaPayment({ body }).then(response => response.data)
  )

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0)

  const onSeatsNext = (nextSeats: Seat[], nextTickets: CreatePaymentTicketsDto[]) => {
    setTickets(nextTickets)
    setSelectedSeats(nextSeats)
    stepper.next()
  }

  const onPersonSubmit = (values: PersonFormValues) => {
    setPerson(values)
    stepper.next()
  }

  const onPaymentSubmit = async (values: DebitCardFormValues) => {
    if (!person) return

    try {
      const result = await paymentMutation.mutateAsync({
        filmId: film.id,
        person: {
          firstname: person.firstname,
          lastname: person.lastname,
          middlename: person.middlename,
          phone: person.phone
        },
        debitCard: values,
        seance: { date: selectedDate, time: selectedSlot.time },
        tickets: tickets.map(({ row, column }) => ({ row, column }))
      })

      if (result.success === false) {
        handleConflict(result)
      }
    } catch (error) {
      const response = (error as { response?: { data?: PaymentResponse } })?.response?.data

      if (response?.success === false) {
        handleConflict(response)
      }
    }
  }

  const handleConflict = (result: PaymentResponse) => {
    const paidSeats = result.order.tickets?.filter(ticket => ticket.status === 'paid') ?? []

    if (paidSeats.length) {
      const isTaken = (row: number, column: number) =>
        paidSeats.some(seat => seat.row === row && seat.column === column)

      setSelectedSeats(current =>
        current.filter((_, index) => !isTaken(tickets[index].row, tickets[index].column))
      )
      setTickets(current => current.filter(ticket => !isTaken(ticket.row, ticket.column)))
      setConflictTickets(paidSeats)
      stepper.set(1)
    }
  }
  const paymentError =
    paymentMutation.error?.message ||
    (paymentMutation.data?.success === false && !conflictTickets.length
      ? paymentMutation.data.reason || 'Не удалось оплатить билеты'
      : null)

  return {
    stepper,
    tickets,
    selectedSeats,
    conflictTickets,
    person,
    totalPrice,
    paymentMutation,
    paymentError,
    onSeatsNext,
    onPersonSubmit,
    onPaymentSubmit
  }
}
