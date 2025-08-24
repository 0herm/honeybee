'use client'
import { signOut } from '@/utils/auth-client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { auth as text } from '@text'

export default function SignOutButton() {
    const router = useRouter()
    
    return (
        <Button
            variant='outline'
            onClick={() => signOut(
                {
                    fetchOptions: {
                        onSuccess: () => {
                            router.push('/')
                        }
                    }
                }
            )}
            className='w-full'
        >
            {text.logout}
        </Button>
    )
}