'use client'

import { useEffect, useState } from "react"

import Link from "next/link"

import { ArrowRight } from "lucide-react"

import CarouselComponent from "@/components/carousel/carousel"

import { fetchByType } from "@/utils/fetch"

import { Recipes, recipeTypes } from "@parent/constants"

type ContentTypeProp = {
	type: string
	typeNO: string
}

export default function Home() {

	if(!recipeTypes){
		return ( <div className="w-full text-center">Feil ved henting av kategorier</div>)
	}

	return (
		<div className="w-full flex justify-center">
			<div className='flex flex-col items-center gap-10 px-20 lg:w-[61rem] md:w-[35rem] w-[22rem]'>
				
				{Object.entries(recipeTypes).map(([key, value]) => {
					return <ContentType key={key} type={key} typeNO={value}/>
				})}
				
			</div>
		</div>
	)
}

function ContentType({type,typeNO}:ContentTypeProp){
	const [recipes, setRecipes] = useState<Recipes | null>(null)
	const [error, setError]   = useState<string | null>(null)
	
	useEffect(() => {
		async function fetchData() {
		const fetchedRecipes = await fetchByType(type)
		
		if (!fetchedRecipes) {
			setError('No recipe data found')
		} else {
			setRecipes(fetchedRecipes)
		}
		}

		fetchData()
	}, [type])

	if (error) {
        return <div>Error: {error}</div>
    }

    if (!recipes) {
        return <div>Loading...</div>
    }

	return (
		<div className={`flex flex-col gap-2 w-[12rem] ${recipes.length>=2?'md:w-[25rem]':''} ${recipes.length>=4?'lg:w-[51rem]':''} `}>
			<Link href={`/recipes/${type}`} className="flex flex-row justify-start items-center gap-1">
				<h1 className="capitalize">{typeNO}</h1>
				<ArrowRight width={20} height={20} />
			</Link>
			<CarouselComponent data={recipes}/>
		</div>
	)
}