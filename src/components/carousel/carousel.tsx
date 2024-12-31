
import * as React from "react"
import Link from "next/link"

import { Card, CardTitle } from "@/components/ui/card"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel"
import LoadImage from "@/components/img/img"
import { Recipes } from "@/utils/fetch"

type CarouselProp = {
	data: Recipes
}

export default function CarouselComponent({data}:CarouselProp) {
	const length = data.length
	return (
		<Carousel
		opts={{
			align: "start",
		}}
		className="w-full"
		>
		<CarouselContent>
			{data.map((recipe) => (
			<CarouselItem key={recipe.id} className={`sm:basis-1/1 ${length > 1? "md:basis-1/2" : ""} ${length > 3? "lg:basis-1/4" : ""}`}>
				<Link href={`recipe/${recipe.id}`}>
				<div className="p-1">
					<Card>
                        <LoadImage base64={recipe.image} style='flex w-full max-h-48 items-center justify-center pt-4' />
                        <CardTitle className='text-center text-lg capitalize p-6'>{recipe.title}</CardTitle>
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