import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Page() {

    return (
        <div>
            <h1 className='mb-[1rem]'>Admin Panel</h1>
            <div className='flex flex-col gap-[1rem]'>
                <Button asChild>
                    <Link href='protected/add'>Add Recipe</Link>
                </Button>

                <Button asChild>
                    <Link href='protected/edit'>Edit Recipe</Link>
                </Button>

                <Button asChild>
                    <Link href='protected/deploy'>Deploy logs</Link>
                </Button>

                <Button asChild>
                    <Link href='/api/export'>Export Data</Link>
                </Button>
            </div>
        </div>
    )
}