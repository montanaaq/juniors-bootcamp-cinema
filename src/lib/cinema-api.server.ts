import { notFound } from 'next/navigation'

import {
  type Film,
  type FilmSchedule,
  getApiCinemaFilmByFilmId,
  getApiCinemaFilmByFilmIdSchedule,
  getApiCinemaFilms
} from '@generated/api'

const hasResponseStatus = (error: unknown): error is { response: { status: number } } =>
  typeof error === 'object' &&
  error !== null &&
  'response' in error &&
  typeof error.response === 'object' &&
  error.response !== null &&
  'status' in error.response &&
  typeof error.response.status === 'number'

const isApiNotFoundError = (error: unknown) =>
  hasResponseStatus(error) && (error.response.status === 400 || error.response.status === 404)

const isApiUnavailableError = (error: unknown) =>
  hasResponseStatus(error) && error.response.status >= 500

export const getTodayFilms = async (): Promise<Film[] | null> => {
  const response = await getApiCinemaFilms()
    .then(response => response.data)
    .catch(error => {
      if (isApiUnavailableError(error)) {
        return null
      }

      throw error
    })

  if (!response?.success) {
    return null
  }

  return response.films
}

export const getFilmByIdOrNotFound = async (id: string): Promise<Film> => {
  const filmId = id.trim()

  if (!/^\d+$/.test(filmId)) {
    notFound()
  }

  const response = await getApiCinemaFilmByFilmId({
    path: {
      filmId
    }
  })
    .then(response => response.data)
    .catch(error => {
      if (isApiNotFoundError(error)) {
        notFound()
      }

      throw error
    })

  if (!response.success || !response.film) {
    notFound()
  }

  return response.film
}

export const getFilmScheduleById = async (filmId: string): Promise<FilmSchedule[]> => {
  const response = await getApiCinemaFilmByFilmIdSchedule({
    path: { filmId }
  })
  const schedules = response.data.schedules as unknown

  return Array.isArray(schedules) ? (schedules as FilmSchedule[]) : [schedules as FilmSchedule]
}
