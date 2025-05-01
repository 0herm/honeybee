import { Button } from '@/components/ui/button'
import fs from 'fs'
import Link from 'next/link'
import path from 'path'

export default function Page() {
    const filePath = path.join(process.cwd(), '', 'deploy.txt')
    const fileContents = fs.readFileSync(filePath, 'utf-8')

    return (
        <div className='w-full h-full'>
            <Button className='w-[4rem] mb-[2rem]' variant='outline' asChild>
                <Link href='/protected'>Back</Link>
            </Button>
            <div className='w-full h-full flex flex-col gap-[2rem] bg-primary-foreground rounded-lg p-[1rem]'>
                <h1>Deployment Logs</h1>
                <pre>{fileContents}</pre>
                <p className='mt-4 text-sm text-muted-foreground'>Last updated: {new Date().toLocaleString()}</p>
            </div>
        </div>
    )
}