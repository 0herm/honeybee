'use client'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '../ui/button'
import Form from 'next/form'
import { importBackup } from './actions'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'

const initialState: FormStateImport = {
    success: null,
}

export default function ImportButton() {
    const [state, formAction, isPending] = useActionState(importBackup, initialState)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (state.success === true) {
            toast.success('Database imported successfully!')
            setOpen(false)
        } else if (state.success === false && state.error) {
            toast.error(state.error)
        }
    }, [state])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='w-full cursor-pointer'>
                    Import Backup
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                        This action will import a backup into your database, overwriting any existing data. This action cannot be undone. Please create a backup before proceeding.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant='outline' className='cursor-pointer'>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Form action={formAction}>
                        <Button type='submit' className='cursor-pointer' disabled={isPending}>
                            {isPending ? 'Importing...' : 'Import'}
                        </Button>
                    </Form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 