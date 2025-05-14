import type { Metadata } from 'next'
import './globals.css'

import NavBar from '@/components/nav/nav'
import Footer from '@/components/footer/footer'
import { Toaster } from '@/components/ui/toaster'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
    title: 'Herbivorene',
    description: 'A vegan recipe website',
}

export default async function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
    const Cookies = await cookies()
    const theme = Cookies.get('theme')?.value || 'dark'

    return (
        <>
            <html lang='en' className={`${theme}`}>
                <head/>
                <body className='w-screen h-screen bg-background text-foreground flex flex-col m-0 p-0 font-[family-name:Inter] antialiased align-middle break-words leading-[1.5] tracking-normal'>
                    <nav className='fixed top-[-10px] pt-[10px] h-[var(--h-navbar)] w-full border-solid border-b border-accent backdrop-blur z-50 print:hidden'>
                        <NavBar />
                    </nav>
                    <main className='w-full flex grow p-5 pt-[calc(1rem+var(--h-navbar))] print:pt-0'>
                        {children}
                    </main>
                    <footer className='mt-10 border-solid border-t border-accent print:hidden'>
                        <Footer />
                    </footer>
                    <Toaster />
                </body>
            </html>
        </>
    )
}
