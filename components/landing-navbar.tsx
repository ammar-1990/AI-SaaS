'use client'

import { Montserrat} from 'next/font/google'
import { useAuth} from '@clerk/nextjs'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from './ui/button'


const font = Montserrat({
  weight:'600',
  subsets:['latin']
})

type Props = {}

const LandingNavbar = (props: Props) => {

    const { isSignedIn} = useAuth()
  return (
<nav className='py-4 px-12 flex items-center justify-between '>
    <Link href={'/'} className='flex items-center gap-x-2'>
    <div className='relative w-12 h-12 '>
        <Image alt='logo' src={'/Mystic-logo.png'} fill className='object-contain' />

    </div>
    <h2 className={cn('text-2xl text-white font-bold',font.className)}>Mystic</h2>
    </Link>

    <Link href={isSignedIn?  '/dashboard' : 'sign-up'}>
    <Button variant={'outline'} className='rounded-full border-0 transition hover:bg-gradient-to-r from-purple-400 to-pink-700 hover:text-white'>
        Get Started
    </Button>
    </Link>
 

</nav>
  )
}

export default LandingNavbar