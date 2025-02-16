"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"


import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"

import Logo from "@/components/svg/logo"

import { recipeTypes } from "@parent/constants" 

export default function NavBar() {
	const { theme, setTheme } = useTheme()

	return (
		<div className="flex flex-row justify-between items-center w-full h-full pr-1">
				
			<Link href={"/"} className="h-full"> 
				<Logo className="h-full p-2" fill="fill-primary"/>
			</Link>
			
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Oppskrifter</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="flex flex-col w-[100px] p-2 gap-2">
								<NavigationMenuLink asChild>
										<Link 
											href={`/recipes/`}
											className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground text-center capitalize"
										>
										Alle
										</Link>
									</NavigationMenuLink>
								{Object.entries(recipeTypes).map(([key, value]) => {
									return ( 
									<NavigationMenuLink asChild key={key}>
										<Link 
											href={`/recipes/${key}`}
											className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground text-center capitalize"
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
							className='block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground text-center'
							>
							Om oss
						</Link>	
					</NavigationMenuItem>	
				</NavigationMenuList>
			</NavigationMenu>

			<div className="h-full w-auto p-1">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setTheme(theme === "light" ? "dark" : "light")}
					className="h-full w-full p-1"
					>
					<Sun className="dark:hidden" style={{ height: '100%', width: '100%' }} />
					<Moon className="hidden dark:block" style={{ height: '100%', width: '100%' }} />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</div>
		</div>
	)
}