import type { User } from '@/generated/api'

import * as v from 'valibot'

// when buy tickets person schemas
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

// profile schemas
export const profileUpdateSchema = v.object({
  firstname: v.optional(v.pipe(v.string(), v.trim())),
  lastname: v.optional(v.pipe(v.string(), v.trim())),
  middlename: v.optional(v.pipe(v.string(), v.trim())),
  city: v.optional(v.pipe(v.string(), v.trim())),
  email: v.optional(
    v.pipe(
      v.string(),
      v.trim(),
      v.union([v.literal(''), v.pipe(v.string(), v.email('Некорректная почта'))])
    )
  )
})

export type ProfileUpdateValues = v.InferOutput<typeof profileUpdateSchema>

export const toPersonFormValues = (user: User): ProfileUpdateValues => ({
  lastname: user.lastname ?? '',
  firstname: user.firstname ?? '',
  middlename: user.middlename ?? '',
  email: user.email ?? '',
  city: user.city ?? ''
})
