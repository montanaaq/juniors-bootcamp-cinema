'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui'
import { Fragment } from 'react'

const steps = [
  { id: 1, label: 'Выбор места' },
  { id: 2, label: 'Информация о билетах' },
  { id: 3, label: 'Ваши данные' },
  { id: 4, label: 'Карта для оплаты' }
]

type StepperNavProps = {
  stepId: number
}

export const StepperNav = ({ stepId }: StepperNavProps) => {
  const currentStepTitle = steps.find(step => step.id === stepId)?.label
  const visibleSteps = steps.filter(step => step.id <= stepId)

  return (
    <div className="flex flex-col gap-3">
      <Breadcrumb>
        <BreadcrumbList>
          {visibleSteps.map((step, index) => (
            <Fragment key={step.id}>
              <BreadcrumbItem>
                {step.id === stepId ? (
                  <BreadcrumbPage>{step.label}</BreadcrumbPage>
                ) : (
                  <span>{step.label}</span>
                )}
              </BreadcrumbItem>
              {index < visibleSteps.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold">{currentStepTitle}</h1>
        <p className="text-sm font-bold text-muted-fg">
          Шаг {stepId} из {steps.length}
        </p>
      </div>
    </div>
  )
}
