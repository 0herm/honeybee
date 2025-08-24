'use server'

import EditPage from '@/components/editPage/editPage'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@utils/auth'

export default async function Page() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session) {
        redirect('/login')
    }

    return (
        <EditPage isNew={true} />
    )
}