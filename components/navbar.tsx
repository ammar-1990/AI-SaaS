import { UserButton } from '@clerk/nextjs'
import { Menu } from 'lucide-react'
import React from 'react'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className='flex items-center p-4'>

        <div className='md:hidden'>
            <Menu />
        </div>
        <div className='ml-auto'>
            <UserButton  afterSignOutUrl='/sign-in'/>

        </div>
    </div>
  )
}

export default Navbar