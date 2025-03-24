import Link from "next/link"

import { ArrowRight } from "lucide-react"

import CarouselComponent from "@/components/carousel/carousel"

import { fetchByType } from "@/utils/fetch"

import { recipeTypes, Types } from "@parent/constants"

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

async function ContentType({type,typeNO}:Types){
	
	const fetchedRecipes = await fetchByType(type)
	
	if (typeof fetchedRecipes === 'string') {
        return <div>Error: {fetchedRecipes}</div>
    }

	return (
		<div className={`flex flex-col gap-2 w-[12rem] ${fetchedRecipes.length>=2?'md:w-[25rem]':''} ${fetchedRecipes.length>=4?'lg:w-[51rem]':''} `}>
			<Link href={`/recipes/${type}`} className="flex flex-row justify-start items-center gap-1">
				<h1 className="capitalize">{typeNO}</h1>
				<ArrowRight width={20} height={20} />
			</Link>
			<CarouselComponent data={fetchedRecipes}/>
		</div>
	)
}