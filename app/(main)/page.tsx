import type { Metadata } from 'next'

import { getTodayFilms } from '@/lib'
import { cn } from '@/lib/utils'
import { notFound } from 'next/navigation'

import FilmCard from '../_components/FilmCard/FilmCard'

export const metadata: Metadata = {
  title: 'Афиша фильмов',
  description: 'Расписание сеансов и билеты в кино на сегодня'
}

const Home = async () => {
  const todayFilms = (await getTodayFilms()) ?? notFound()

  return (
    <main className="grid w-full grid-cols-1 gap-x-8 gap-y-4 pt-10 sm:grid-cols-2 lg:grid-cols-4">
      {todayFilms.map((film, index) => {
        const isFeatured = index < 2 || (index >= 6 && index < 8)
        return (
          <div key={film.id} className={cn(isFeatured && 'sm:col-span-2')}>
            <FilmCard film={film} isFeatured={isFeatured} />
          </div>
        )
      })}
    </main>
  )
}

export default Home
