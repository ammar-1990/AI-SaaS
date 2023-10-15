'use client'

import React from 'react'
import { Card, CardContent } from './ui/card'
import { MAX_API_REQUESTS } from '@/lib/constants'
import { Progress } from './ui/progress'
import { Button } from './ui/button'
import { Zap } from 'lucide-react'
import useProModal from '@/hooks/pro-modal'

type Props = {
    count:number
}

const Counter = ({count}: Props) => {
const {onOpen} = useProModal()

  return (
  <Card className='border-0  py-5 bg-white/10 rounded-lg'>
    <CardContent className='space-y-3 px-5 text-white'>
        <p className='text-center text-sm'>{count}/{MAX_API_REQUESTS} Free Generations</p>
        <Progress
        className='h-3 '
        value={(count / MAX_API_REQUESTS) * 100}
        />

        <Button onClick={onOpen} variant={'premium'} className='w-full'>
            Upgrade
            <Zap className='w-4 h-4 fill-white ml-2' />
        </Button>

    </CardContent>

  </Card>
  )
}

export default Counter