import type { ReactNode } from 'react'

import Footer from '../_components/layout/Footer/Footer'
import Header from '../_components/layout/Header/Header'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default MainLayout
