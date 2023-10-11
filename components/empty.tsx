'use client'

import Image from "next/image"

type Props = {
  label:string
}

const Empty = ({label}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-3 p-10">
      <div className="relative w-72 h-72">
        <Image 
        fill
        alt="empty"
        src={'/empty.png'}
        />

      </div>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  )
}

export default Empty