'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useMutation, useStep } from '@siberiacancode/reactuse'
import { ArmchairIcon, BanknoteIcon, CheckIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'

import type {
  CreatePaymentDebitCardDto,
  CreateCinemaPaymentDto,
  CreatePaymentPersonDto,
  CreatePaymentTicketsDto,
  Film,
  FilmScheduleSeance,
  PaymentResponse
} from '@generated/api'
import { postApiCinemaPayment } from '@generated/api'

type CheckoutWizardProps = {
  film: Film
  selectedDate: string
  selectedSlot: FilmScheduleSeance
}

type Ticket = CreatePaymentTicketsDto

type PersonForm = CreatePaymentPersonDto & {
  city: string
  email: string
}

const steps = [
  { id: 1, label: 'Места', Icon: ArmchairIcon },
  { id: 2, label: 'Билеты', Icon: CheckIcon },
  { id: 3, label: 'Покупатель', Icon: UserIcon },
  { id: 4, label: 'Оплата', Icon: BanknoteIcon }
]

const initialPerson: PersonForm = {
  firstname: '',
  lastname: '',
  middlename: '',
  phone: '',
  city: '',
  email: ''
}

const initialDebitCard: CreatePaymentDebitCardDto = {
  pan: '',
  expireDate: '',
  cvv: ''
}

const fieldClassName =
  'h-12 w-full rounded-12 border border-input bg-background px-4 text-base outline-none transition focus:border-border-hard focus:ring-3 focus:ring-ring/50'

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    weekday: 'long'
  }).format(new Date(date))

export const CheckoutWizard = ({ film, selectedDate, selectedSlot }: CheckoutWizardProps) => {
  const stepper = useStep(4)
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [person, setPerson] = useState<PersonForm>(initialPerson)
  const [debitCard, setDebitCard] = useState<CreatePaymentDebitCardDto>(initialDebitCard)
  const paymentMutation = useMutation<CreateCinemaPaymentDto, PaymentResponse>(body =>
    postApiCinemaPayment({ body }).then(response => response.data)
  )

  const places = selectedSlot.hall.places
  const selectedSeatsLabel = tickets
    .map(ticket => `${ticket.row} ряд, ${ticket.column} место`)
    .join('; ')

  const isPersonValid =
    person.firstname.trim() &&
    person.lastname.trim() &&
    person.middlename.trim() &&
    person.phone.trim() &&
    person.city.trim() &&
    person.email.trim()

  const isDebitCardValid =
    debitCard.pan.trim() && debitCard.expireDate.trim() && debitCard.cvv.trim()

  const canGoNext =
    (stepper.currentStep === 1 && tickets.length > 0) ||
    stepper.currentStep === 2 ||
    (stepper.currentStep === 3 && Boolean(isPersonValid))

  const totalPrice = useMemo(() => tickets.length * 350, [tickets.length])

  const toggleTicket = (ticket: Ticket) => {
    setTickets(currentTickets => {
      const exists = currentTickets.some(
        currentTicket => currentTicket.row === ticket.row && currentTicket.column === ticket.column
      )

      if (exists) {
        return currentTickets.filter(
          currentTicket =>
            currentTicket.row !== ticket.row || currentTicket.column !== ticket.column
        )
      }

      return [...currentTickets, ticket]
    })
  }

  const handlePersonChange =
    (field: keyof PersonForm) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setPerson(currentPerson => ({
        ...currentPerson,
        [field]: event.target.value
      }))
    }

  const handleDebitCardChange =
    (field: keyof CreatePaymentDebitCardDto) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setDebitCard(currentDebitCard => ({
        ...currentDebitCard,
        [field]: event.target.value
      }))
    }

  const handlePayment = async () => {
    if (!isPersonValid || !isDebitCardValid || !tickets.length) return

    await paymentMutation.mutateAsync({
      filmId: film.id,
      person: {
        firstname: person.firstname,
        lastname: person.lastname,
        middlename: person.middlename,
        phone: person.phone
      },
      debitCard,
      seance: {
        date: selectedDate,
        time: selectedSlot.time
      },
      tickets
    })
  }

  const paymentError =
    paymentMutation.error?.message ||
    (paymentMutation.data?.success === false
      ? paymentMutation.data.reason || 'Не удалось оплатить билеты'
      : null)

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
      <div className="flex flex-col gap-3">
        <Link href={`/film/${film.id}`} className="text-sm text-muted-fg hover:text-foreground">
          Назад к расписанию
        </Link>
        <h1 className="text-3xl font-extrabold">Покупка билетов</h1>
        <p className="text-lg text-muted-fg">
          {film.name} - {formatDate(selectedDate)}, {selectedSlot.time}, {selectedSlot.hall.name}{' '}
          зал
        </p>
      </div>

      <ol className="grid gap-3 sm:grid-cols-4">
        {steps.map(({ id, label, Icon }) => {
          const isActive = stepper.currentStep === id
          const isDone = stepper.currentStep > id

          return (
            <li
              key={id}
              className={cn(
                'flex items-center gap-3 rounded-12 border border-ring p-3 text-sm font-bold',
                isActive && 'border-border-hard bg-secondary',
                isDone && 'bg-primary text-primary-fg'
              )}
            >
              <Icon className="size-5" />
              <span>{label}</span>
            </li>
          )
        })}
      </ol>

      <div className="rounded-16 border border-ring bg-background p-4 sm:p-6">
        {stepper.currentStep === 1 && (
          <div className="flex flex-col gap-6">
            <div className="mx-auto h-3 w-3/4 rounded-full bg-muted" />
            <div className="flex flex-col gap-2 overflow-x-auto">
              {places.map((row, rowIndex) => (
                <div key={rowIndex} className="flex min-w-max items-center gap-2">
                  <span className="w-8 text-sm font-bold text-muted-fg">{rowIndex + 1}</span>
                  {row.map((_, columnIndex) => {
                    const ticket = { row: rowIndex + 1, column: columnIndex + 1 }
                    const isSelected = tickets.some(
                      currentTicket =>
                        currentTicket.row === ticket.row && currentTicket.column === ticket.column
                    )

                    return (
                      <button
                        key={columnIndex}
                        type="button"
                        aria-pressed={isSelected}
                        aria-label={`${ticket.row} ряд, ${ticket.column} место`}
                        onClick={() => toggleTicket(ticket)}
                        className={cn(
                          'flex size-10 items-center justify-center rounded-8 border border-ring text-sm font-extrabold transition hover:border-border-hard',
                          isSelected && 'bg-primary text-primary-fg'
                        )}
                      >
                        {columnIndex + 1}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {stepper.currentStep === 2 && (
          <div className="grid gap-4 text-lg sm:grid-cols-2">
            <SummaryItem label="Фильм" value={film.name} />
            <SummaryItem
              label="Сеанс"
              value={`${formatDate(selectedDate)}, ${selectedSlot.time}`}
            />
            <SummaryItem label="Зал" value={`${selectedSlot.hall.name} зал`} />
            <SummaryItem label="Места" value={selectedSeatsLabel} />
            <SummaryItem label="Количество" value={`${tickets.length}`} />
            <SummaryItem label="Итого" value={`${totalPrice} ₽`} />
          </div>
        )}

        {stepper.currentStep === 3 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Фамилия"
              value={person.lastname}
              onChange={handlePersonChange('lastname')}
            />
            <TextField
              label="Имя"
              value={person.firstname}
              onChange={handlePersonChange('firstname')}
            />
            <TextField
              label="Отчество"
              value={person.middlename}
              onChange={handlePersonChange('middlename')}
            />
            <TextField
              label="Телефон"
              value={person.phone}
              onChange={handlePersonChange('phone')}
            />
            <TextField label="Город" value={person.city} onChange={handlePersonChange('city')} />
            <TextField
              label="Почта"
              type="email"
              value={person.email}
              onChange={handlePersonChange('email')}
            />
          </div>
        )}

        {stepper.currentStep === 4 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Номер карты"
              value={debitCard.pan}
              onChange={handleDebitCardChange('pan')}
            />
            <TextField
              label="Срок действия"
              placeholder="12/30"
              value={debitCard.expireDate}
              onChange={handleDebitCardChange('expireDate')}
            />
            <TextField label="CVV" value={debitCard.cvv} onChange={handleDebitCardChange('cvv')} />
            <div className="rounded-12 bg-secondary p-4">
              <span className="block text-sm text-muted-fg">К оплате</span>
              <strong className="text-2xl">{totalPrice} ₽</strong>
            </div>
          </div>
        )}
      </div>

      {paymentError && <p className="text-danger">{paymentError}</p>}

      <div className="flex flex-wrap justify-between gap-3">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          disabled={stepper.isFirst || paymentMutation.isLoading}
          onClick={stepper.back}
        >
          Назад
        </Button>

        {stepper.isLast ? (
          <Button
            type="button"
            size="lg"
            disabled={!isDebitCardValid || paymentMutation.isLoading}
            onClick={handlePayment}
          >
            {paymentMutation.isLoading ? 'Оплата...' : 'Оплатить'}
          </Button>
        ) : (
          <Button type="button" size="lg" disabled={!canGoNext} onClick={stepper.next}>
            Продолжить
          </Button>
        )}
      </div>
    </section>
  )
}

type TextFieldProps = React.ComponentProps<'input'> & {
  label: string
}

const TextField = ({ label, className, ...props }: TextFieldProps) => (
  <label className="flex flex-col gap-2 font-bold">
    <span>{label}</span>
    <input className={cn(fieldClassName, className)} {...props} />
  </label>
)

const SummaryItem = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-12 bg-secondary p-4">
    <span className="block text-sm text-muted-fg">{label}</span>
    <strong>{value}</strong>
  </div>
)
