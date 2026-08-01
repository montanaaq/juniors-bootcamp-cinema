import type { Metadata } from 'next'
import type { FC } from 'react'

import { getFilmByIdOrNotFound, getFilmScheduleById } from '@/lib'

import FilmAbout from './_components/FilmAbout/FilmAbout'
import ScheduleBlock from './_components/ScheduleBlock/ScheduleBlock'

interface FilmPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata(props: FilmPageProps): Promise<Metadata> {
  const params = await props.params
  const film = await getFilmByIdOrNotFound(params.id)

  return {
    title: film.name,
    description: film.description?.slice(0, 160),
    openGraph: {
      title: film.name,
      description: film.description?.slice(0, 160),
      images: [`https://juniorsbootcamp.ru/api${film.img}`]
    }
  }
}

const FilmPage: FC<FilmPageProps> = async props => {
  const params = await props.params
  const film = await getFilmByIdOrNotFound(params.id)
  const filmSchedule = await getFilmScheduleById(film.id)

  return (
    <main className="flex flex-col gap-8 pt-10 lg:flex-row lg:items-start lg:gap-16">
      <ScheduleBlock filmId={film.id} filmSchedule={filmSchedule} />
      <FilmAbout film={film} />
    </main>
  )
}

export default FilmPage
