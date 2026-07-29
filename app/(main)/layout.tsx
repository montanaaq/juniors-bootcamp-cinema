import type { ReactNode } from 'react'

import Header from '../_components/layout/Header/Header'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default MainLayout
