'use client'

import { Button } from '@/components/ui'
import Link from 'next/link'

import type { Film, FilmScheduleSeance } from '@generated/api'

import { StepperNav } from './components/StepperNav'
import { PaymentStep, PAYMENT_STEP_FORM_ID } from './steps/PaymentStep'
import { PersonStep, PERSON_STEP_FORM_ID } from './steps/PersonStep'
import { SeatsStep } from './steps/SeatsStep'
import { TicketsSummaryStep } from './steps/TicketsSummaryStep'
import { useCheckoutWizard } from './useCheckoutWizard'

type CheckoutWizardProps = {
  film: Film
  selectedDate: string
  selectedSlot: FilmScheduleSeance
}

export const CheckoutWizard = ({ film, selectedDate, selectedSlot }: CheckoutWizardProps) => {
  const {
    stepper,
    tickets,
    totalPrice,
    paymentMutation,
    paymentError,
    handleSeatsNext,
    handlePersonSubmit,
    handlePaymentSubmit
  } = useCheckoutWizard(film, selectedDate, selectedSlot)

  if (paymentMutation.data?.success) {
    return (
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-16 bg-secondary p-6">
        <h1 className="text-3xl font-extrabold">Билеты оплачены</h1>
        <p className="text-lg text-muted-fg">
          Заказ создан. Детали покупки доступны в истории заказов.
        </p>
        <Button asChild size="lg" className="w-fit">
          <Link href={`/film/${film.id}`}>Вернуться к фильму</Link>
        </Button>
      </section>
    )
  }

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-8">
      <StepperNav stepId={stepper.currentStep} />

      <div className="rounded-16 border border-ring bg-background p-4 sm:p-6">
        {stepper.currentStep === 1 && (
          <SeatsStep hall={selectedSlot.hall} initialTickets={tickets} onSubmit={handleSeatsNext} />
        )}
        {stepper.currentStep === 2 && (
          <TicketsSummaryStep
            film={film}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            tickets={tickets}
            totalPrice={totalPrice}
          />
        )}
        {stepper.currentStep === 3 && <PersonStep onSubmit={handlePersonSubmit} />}
        {stepper.currentStep === 4 && (
          <PaymentStep totalPrice={totalPrice} onSubmit={handlePaymentSubmit} />
        )}
      </div>

      {paymentError && <p className="text-danger">{paymentError}</p>}

      <div className="flex flex-wrap justify-between gap-3">
        <Button variant="secondary" size="lg" disabled={stepper.isFirst} onClick={stepper.back}>
          Назад
        </Button>

        {stepper.currentStep === 3 && (
          <Button type="submit" form={PERSON_STEP_FORM_ID} size="lg">
            Продолжить
          </Button>
        )}
        {stepper.currentStep === 4 && (
          <Button
            type="submit"
            form={PAYMENT_STEP_FORM_ID}
            size="lg"
            disabled={paymentMutation.isLoading}
          >
            {paymentMutation.isLoading ? 'Оплата...' : 'Оплатить'}
          </Button>
        )}
        {stepper.currentStep === 2 && (
          <Button size="lg" onClick={stepper.next}>
            Продолжить
          </Button>
        )}
      </div>
    </section>
  )
}
