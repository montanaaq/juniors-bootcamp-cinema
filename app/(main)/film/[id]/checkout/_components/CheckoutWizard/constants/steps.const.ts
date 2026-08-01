export const STEPS = {
  SEATS_STEP: 1,
  TICKETS_STEP: 2,
  PERSON_STEP: 3,
  PAYMENT_STEP: 4
}

export const STEPS_LABELS = [
  { id: 1, label: 'Выбор места' },
  { id: 2, label: 'Информация о билетах' },
  { id: 3, label: 'Ваши данные' },
  { id: 4, label: 'Карта для оплаты' }
] as const
