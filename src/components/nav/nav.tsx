'use client'

import { Leaf, User } from 'lucide-react'
import Link from 'next/link'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { recipeTypes } from '@parent/constants' 
import ThemeToggle from '@components/themetoggle/themeToggle'

export default function NavBar() {

    return (
        <div className='flex flex-row justify-between items-center w-full h-full pr-1'>
                
            <div className='flex flex-row h-full items-center'>
                <Link href={'/'} className='h-full'> 
                    <Leaf className='h-full w-auto p-2 text-[#599459]' />
                </Link>
                <h1 className='hidden md:block'>Herbivorene</h1>
            </div>
            
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className='bg-transparent hover:bg-accent/50 focus:bg-accent/50 data-[state=open]:focus:bg-accent/50 data-[state=open]:hover:bg-accent/50'>Oppskrifter</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className='flex flex-col w-[100px] p-2 gap-2'>
                                <NavigationMenuLink asChild>
                                    <Link 
                                        href={'/recipes/'}
                                        className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground text-center capitalize'
                                    >
                                        Alle
                                    </Link>
                                </NavigationMenuLink>
                                {Object.entries(recipeTypes).map(([key, value]) => {
                                    return ( 
                                        <NavigationMenuLink asChild key={key}>
                                            <Link 
                                                href={`/recipes/${key}`}
                                                className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground text-center capitalize'
                                            >
                                                {value}
                                            </Link>
                                        </NavigationMenuLink>
                                    )
                                })}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link 
                            href='/about'
                            className='block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground text-center text-[0.875rem]'
                        >
                            Om oss
                        </Link>	
                    </NavigationMenuItem>	
                </NavigationMenuList>
            </NavigationMenu>

            <div className='flex flex-row items-center py-1 px-3'>
                <ThemeToggle />
                <Link 
                    href={'/login'}
                    className='p-1'
                >
                    <User />
                </Link>
            </div>
        </div>
    )
}