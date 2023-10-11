import { cn } from '@/lib/utils'
import {LucideIcon} from 'lucide-react'

type Props = {
    title:string,
    description:string,
    icon:LucideIcon,
    color?:string,
    bgColor?:string
}

const Heading = ({title,description,icon:Icon,color,bgColor}: Props) => {
  return (

<div className=' flex items-center gap-x-3 px-4 lg:px-8'>
    <div className={cn('p-2 rounded-md',bgColor)}>
      <Icon className={cn('w-10 h-10',color)} />

    </div>
    <div>
      <h2 className='font-bold text-3xl '>{title}</h2>
      <p className='text-muted-foreground text-xs sm:text-sm'>{description}</p>
    </div>
</div>

  )
}

export default Heading