import type { FC } from 'react'

import ActorAvatar from '@app/_components/FilmCard/ActorAvatar/ActorAvatar'
import type { Film } from '@generated/api'

interface FilmAboutProps {
  film: Film
}

const FilmAbout: FC<FilmAboutProps> = ({ film }) => {
  return (
    <section className="flex flex-col flex-1 min-w-0 lg:flex-none lg:w-1/2">
      <div className="relative overflow-hidden rounded-16 bg-secondary aspect-[1.45/1]">
        <img
          src={`https://juniorsbootcamp.ru/api${film.img}`}
          alt={film.originalName}
          className="h-full w-full object-contain self-center"
        />
        <span className="absolute top-4 left-4 rounded-full bg-accent-primary px-3 py-1.5 font-bold text-accent-primary-fg text-lg shadow-sm sm:top-4 sm:left-4">
          {film.userRatings.kinopoisk}
        </span>
      </div>
      <h1 className="mt-3 font-extrabold text-3xl leading-8">{film.name}</h1>
      <span className="text-muted-fg capitalize text-lg">{film.genres.join(', ')}</span>
      <p className="mt-3 text-base">{film.description}</p>
      {film.actors.length > 0 && (
        <div className="mt-6">
          <h3 className="font-extrabold text-2xl text-foreground leading-7">Актёры</h3>
          <ul className="mt-4 grid grid-cols-4 gap-4">
            {film.actors.slice(0, 4).map(actor => (
              <ActorAvatar key={actor.id} actor={actor} />
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

export default FilmAbout
