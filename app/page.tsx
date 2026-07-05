import { getTodayFilms } from '@/lib/cinema-api.server'
import { notFound } from 'next/navigation'

import FilmCard from './_components/FilmCard/FilmCard'

const Home = async () => {
  const todayFilms = (await getTodayFilms()) ?? notFound()

  return (
    <main className="grid w-full grid-cols-1 gap-x-8 gap-y-4 pt-10 sm:grid-cols-2 lg:grid-cols-4">
      {todayFilms.map((film, index) => {
        const isFeatured = index < 2 || (index >= 6 && index < 8)
        return (
          <div key={film.id} className={isFeatured ? 'sm:col-span-2' : undefined}>
            <FilmCard film={film} isFeatured={isFeatured} />
          </div>
        )
      })}
    </main>
  )
}

export default Home
