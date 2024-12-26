'use client'

import Link from "next/link"

import NavBar from "@/components/nav/nav"
import CarouselComponent from "@/components/carousel/carousel"
import Footer from "@/components/footer/footer"

import { ArrowRight } from "lucide-react"

export default function Home() {
	return (
		<div className="flex flex-col w-full min-h-screen">
			<nav className="fixed w-full border-solid border-b border-accent backdrop-blur-sm z-50">
				<NavBar />
			</nav>
			<main className="w-full bg-background grow pt-20">
				<div className="flex flex-col w-full justify-center gap-10 px-20 md:px-40 lg:px-72">
					<div className="flex flex-col gap-2">
						<Link href={"/dinner"} className="flex flex-row justify-start items-center gap-1">
							<h1>Middag</h1>
							<ArrowRight width={20} height={20} />
						</Link>
						<CarouselComponent />
					</div>

					<div className="flex flex-col gap-2">
						<Link href={"/baking"} className="flex flex-row justify-start items-center gap-1">
							<h1>Bakst</h1>
							<ArrowRight width={20} height={20} />
						</Link>
						<CarouselComponent />
					</div>

					<div className="flex flex-col gap-2">
						<Link href={"/drinks"} className="flex flex-row justify-start items-center gap-1">
							<h1>Drikker</h1>
							<ArrowRight width={20} height={20} />
						</Link>
						<CarouselComponent />
					</div>
				</div>
			</main>
			<footer className="mt-10 border-solid border-t border-accent">
				<Footer />
			</footer>
		</div>
	)
}