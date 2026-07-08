export const HELP_LABELS: {
  color: string
  label: string
}[] = [
  {
    color: 'seat-blocked',
    label: 'Заняты'
  },
  {
    color: 'seat-selected',
    label: 'Выбраны'
  },
  {
    color: 'seat-available',
    label: 'Свободны'
  }
] as const
