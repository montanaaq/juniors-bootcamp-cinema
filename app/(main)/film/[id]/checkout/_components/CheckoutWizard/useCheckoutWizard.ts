import type { DebitCardFormValues, PersonFormValues } from '@/schemas'

import { useMount, useMutation, useSessionStorage, useStep } from '@siberiacancode/reactuse'
import { useRouter } from 'next/navigation'
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

const CHECKOUT_STEPS_COUNT = 4
const FIRST_CHECKOUT_STEP = 1

interface CheckoutState {
  step: number
  tickets: CreatePaymentTicketsDto[]
  selectedSeats: Seat[]
  person: PersonFormValues | null
  conflictTickets: CreatePaymentTicketsDto[]
}

const INITIAL_CHECKOUT_STATE: CheckoutState = {
  step: FIRST_CHECKOUT_STEP,
  tickets: [],
  selectedSeats: [],
  person: null,
  conflictTickets: []
}

export const useCheckoutWizard = (
  film: Film,
  selectedDate: string,
  selectedSlot: FilmScheduleSeance
) => {
  const stepper = useStep(CHECKOUT_STEPS_COUNT)
  const router = useRouter()
  const storageKey = [
    'checkout',
    film.id,
    selectedDate,
    selectedSlot.time,
    selectedSlot.hall.name
  ].join(':')
  const checkoutStorage = useSessionStorage<CheckoutState>(storageKey, INITIAL_CHECKOUT_STATE)
  const [checkoutState, setCheckoutState] = useState<CheckoutState>(INITIAL_CHECKOUT_STATE)

  const persistCheckout = (state: CheckoutState) => {
    setCheckoutState(state)
    checkoutStorage.set(state)
  }

  useMount(() => {
    const storedState = checkoutStorage.value

    if (!storedState) return

    setCheckoutState(storedState)
    stepper.set(storedState.step)
  })

  const paymentMutation = useMutation<CreateCinemaPaymentDto, PaymentResponse>(body =>
    postApiCinemaPayment({ body }).then(response => response.data)
  )

  const totalPrice = checkoutState.selectedSeats.reduce((sum, seat) => sum + seat.price, 0)

  const setStep = (step: number) => {
    stepper.set(step)
    persistCheckout({ ...checkoutState, step })
  }

  const nextStep = () => setStep(stepper.currentStep + 1)
  const previousStep = () => setStep(stepper.currentStep - 1)
  const resetSteps = () => setStep(FIRST_CHECKOUT_STEP)

  const persistedStepper = {
    ...stepper,
    set: setStep,
    next: nextStep,
    back: previousStep,
    reset: resetSteps
  }

  const onSeatsChange = (nextSeats: Seat[], nextTickets: CreatePaymentTicketsDto[]) => {
    persistCheckout({
      ...checkoutState,
      tickets: nextTickets,
      selectedSeats: nextSeats
    })
  }

  const onSeatsNext = (nextSeats: Seat[], nextTickets: CreatePaymentTicketsDto[]) => {
    stepper.next()
    persistCheckout({
      ...checkoutState,
      step: Math.min(stepper.currentStep + 1, CHECKOUT_STEPS_COUNT),
      tickets: nextTickets,
      selectedSeats: nextSeats
    })
  }

  const onPersonChange = (values: PersonFormValues) => {
    persistCheckout({ ...checkoutState, person: values })
  }

  const onPersonSubmit = (values: PersonFormValues) => {
    stepper.next()
    persistCheckout({
      ...checkoutState,
      step: Math.min(stepper.currentStep + 1, CHECKOUT_STEPS_COUNT),
      person: values
    })
  }

  const onConflict = (result: PaymentResponse) => {
    const paidSeats = result.order.tickets?.filter(ticket => ticket.status === 'paid') ?? []

    if (paidSeats.length) {
      const isTaken = (row: number, column: number) =>
        paidSeats.some(seat => seat.row === row && seat.column === column)

      const availableTickets = checkoutState.tickets.filter(
        ticket => !isTaken(ticket.row, ticket.column)
      )
      const availableSeats = checkoutState.selectedSeats.filter(
        (_, index) =>
          !!checkoutState.tickets[index] &&
          !isTaken(checkoutState.tickets[index].row, checkoutState.tickets[index].column)
      )

      stepper.set(1)
      persistCheckout({
        ...checkoutState,
        step: FIRST_CHECKOUT_STEP,
        tickets: availableTickets,
        selectedSeats: availableSeats,
        conflictTickets: paidSeats
      })
    }
  }

  const onPaymentSubmit = async (values: DebitCardFormValues) => {
    if (!checkoutState.person) return

    try {
      const result = await paymentMutation.mutateAsync({
        filmId: film.id,
        person: {
          firstname: checkoutState.person.firstname,
          lastname: checkoutState.person.lastname,
          middlename: checkoutState.person.middlename,
          phone: checkoutState.person.phone
        },
        debitCard: values,
        seance: { date: selectedDate, time: selectedSlot.time },
        tickets: checkoutState.tickets.map(({ row, column }) => ({ row, column }))
      })

      if (!result.success) {
        onConflict(result)
        return
      }

      checkoutStorage.remove()
      router.push(`/order/${result.order._id}`)
    } catch (error) {
      const response = (error as { response?: { data?: PaymentResponse } })?.response?.data

      if (response?.success === false) {
        onConflict(response)
      }
    }
  }

  const paymentError =
    paymentMutation.error?.message ||
    (paymentMutation.data?.success === false && !checkoutState.conflictTickets.length
      ? paymentMutation.data.reason || 'Не удалось оплатить билеты'
      : null)

  return {
    film,
    selectedDate,
    selectedSlot,
    stepper: persistedStepper,
    tickets: checkoutState.tickets,
    selectedSeats: checkoutState.selectedSeats,
    conflictTickets: checkoutState.conflictTickets,
    person: checkoutState.person,
    totalPrice,
    paymentMutation,
    paymentError,
    onSeatsChange,
    onSeatsNext,
    onPersonChange,
    onPersonSubmit,
    onPaymentSubmit
  }
}
