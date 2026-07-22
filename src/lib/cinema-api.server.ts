import { AUTHORIZATION_TOKEN } from '@/constants'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

import {
  type Film,
  type FilmSchedule,
  getApiCinemaFilmByFilmId,
  getApiCinemaFilmByFilmIdSchedule,
  getApiCinemaFilms,
  getApiCinemaOrders,
  putApiCinemaOrdersCancel
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

interface FetchApiOptions {
  notFoundOn404?: boolean
}

const fetchApi = async <T>(
  promise: Promise<{ data: T }>,
  { notFoundOn404 = false }: FetchApiOptions = {}
): Promise<T | null> =>
  promise
    .then(response => response.data)
    .catch(error => {
      if (notFoundOn404 && isApiNotFoundError(error)) {
        notFound()
      }

      if (isApiUnavailableError(error)) {
        return null
      }

      throw error
    })

export const getTodayFilms = async (): Promise<Film[] | null> => {
  const response = await fetchApi(getApiCinemaFilms())

  return response?.success ? response.films : null
}

export const getFilmByIdOrNotFound = async (id: string): Promise<Film> => {
  const filmId = id.trim()

  if (!/^\d+$/.test(filmId)) {
    notFound()
  }

  const response = await fetchApi(getApiCinemaFilmByFilmId({ path: { filmId } }), {
    notFoundOn404: true
  })

  if (!response?.success || !response.film) {
    notFound()
  }

  return response.film
}

export const getFilmScheduleById = async (filmId: string): Promise<FilmSchedule[]> => {
  const response = await fetchApi(getApiCinemaFilmByFilmIdSchedule({ path: { filmId } }), {
    notFoundOn404: true
  })

  if (!response) {
    return []
  }

  const schedules = response.schedules as unknown

  return Array.isArray(schedules)
    ? (schedules as FilmSchedule[])
    : schedules
      ? [schedules as FilmSchedule]
      : []
}

export const getOrderByIdOrNotFound = async (id: string) => {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTHORIZATION_TOKEN)?.value

  if (!token) notFound()

  const response = await fetchApi(
    getApiCinemaOrders({ headers: { authorization: `Bearer ${token}` } }),
    { notFoundOn404: true }
  )
  const order = response?.orders.find(order => order._id === id)

  if (!order) notFound()

  return order
}

export const getOrdersOrEmpty = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTHORIZATION_TOKEN)?.value

  if (!token) notFound()

  const response = await fetchApi(
    getApiCinemaOrders({ headers: { authorization: `Bearer ${token}` } }),
    { notFoundOn404: true }
  )

  if (!response?.success) return []

  return response?.orders
}

export const putOrderCancel = async (orderId: string) => {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTHORIZATION_TOKEN)?.value

  if (!token) notFound()

  const response = await putApiCinemaOrdersCancel({
    body: {
      orderId: orderId
    }
  })

  return response
}
