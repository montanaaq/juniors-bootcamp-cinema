import * as v from 'valibot'

export const personSchema = v.object({
  firstname: v.pipe(v.string(), v.trim(), v.minLength(1, 'Укажите имя')),
  lastname: v.pipe(v.string(), v.trim(), v.minLength(1, 'Укажите фамилию')),
  middlename: v.pipe(v.string(), v.trim(), v.minLength(1, 'Укажите отчество')),
  phone: v.pipe(v.string(), v.trim(), v.minLength(1, 'Укажите телефон')),
  city: v.pipe(v.string(), v.trim(), v.minLength(1, 'Укажите город')),
  email: v.pipe(v.string(), v.trim(), v.email('Некорректная почта'))
})

export type PersonFormValues = v.InferOutput<typeof personSchema>

export const debitCardSchema = v.object({
  pan: v.pipe(v.string(), v.trim(), v.minLength(16, 'Некорректный номер карты')),
  expireDate: v.pipe(v.string(), v.trim(), v.minLength(1, 'Укажите срок действия')),
  cvv: v.pipe(v.string(), v.trim(), v.minLength(3, 'Некорректный CVV'))
})

export type DebitCardFormValues = v.InferOutput<typeof debitCardSchema>
