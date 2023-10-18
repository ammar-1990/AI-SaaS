import React from 'react'

type Props = {
    children:React.ReactNode
}

const LandigpageLayout = ({children}: Props) => {
  return (
    <main className='h-full bg-[#111827] overflow-auto'>
        hello
        {children}
    </main>
  )
}

export default LandigpageLayout