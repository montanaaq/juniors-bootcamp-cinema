import type { FC } from 'react'

import type { FilmStaff } from '@generated/api'

interface ActorAvatarProps {
  actor: FilmStaff
}

export const ActorAvatar: FC<ActorAvatarProps> = ({ actor }) => {
  return (
    <li key={actor.id} className="flex min-w-0 flex-col items-center text-center">
      <div className="size-16 overflow-hidden rounded-full bg-muted">
        <img
          src={`https://juniorsbootcamp.ru/api${actor.photo}`}
          alt={actor.fullName}
          className="h-full w-full object-cover"
        />
      </div>
      <span className="mt-2 line-clamp-2 min-h-12 max-w-28 text-md leading-6">
        {actor.fullName}
      </span>
    </li>
  )
}
