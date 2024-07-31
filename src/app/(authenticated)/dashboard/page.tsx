"use client"
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { signOut } from 'next-auth/react'
import React from 'react'

const Dashboard = () => {
    return (
        <div>
            <div>Dashboard</div>
            <Button onClick={() => {
                signOut();
                toast({
                    title: "Log out",
                    description: "You have been successfully logged out"
                })
            }}>Log out</Button>
        </div>
    )
}

export default Dashboard