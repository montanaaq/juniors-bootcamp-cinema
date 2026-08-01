'use client'

import type { FC } from 'react'

import { Button } from '@/components/ui'
import { formatDate } from '@/lib/format-date'
import { formatSelectedSeatsLabel } from '@/lib/format-selected-seats-label'
import { useIntl } from 'react-intl'

import { useCheckout } from '../../../_contexts/useCheckout'
import SummaryField from '../components/SummaryField'
import { STEPS } from '../constants'

const TicketsSummaryStep: FC = () => {
  const { film, selectedDate, selectedSlot, tickets, totalPrice, stepper } = useCheckout()
  const intl = useIntl()

  if (stepper.currentStep !== STEPS.TICKETS_STEP) return null

  return (
    <div className="w-[60%] flex flex-col gap-4">
      <SummaryField label="Фильм" value={film.name} />
      <SummaryField label="Количество" value={`${tickets.length}`} />
      <SummaryField
        label="Дата и время"
        value={`${formatDate(selectedDate)}, ${selectedSlot.time}`}
      />
      <SummaryField
        label="Зал"
        // TODO: поправить i18n format
        value={`${intl.formatMessage({
          id: `hall.name.${selectedSlot.hall.name}`
        })}`}
      />
      <SummaryField label="Места" value={formatSelectedSeatsLabel(tickets)} />
      <p className="text-3xl font-bold">Сумма: {totalPrice} ₽</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="w-full"
          onClick={stepper.back}
        >
          Назад
        </Button>
        <Button type="button" size="lg" onClick={stepper.next} className="w-full">
          Купить билеты
        </Button>
      </div>
    </div>
  )
}

export default TicketsSummaryStep
