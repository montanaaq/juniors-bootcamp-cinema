import type { FC, ReactNode } from 'react'

interface CheckoutSummaryCardProps {
  title: string
  icon: ReactNode
  children: ReactNode
}

const CheckoutSummaryCard: FC<CheckoutSummaryCardProps> = ({
  title,
  icon,
  children
}: {
  title: string
  icon: ReactNode
  children: ReactNode
}) => (
  <div className="w-[40%] flex flex-col gap-4 bg-secondary rounded-24 px-10 py-6 h-fit">
    <div className="flex items-center justify-between mb-2">
      <h1 className="font-bold text-2xl">{title}</h1>
      <div className="flex items-center justify-center bg-accent-quaternary size-12 rounded-full">
        {icon}
      </div>
    </div>
    {children}
  </div>
)

export default CheckoutSummaryCard
