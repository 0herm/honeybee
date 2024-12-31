
import * as React from "react"
import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel"

type CarouselProp = {
	data: number
}

export default function CarouselComponent({data}:CarouselProp) {
	const length = data
	return (
		<Carousel
		opts={{
			align: "start",
		}}
		className="w-full"
		>
		<CarouselContent>
			{Array.from({ length: length }).map((_, index) => (
			<CarouselItem key={index} className={`sm:basis-1/1 ${length > 1? "md:basis-1/2" : ""} ${length > 3? "lg:basis-1/4" : ""}`}>
				<Link href={`recipe/${index}`}>
				<div className="p-1">
					<Card>
					<CardContent className="flex aspect-square items-center justify-center p-6">
						<span className="text-3xl font-semibold">{index + 1}</span>
					</CardContent>
					</Card>
				</div>
				</Link>
			</CarouselItem>
			))}
		</CarouselContent>
		<CarouselPrevious />
		<CarouselNext />
		</Carousel>
	)
}