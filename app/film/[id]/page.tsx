import { getFilmByIdOrNotFound, getFilmScheduleById } from '@/lib/cinema-api.server'

import FilmAbout from './_components/FilmAbout/FilmAbout'
import { ScheduleBlock } from './_components/ScheduleBlock/ScheduleBlock'

interface FilmPageProps {
  params: Promise<{ id: string }>
}

const FilmPage = async ({ params }: FilmPageProps) => {
  const { id } = await params
  const film = await getFilmByIdOrNotFound(id)
  const filmSchedule = await getFilmScheduleById(film.id)

  return (
    <main className="flex flex-col gap-8 pt-10 lg:flex-row lg:items-start lg:gap-16">
      <ScheduleBlock filmId={film.id} filmSchedule={filmSchedule} />
      <FilmAbout film={film} />
    </main>
  )
}

export default FilmPage
