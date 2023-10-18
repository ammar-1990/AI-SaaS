'use client'

import { Crisp } from 'crisp-sdk-web'
import { useEffect} from 'react'


import React from 'react'

type Props = {}

const CrispChat = (props: Props) => {

    useEffect(()=>{
        Crisp.configure("55d2439e-8377-4c85-90d9-9282de87b2c7")
    },[])
  return null
}

export default CrispChat