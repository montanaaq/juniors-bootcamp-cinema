import type { Metadata } from 'next'

import { getFilmByIdOrNotFound, getFilmScheduleById } from '@/lib'
import { notFound } from 'next/navigation'

import CheckoutWizard from './_components/CheckoutWizard/CheckoutWizard'

interface CheckoutPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{
    date?: string
    time?: string
    hall?: string
  }>
}

export async function generateMetadata(props: CheckoutPageProps): Promise<Metadata> {
  const params = await props.params
  const film = await getFilmByIdOrNotFound(params.id)

  return { title: `Оформление билетов — ${film.name}` }
}

const CheckoutPage = async (props: CheckoutPageProps) => {
  const params = await props.params
  const searchParams = await props.searchParams

  if (!searchParams.date || !searchParams.time || !searchParams.hall) {
    notFound()
  }

  const film = await getFilmByIdOrNotFound(params.id)
  const filmSchedule = await getFilmScheduleById(film.id)
  const selectedSchedule = filmSchedule.find(schedule => schedule.date === searchParams.date)
  const selectedSlot = selectedSchedule?.seances.find(
    seance => seance.time === searchParams.time && seance.hall.name === searchParams.hall
  )

  if (!selectedSlot) {
    notFound()
  }

  return (
    <main className="flex flex-col gap-8 pt-10">
      <CheckoutWizard film={film} selectedDate={searchParams.date} selectedSlot={selectedSlot} />
    </main>
  )
}

export default CheckoutPage
