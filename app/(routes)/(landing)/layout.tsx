import React from 'react'

type Props = {
    children:React.ReactNode
}

const LandigpageLayout = ({children}: Props) => {
  return (
    <main className='h-full bg-[#111827] overflow-auto'>
   
        {children}
    </main>
  )
}

export default LandigpageLayout