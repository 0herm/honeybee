'use client'

import Link from "next/link"

import CarouselComponent from "@/components/carousel/carousel"

import { ArrowRight } from "lucide-react"

export default function Home() {
	return (
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
	)
}