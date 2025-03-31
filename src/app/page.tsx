import Link from 'next/link'

import { ArrowRight, Croissant, CupSoda, IceCreamBowl, Soup } from 'lucide-react'

import CarouselComponent from '@/components/carousel/carousel'

import { fetchRecipes } from '@/utils/fetch'

import { recipeTypes } from '@parent/constants'

export default function Home() {

    if(!recipeTypes){
        return ( <div className='w-full text-center'>Feil ved henting av kategorier</div>)
    }

    return (
        <div className='w-full flex flex-col items-center gap-[5rem]'>
            <div className='flex flex-col items-center gap-10 px-20 w-full'>
                <ContentType limit={6} />
            </div>
            
            <div className='flex flex-col items-center gap-10 w-full'>
                <h1 className='capitalize text-left'>Sorter på kategorier</h1>
                <div className='grid grid-rows-2 grid-cols-2 sm:flex sm:flex-row gap-[4rem]'>
                    <Link href={'/recipes/dinner'}>
                        <div className='flex items-center justify-center mb-4 h-24 w-24 overflow-hidden rounded-full border-[0.4rem] border-primary-foreground shadow-md'>
                            <Soup className='h-full w-full p-[1rem] stroke-[#599459] stroke-[0.08rem]' />
                        </div>
                        <h1 className='text-center capitalize'>{recipeTypes['dinner']}</h1>
                    </Link>
                    <Link href={'/recipes/baking'}>
                        <div className='flex items-center justify-center mb-4 h-24 w-24 overflow-hidden rounded-full border-[0.4rem] border-primary-foreground shadow-  md'>
                            <Croissant className='h-full w-full p-[1rem] stroke-[#599459] stroke-[0.08rem]' />
                        </div>
                        <h1 className='text-center capitalize'>{recipeTypes['baking']}</h1>
                    </Link>
                    <Link href={'/recipes/dessert'}>
                        <div className='flex items-center justify-center mb-4 h-24 w-24 overflow-hidden rounded-full border-[0.4rem] border-primary-foreground shadow-md    '>
                            <IceCreamBowl className='h-full w-full p-[1rem] stroke-[#599459] stroke-[0.08rem]' />
                        </div>
                        <h1 className='text-center capitalize'>{recipeTypes['dessert']}</h1>
                    </Link>
                    <Link href={'/recipes/drink'}>
                        <div className='flex items-center justify-center mb-4 h-24 w-24 overflow-hidden rounded-full border-[0.4rem] border-primary-foreground shadow-md'>
                            <CupSoda className='h-full w-full p-[1rem] stroke-[#599459] stroke-[0.08rem]' />
                        </div>
                        <h1 className='text-center capitalize'>{recipeTypes['drink']}</h1>
                    </Link>
                </div>
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
        <div className={`flex flex-col gap-2 w-[18rem] sm:w-[20rem] ${fetchedRecipes.length>=2?'md:w-[40rem]':''} ${fetchedRecipes.length>=3?'6xl:w-[65rem]':''}`}>
            <Link href={'/recipes/'} className='flex flex-row justify-start items-center gap-1'>
                <h1 className='capitalize'>Nylige oppskrifter</h1>
                <ArrowRight width={20} height={20} />
            </Link>
            <CarouselComponent data={fetchedRecipes}/>
        </div>
    )
}