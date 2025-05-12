import { Button } from '@/components/ui/button'
import fs from 'fs'
import Link from 'next/link'
import path from 'path'

export default function Page() {
    const filePathLog = path.join(process.cwd(), '', 'deploy.log')
    const fileContentsLog = fs.readFileSync(filePathLog, 'utf-8')

    const filePathHash = path.join(process.cwd(), '', 'deploy.txt')
    const fileContentsHash = fs.readFileSync(filePathHash, 'utf-8')

    return (
        <div className='w-full h-full'>
            <Button className='w-[4rem] mb-[2rem]' variant='outline' asChild>
                <Link href='/protected'>Back</Link>
            </Button>
            <div className='flex flex-col gap-[2rem] '>
                <h1>Deployment Logs</h1>
                <div className='w-full h-full bg-primary-foreground rounded-lg p-[1rem]'>
                    <pre>{fileContentsHash}</pre>
                    <p className='mt-4 text-sm text-muted-foreground'>Last updated: {new Date().toLocaleString()}</p>
                </div>
                <div className='w-full h-full bg-primary-foreground rounded-lg p-[1rem]'>
                    <pre>{fileContentsLog}</pre>
                    <p className='mt-4 text-sm text-muted-foreground'>Last updated: {new Date().toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}