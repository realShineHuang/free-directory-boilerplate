'use client';

import { Skeleton } from './ui/skeleton';

export default function TopicListLoading() {
  return (
    <div className="flex gap-4 items-center border-t pt-4 md:border-transparent md:pt-0">
      <div className="flex flex-wrap items-center gap-4">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  )
}
