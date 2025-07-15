import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import ExportButton from '@/components/backup/export'

export default function Page() {
    return (
        <div className='w-full flex flex-col items-center p-6 bg-background text-foreground'>
            <h1 className='text-3xl font-bold mb-6'>Admin Panel</h1>
            <Card className='w-full max-w-lg shadow-lg'>
                <CardHeader>
                    <CardTitle className='text-xl font-semibold'>Manage Recipes</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col gap-4'>
                    <Button asChild>
                        <Link href='protected/add'>Add Recipe</Link>
                    </Button>

                    <Button asChild>
                        <Link href='protected/edit'>Edit Recipe</Link>
                    </Button>

                    <Button asChild>
                        <Link href='protected/deploy'>Deploy Logs</Link>
                    </Button>

                </CardContent>
                <CardFooter className='flex flex-col gap-4'>
                    <div className='w-full'>
                        <ExportButton />
                    </div>
                    {/* <ImportButton /> */}
                </CardFooter>
            </Card>
        </div>
    )
}