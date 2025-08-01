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
import { managementPanel as text } from '@text'

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
                    {text.import.title}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{text.import.dialogTitle}</DialogTitle>
                    <DialogDescription>
                        {text.import.dialogDescription}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant='outline' className='cursor-pointer'>
                            {text.import.dialogCancel}
                        </Button>
                    </DialogClose>
                    <Form action={formAction}>
                        <Button type='submit' className='cursor-pointer' disabled={isPending}>
                            {isPending ? `${text.import.dialogImporting}...` : text.import.dialogImport}
                        </Button>
                    </Form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 