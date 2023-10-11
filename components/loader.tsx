'use client'
import Image from 'next/image'

type Props = {}

const Loader = (props: Props) => {
  return (
    <div className="flex flex-col h-full items-center gap-y-5 justify-center p-10">
        <div className="relative w-20 h-20 animate-spin ">
            <Image fill src={'/Mystic-logo.png'} alt='logo' />
       
        </div>
        <p className='text-sm text-muted-foreground'>Mystic is bringing the answer...</p>

    </div>
  )
}

export default Loader