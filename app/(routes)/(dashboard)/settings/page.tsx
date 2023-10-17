import Heading from '@/components/heading'
import SubscriptionButton from '@/components/subsciption-button'
import { checkSubscription } from '@/lib/subscription'
import { Settings } from 'lucide-react'
import React from 'react'

type Props = {}

const SettingsPage =async (props: Props) => {

    const isPro = await checkSubscription()
  return (
    <div className='space-y-8'>
        <Heading
        title='Settings'
        description='Manage accout setting'
        icon={Settings}
        color='text-gray-700'
        bgColor='bg-gray-700/10'
        />
        <div className='px-4 lg:px-8 space-y-4'>
            <p className='text-sm text-muted-foreground'>
                {isPro ? 'You are currently on pro plan' : 'You are currently on free plan'}
            </p>
            <SubscriptionButton isPro={isPro} />
            </div>
    </div>
  )
}

export default SettingsPage