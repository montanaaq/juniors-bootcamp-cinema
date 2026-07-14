import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Страница не найдена'
}

const NotFound = () => {
  return (
    <div className="py-10">
      <h1 className="font-bold text-2xl">Страница не найдена</h1>
    </div>
  )
}

export default NotFound
