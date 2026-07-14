import { getFilmByIdOrNotFound, getFilmScheduleById } from '@/lib'
import { notFound } from 'next/navigation'

import { CheckoutWizard } from './_components/CheckoutWizard/CheckoutWizard'

interface CheckoutPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{
    date?: string
    time?: string
    hall?: string
  }>
}

const CheckoutPage = async ({ params, searchParams }: CheckoutPageProps) => {
  const { id } = await params
  const { date, time, hall } = await searchParams

  if (!date || !time || !hall) {
    notFound()
  }

  const film = await getFilmByIdOrNotFound(id)
  const filmSchedule = await getFilmScheduleById(film.id)
  const selectedSchedule = filmSchedule.find(schedule => schedule.date === date)
  const selectedSlot = selectedSchedule?.seances.find(
    seance => seance.time === time && seance.hall.name === hall
  )

  if (!selectedSlot) {
    notFound()
  }

  return (
    <main className="flex flex-col gap-8 pt-10">
      <CheckoutWizard film={film} selectedDate={date} selectedSlot={selectedSlot} />
    </main>
  )
}

export default CheckoutPage
