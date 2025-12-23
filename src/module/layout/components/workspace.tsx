"use client"
import { Button } from '@/components/ui/button';
import { Hint } from '@/components/ui/hint';
import { User } from 'lucide-react';
import React from 'react'

const Workspace = () => {
    return (
        <>
            <Hint label='Change Workspace'>
                <Button className='flex flex-row items-center gap-1 border border-indigo-400/10 bg-indigo-400/10 hover:bg-indigo-400/20 text-indigo-400 hover:text-indigo-300'>
                    <User className='size-4 text-indigo-400 '/>
                    <span className='text-sm font-semibold text-indigo-400'>
                        Personal Workspace
                    </span>
                </Button>
            </Hint>
        </>
    )
}

export default Workspace;  