import type { FC } from 'react'

interface SummaryFieldProps {
  label: string
  value: string
}
const SummaryField: FC<SummaryFieldProps> = ({ label, value }) => (
  <div className="flex flex-col">
    <p className="text-base text-muted-fg">{label}</p>
    <span className="text-lg">{value}</span>
  </div>
)

export default SummaryField
