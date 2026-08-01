'use client'

import type { Film, FilmScheduleSeance } from '@generated/api'

import CheckoutProvider from '../../_contexts/CheckoutProvider'
import { useCheckout } from '../../_contexts/useCheckout'
import StepperNav from './components/StepperNav'
import { STEPS } from './constants'
import PaymentStep from './steps/PaymentStep'
import PersonStep from './steps/PersonStep'
import SeatsStep from './steps/SeatsStep/SeatsStep'
import TicketsSummaryStep from './steps/TicketsSummaryStep'

interface CheckoutWizardProps {
  film: Film
  selectedDate: string
  selectedSlot: FilmScheduleSeance
}

const CheckoutWizard = ({ film, selectedDate, selectedSlot }: CheckoutWizardProps) => {
  return (
    <CheckoutProvider film={film} selectedDate={selectedDate} selectedSlot={selectedSlot}>
      <CheckoutSteps />
    </CheckoutProvider>
  )
}

const CheckoutSteps = () => {
  const { stepper } = useCheckout()

  return (
    <section className="flex w-full flex-col gap-8">
      <StepperNav />
      {stepper.currentStep === STEPS.SEATS_STEP && <SeatsStep />}
      {stepper.currentStep === STEPS.TICKETS_STEP && <TicketsSummaryStep />}
      {stepper.currentStep === STEPS.PERSON_STEP && <PersonStep />}
      {stepper.currentStep === STEPS.PAYMENT_STEP && <PaymentStep />}
    </section>
  )
}

export default CheckoutWizard
