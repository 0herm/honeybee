"use client"

import * as React from "react"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"

import { Button } from "@/components/ui/button"

import Logo from "@/components/svg/logo"

export default function NavBar() {
	const { theme, setTheme } = useTheme()

	return (
		<div className="flex flex-row justify-between items-center w-full h-8">
				
			<Logo className="h-full p-1" fill="fill-primary" />
			
			<div className="flex flex-row gap-6">
				<Link href={"/recepies"}>Oppskrifter</Link>
				<Link href={"/about"}>Om oss</Link>
			</div>

			<Button
				variant="ghost"
				size="icon"
				onClick={() => setTheme(theme === "light" ? "dark" : "light")}
				className="h-full p-2"
				>
				<Sun className="dark:hidden" style={{ height: '100%', width: '100%' }} />
				<Moon className="hidden dark:block" style={{ height: '100%', width: '100%' }} />
				<span className="sr-only">Toggle theme</span>
			</Button>
		</div>
	)
}