'use client'

import { useEffect, useState } from 'react'
import { getCookie, setCookie } from '@/utils/cookies'
import { Moon, Sun } from 'lucide-react'

export default function ThemeSwitch() {
    const [theme, setTheme] = useState<Theme>('dark')

    useEffect(() => {
        const el = document.documentElement
        const savedTheme = getCookie('theme') as Theme
        if (savedTheme) {
            setTheme(savedTheme)
        }
        else if (el.classList.contains('light')) {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }, [])

    function toggleTheme() {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setCookie('theme', newTheme)
        setTheme(newTheme)
        const el = document.documentElement
        el.classList.remove('dark', 'light')
        el.classList.add(newTheme)
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