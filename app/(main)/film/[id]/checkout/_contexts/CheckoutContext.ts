import type { useCheckoutWizard } from '../_components/CheckoutWizard/useCheckoutWizard'

import { createContext } from 'react'

export type CheckoutContextValue = ReturnType<typeof useCheckoutWizard>

export const CheckoutContext = createContext<CheckoutContextValue>(null!)
