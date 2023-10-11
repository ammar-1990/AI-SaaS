'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Props = {}

const BotAvatar = (props: Props) => {
  return (
<Avatar className="h-8 w-8">
  <AvatarImage className="p-1" src="/Mystic-logo.png" />
  
</Avatar>
  )
}

export default BotAvatar