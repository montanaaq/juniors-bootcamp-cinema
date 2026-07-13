'use client'

import type { ComponentProps } from 'react'

import { cn } from '@/src/lib/utils'
import { Tabs as TabsPrimitive } from 'radix-ui'

const Tabs = ({
  className,
  orientation = 'horizontal',
  ...props
}: ComponentProps<typeof TabsPrimitive.Root>) => (
  <TabsPrimitive.Root
    className={cn('group/tabs flex gap-6 data-horizontal:flex-col', className)}
    data-orientation={orientation}
    data-slot="tabs"
    {...props}
  />
)

const TabsList = ({ className, ...props }: ComponentProps<typeof TabsPrimitive.List>) => (
  <TabsPrimitive.List
    className={cn(
      'group/tabs-list inline-flex w-fit items-center justify-center bg-secondary p-1 text-foreground',
      'group-data-horizontal/tabs:h-12.5 group-data-horizontal/tabs:rounded-full',
      'group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col group-data-vertical/tabs:rounded-24',
      className
    )}
    data-slot="tabs-list"
    {...props}
  />
)

const TabsTrigger = ({ className, ...props }: ComponentProps<typeof TabsPrimitive.Trigger>) => (
  <TabsPrimitive.Trigger
    className={cn(
      'inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 font-bold text-[18px]/6.5 transition group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start',
      'focus-visible:border-ring focus-visible:outline-1 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50',
      'data-active:bg-background data-active:shadow-sm',
      // "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
      className
    )}
    data-slot="tabs-trigger"
    {...props}
  />
)

const TabsContent = ({ className, ...props }: ComponentProps<typeof TabsPrimitive.Content>) => (
  <TabsPrimitive.Content
    className={cn('flex-1 outline-none', className)}
    data-slot="tabs-content"
    {...props}
  />
)

export { Tabs, TabsContent, TabsList, TabsTrigger }
