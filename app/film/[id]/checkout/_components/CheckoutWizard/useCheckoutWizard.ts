import type { DebitCardFormValues, PersonFormValues } from './schemas/schemas'

import { useMutation, useStep } from '@siberiacancode/reactuse'
import { useState } from 'react'

import type {
  CreateCinemaPaymentDto,
  Film,
  FilmScheduleSeance,
  PaymentResponse
} from '@generated/api'
import { postApiCinemaPayment } from '@generated/api'

type Ticket = { row: number; column: number }

export const useCheckoutWizard = (
  film: Film,
  selectedDate: string,
  selectedSlot: FilmScheduleSeance
) => {
  const stepper = useStep(4)
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [person, setPerson] = useState<PersonFormValues | null>(null)

  const paymentMutation = useMutation<CreateCinemaPaymentDto, PaymentResponse>(body =>
    postApiCinemaPayment({ body }).then(response => response.data)
  )

  const totalPrice = tickets.length * 350

  const handleSeatsNext = (nextTickets: Ticket[]) => {
    setTickets(nextTickets)
    stepper.next()
  }

  const handlePersonSubmit = (values: PersonFormValues) => {
    setPerson(values)
    stepper.next()
  }

  const handlePaymentSubmit = async (values: DebitCardFormValues) => {
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
      tickets
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
    person,
    totalPrice,
    paymentMutation,
    paymentError,
    handleSeatsNext,
    handlePersonSubmit,
    handlePaymentSubmit
  }
}
