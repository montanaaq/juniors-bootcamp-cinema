'use client'

import type { Film, FilmScheduleSeance } from '@generated/api'

import { StepperNav } from './components/StepperNav'
import { PaymentStep } from './steps/PaymentStep'
import { PersonStep } from './steps/PersonStep'
import { SeatsStep } from './steps/SeatsStep/SeatsStep'
import { TicketsSummaryStep } from './steps/TicketsSummaryStep'
import { useCheckoutWizard } from './useCheckoutWizard'

interface CheckoutWizardProps {
  film: Film
  selectedDate: string
  selectedSlot: FilmScheduleSeance
}

export const CheckoutWizard = ({ film, selectedDate, selectedSlot }: CheckoutWizardProps) => {
  const {
    stepper,
    tickets,
    selectedSeats,
    conflictTickets,
    totalPrice,
    paymentError,
    onSeatsNext,
    onPersonSubmit,
    onPaymentSubmit
  } = useCheckoutWizard(film, selectedDate, selectedSlot)

  return (
    <section className="flex w-full flex-col gap-8">
      <StepperNav stepId={stepper.currentStep} onStepChange={stepper.set} />

      {stepper.currentStep === 1 && (
        <SeatsStep
          filmName={film.name}
          selectedDate={selectedDate}
          selectedSlot={selectedSlot}
          filmId={film.id}
          hall={selectedSlot.hall}
          initialTickets={tickets}
          conflictSeats={conflictTickets}
          onSubmit={onSeatsNext}
        />
      )}
      {stepper.currentStep === 2 && (
        <TicketsSummaryStep
          film={film}
          selectedDate={selectedDate}
          selectedSlot={selectedSlot}
          tickets={tickets}
          seats={selectedSeats}
          totalPrice={totalPrice}
          onNext={stepper.next}
          onBack={stepper.back}
        />
      )}
      {stepper.currentStep === 3 && <PersonStep onSubmit={onPersonSubmit} onBack={stepper.back} />}
      {stepper.currentStep === 4 && (
        <PaymentStep onBack={stepper.back} onSubmit={onPaymentSubmit} />
      )}
      {paymentError && <p className="text-danger">{paymentError}</p>}
    </section>
  )
}
