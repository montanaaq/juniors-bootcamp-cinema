'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui'
import { HomeIcon } from 'lucide-react'
import Link from 'next/link'
import { Fragment } from 'react'

import { useCheckout } from '../../../_contexts/useCheckout'
import { STEPS_LABELS } from '../constants'

const StepperNav = () => {
  const { stepper } = useCheckout()
  const stepId = stepper.currentStep
  const currentStepTitle = STEPS_LABELS.find(step => step.id === stepId)?.label
  const visibleSteps = STEPS_LABELS.filter(step => step.id <= stepId)

  return (
    <div className="flex flex-col">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/">
              <HomeIcon size={20} strokeWidth={1.5} />
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {visibleSteps.map((step, index) => (
            <Fragment key={step.id}>
              <BreadcrumbItem className="text-base">
                {step.id === stepId ? (
                  <BreadcrumbPage className="text-primary">{step.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <button
                      type="button"
                      className="bg-transparent p-0"
                      onClick={() => stepper.set(step.id)}
                    >
                      {step.label}
                    </button>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < visibleSteps.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-6 mt-6">
        <h1 className="text-3xl font-extrabold">{currentStepTitle}</h1>
        <div>
          <p className="text-base font-semibold">
            Шаг {stepId} из {STEPS_LABELS.length}
          </p>
          <progress
            value={stepId}
            max={STEPS_LABELS.length}
            className="stepper-progress-bar"
          ></progress>
        </div>
      </div>
    </div>
  )
}

export default StepperNav
