'use client'

import { useEffect, useState } from "react"

import Link from "next/link"

import { ArrowRight } from "lucide-react"

import CarouselComponent from "@/components/carousel/carousel"

import { fetchByType, Recipes } from "@/utils/fetch"

type ContentTypeProp = {
	type: string
	typeNB: string
}

export default function Home() {

	return (
		<div className="w-full flex justify-center">
			<div className='flex flex-col items-center gap-10 px-20 lg:w-[61rem] md:w-[35rem] w-[22rem]'>
				
				<ContentType type='dinner' typeNB='middag'/>

				<ContentType type='baking' typeNB='bakst'/>

				<ContentType type='drink'  typeNB='drikke'/>

				
			</div>
		</div>
	)
}

function ContentType({type, typeNB}:ContentTypeProp){
	const [recipes, setRecipes] = useState<Recipes | null>(null)
	const [error, setError]   = useState<string | null>(null)
	
	useEffect(() => {
		const fetchData = async () => {
		const fetchedRecipes = await fetchByType(typeNB)
		
		if (!fetchedRecipes) {
			setError('No recipe data found')
		} else {
			setRecipes(fetchedRecipes)
		}
		}

		fetchData()
	}, [])

	if (error) {
        return <div>Error: {error}</div>
    }

    if (!recipes) {
        return <div>Loading...</div>
    }

	return (
		<div className={`flex flex-col gap-2 w-[12rem] ${recipes.length>=2?'md:w-[25rem]':''} ${recipes.length>=4?'lg:w-[51rem]':''} `}>
			<Link href={`/${type}`} className="flex flex-row justify-start items-center gap-1">
				<h1 className="capitalize">{typeNB}</h1>
				<ArrowRight width={20} height={20} />
			</Link>
			<CarouselComponent data={recipes}/>
		</div>
	)
}