import Link from 'next/link'

import { ArrowRight } from 'lucide-react'

import CarouselComponent from '@/components/carousel/carousel'

import { fetchRecipes } from '@/utils/fetch'

import { recipeTypes } from '@parent/constants'

export default function Home() {

    if(!recipeTypes){
        return ( <div className='w-full text-center'>Feil ved henting av kategorier</div>)
    }

    return (
        <div className='w-full flex justify-center'>
            <div className='flex flex-col items-center gap-10 px-20 w-full'>
                <ContentType limit={6} />
            </div>
        </div>
    )
}

async function ContentType({limit}:{limit:number}){
    
    const fetchedRecipes = await fetchRecipes(limit)
    
    if (typeof fetchedRecipes === 'string') {
        return <div>Error: {fetchedRecipes}</div>
    }

    return (
        <div className={`flex flex-col gap-2 w-[20rem] ${fetchedRecipes.length>=2?'md:w-[40rem]':''} ${fetchedRecipes.length>=3?'6xl:w-[65rem]':''}`}>
            <Link href={'/recipes/'} className='flex flex-row justify-start items-center gap-1'>
                <h1 className='capitalize'>Nylige oppskrifter</h1>
                <ArrowRight width={20} height={20} />
            </Link>
            <CarouselComponent data={fetchedRecipes}/>
        </div>
    )
}