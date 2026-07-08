import type { ComponentProps } from 'react'

import Image from 'next/image'

export interface LogoProps extends Omit<
  ComponentProps<typeof Image>,
  'alt' | 'height' | 'src' | 'width'
> {}

export const Logo = ({ className, ...props }: LogoProps) => {
  return (
    <div className="flex items-center justify-center gap-1">
      <Image
        className={className}
        src="/images/logo.svg"
        alt="Juniors Bootcamp Cinema"
        width={24}
        height={24}
        {...props}
      />
      <span className="font-extrabold text-xl uppercase">Cinema</span>
    </div>
  )
}
