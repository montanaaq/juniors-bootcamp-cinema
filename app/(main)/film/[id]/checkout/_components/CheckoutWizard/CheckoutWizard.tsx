'use client'

import type { Film, FilmScheduleSeance } from '@generated/api'

import { CheckoutProvider, useCheckout } from '../../_contexts'
import { StepperNav } from './components/StepperNav'
import { PaymentStep } from './steps/PaymentStep'
import { PersonStep } from './steps/PersonStep'
import { SeatsStep } from './steps/SeatsStep/SeatsStep'
import { TicketsSummaryStep } from './steps/TicketsSummaryStep'

interface CheckoutWizardProps {
  film: Film
  selectedDate: string
  selectedSlot: FilmScheduleSeance
}

export const CheckoutWizard = ({ film, selectedDate, selectedSlot }: CheckoutWizardProps) => {
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
      {stepper.currentStep === 1 && <SeatsStep />}
      {stepper.currentStep === 2 && <TicketsSummaryStep />}
      {stepper.currentStep === 3 && <PersonStep />}
      {stepper.currentStep === 4 && <PaymentStep />}
    </section>
  )
}
