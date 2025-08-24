import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import ExportButton from '@/components/backup/export'
import ImportButton from '@/components/backup/import'
import SignOutButton from '@components/auth/logout'
import { managementPanel as text } from '@text'
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
        <div className='w-full flex flex-col items-center p-6 bg-background text-foreground'>
            <h1 className='text-3xl font-bold mb-6'>{text.title}</h1>
            <Card className='w-full max-w-lg shadow-lg'>
                <CardHeader>
                    <CardTitle className='text-xl font-semibold'>{text.description}</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col gap-4'>
                    <Button asChild>
                        <Link href='protected/add'>{text.addRecipe}</Link>
                    </Button>

                    <Button asChild>
                        <Link href='protected/edit'>{text.editRecipe}</Link>
                    </Button>

                </CardContent>
                <CardFooter className='w-full flex flex-col gap-4'>
                    <ExportButton />
                    <ImportButton />
                    <SignOutButton />
                </CardFooter>
            </Card>
        </div>
    )
}