import type { FC } from 'react'

import { ActorAvatar } from '@/src/components/shared'
import { Button } from '@/src/components/ui'
import { cn } from '@/src/lib/utils'
import Link from 'next/link'

import type { Film } from '@generated/api'

interface FilmCardProps {
  film: Film
  isFeatured?: boolean
}

const FilmCard: FC<FilmCardProps> = ({ film, isFeatured }) => {
  const actors = film.actors.slice(0, 4)

  return (
    <article className="min-w-0 overflow-hidden">
      <div
        className={cn(
          'relative overflow-hidden rounded-16 bg-secondary',
          isFeatured ? 'aspect-[1.4/1]' : 'aspect-[1.45/1]'
        )}
      >
        <img
          src={`https://juniorsbootcamp.ru/api${film.img}`}
          alt={film.originalName}
          className="h-full w-full object-contain"
        />
        <span className="absolute top-4 left-4 rounded-full bg-accent-primary px-3 py-1.5 font-bold text-accent-primary-fg text-lg shadow-sm sm:top-4 sm:left-4">
          {film.userRatings.kinopoisk}
        </span>
      </div>
      <div className={cn('pt-4', isFeatured ? 'pb-6' : 'pb-5')}>
        <h2
          className={cn(
            'truncate font-extrabold text-foreground tracking-normal',
            isFeatured ? 'text-4xl leading-9' : 'text-2xl leading-8'
          )}
          title={film.name}
        >
          {film.name}
        </h2>
        <p
          className={cn(
            'mt-1 truncate text-muted-fg capitalize',
            isFeatured ? 'text-lg leading-6' : 'text-sm leading-6'
          )}
        >
          {film.genres.join(', ')}
        </p>

        {isFeatured && actors.length > 0 && (
          <div className="mt-6">
            <h3 className="font-extrabold text-2xl text-foreground leading-7">Актёры</h3>
            <ul className="mt-4 grid grid-cols-4 gap-4">
              {actors.map(actor => (
                <ActorAvatar key={actor.id} actor={actor} />
              ))}
            </ul>
          </div>
        )}
        <Button className="mt-4 w-full" variant="primary" size={isFeatured ? 'lg' : 'md'} asChild>
          <Link href={`/film/${film.id}`}>Подробнее</Link>
        </Button>
      </div>
    </article>
  )
}
export default FilmCard
