'use client'

import { useEffect, useState } from 'react'
import { getCookie, setCookie } from '@/utils/cookies'
import { useRouter } from 'next/navigation'
import { Moon, Sun } from 'lucide-react'

export default function ThemeSwitch() {
    const router = useRouter()
    const [theme, setTheme] = useState<'dark' | 'light'>('dark')

    useEffect(() => {
        const savedTheme = getCookie('theme') as 'dark' | 'light'
        if (savedTheme) {
            setTheme(savedTheme)
        }

        document.documentElement.classList.remove('dark', 'light')
        document.documentElement.classList.add(theme)
    }, [theme])

    function toggleTheme() {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setCookie('theme', newTheme)
        setTheme(newTheme)
        router.refresh()
    }

    return (
        <div className='grid place-items-center justify-end'>
            <label className='cursor-pointer '>
                <input
                    type='checkbox'
                    checked={theme === 'light'}
                    onChange={toggleTheme}
                    className='sr-only '
                />
                {theme === 'light' ?
                    <Sun /> : <Moon />}
            </label>
        </div>
    )
}