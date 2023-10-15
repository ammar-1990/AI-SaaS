'use client'

import ProModal from '@/components/pro-modal'
import { useEffect, useState } from 'react'


type Props = {}

const ModalProvider = (props: Props) => {

const [isMounted, setIsMounted] = useState(false)
useEffect(()=>{
    setIsMounted(true)
},[])

if(!isMounted) return null

  return (
 <>
 <ProModal />
 </>
  )
}

export default ModalProvider