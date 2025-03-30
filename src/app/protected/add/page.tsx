'use server'

import EditPage from '@/components/editPage/editPage'

export default async function Page() {

    return (
        <EditPage isNew={true} />
    )
}