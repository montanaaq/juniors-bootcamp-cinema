'use client'

import type { ReactNode } from 'react'

import type { Film, FilmScheduleSeance } from '@generated/api'

import { useCheckoutWizard } from '../_components/CheckoutWizard/useCheckoutWizard'
import { CheckoutContext } from './CheckoutContext'

interface CheckoutProviderProps {
  children: ReactNode
  film: Film
  selectedDate: string
  selectedSlot: FilmScheduleSeance
}

const CheckoutProvider = ({
  children,
  film,
  selectedDate,
  selectedSlot
}: CheckoutProviderProps) => {
  const checkout = useCheckoutWizard(film, selectedDate, selectedSlot)

  return <CheckoutContext value={checkout}>{children}</CheckoutContext>
}

export default CheckoutProvider
