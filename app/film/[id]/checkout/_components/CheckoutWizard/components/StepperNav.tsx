'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/src/components/ui'
import { HomeIcon } from 'lucide-react'
import Link from 'next/link'
import { Fragment } from 'react'

import { STEPS } from '../constants/steps.const'

interface StepperNavProps {
  stepId: number
  onStepChange: (step: number) => void
}

export const StepperNav = ({ stepId, onStepChange }: StepperNavProps) => {
  const currentStepTitle = STEPS.find(step => step.id === stepId)?.label
  const visibleSTEPS = STEPS.filter(step => step.id <= stepId)

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
          {visibleSTEPS.map((step, index) => (
            <Fragment key={step.id}>
              <BreadcrumbItem className="text-base">
                {step.id === stepId ? (
                  <BreadcrumbPage className="text-primary">{step.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <button
                      type="button"
                      className="bg-transparent p-0"
                      onClick={() => onStepChange(step.id)}
                    >
                      {step.label}
                    </button>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < visibleSTEPS.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-6 mt-6">
        <h1 className="text-3xl font-extrabold">{currentStepTitle}</h1>
        <div>
          <p className="text-base font-semibold">
            Шаг {stepId} из {STEPS.length}
          </p>
          <progress value={stepId} max={STEPS.length} className="stepper-progress-bar"></progress>
        </div>
      </div>
    </div>
  )
}
