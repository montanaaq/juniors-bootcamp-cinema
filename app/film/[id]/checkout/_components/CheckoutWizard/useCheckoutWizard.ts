import type { DebitCardFormValues, PersonFormValues } from './schemas/schemas'

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

    await paymentMutation.mutateAsync({
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
  }

  const paymentError =
    paymentMutation.error?.message ||
    (paymentMutation.data?.success === false
      ? paymentMutation.data.reason || 'Не удалось оплатить билеты'
      : null)

  return {
    stepper,
    tickets,
    selectedSeats,
    person,
    totalPrice,
    paymentMutation,
    paymentError,
    onSeatsNext,
    onPersonSubmit,
    onPaymentSubmit
  }
}
