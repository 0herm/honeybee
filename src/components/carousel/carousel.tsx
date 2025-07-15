
import * as React from 'react'
import Link from 'next/link'

import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import LoadImage from '@/components/img/img'

import { recipeTypes } from '@parent/constants'
import { BadgePlus, Clock, Shapes } from 'lucide-react'

type CarouselProp = {
    data: RecipeProps[]
}

export default function CarouselComponent({data}:CarouselProp) {
    const length = data.length
    const now  = new Date()

    return (
        <Carousel
            opts={{
                align: 'start',
            }}
            className='w-full'
        >
            <CarouselContent>
                {data.map((recipe) => (
                    <CarouselItem key={recipe.id} className={`sm:basis-1/1 ${length > 1? 'md:basis-1/2' : ''} ${length > 2? '6xl:basis-1/3' : ''}`}>
                        <Link href={`recipe/${recipe.id}`} prefetch={true}>
                            <div className='p-1'>
                                <Card className='flex flex-row relative w-full h-[10rem] py-[0.5rem] gap-[0.5rem]'>
                                    <div className='relative h-full w-auto aspect-1/1'>
                                        <LoadImage data={recipe.image} style='flex' /> 
                                    </div>
                                    <div className='w-full h-full'>
                                        <CardTitle className='text-left text-base capitalize py-[1rem] px-[0.4rem]'>{recipe.title}</CardTitle>
                                        <CardDescription className='flex flex-col gap-[0.3rem] px-[0.4rem]'>
                                            {recipe.date_created && Math.abs(new Date(recipe.date_created).getTime() - now.getTime())<=30*24*60*60*1000 &&
                                                <div className='flex flex-row items-center gap-[0.2rem]'>
                                                    <BadgePlus className='h-[1rem] w-auto text-[#599459]'/>
                                                    <p className='flex flex-row gap-[0.2rem] text-[#599459]'>Ny</p>
                                                </div>
                                            }
                                            {recipe.category &&
                                                <div className='flex flex-row items-center gap-[0.2rem]'>
                                                    <Shapes className='h-[1rem] w-auto'/>
                                                    <p className='flex flex-row gap-[0.2rem] capitalize'>
                                                        <span className='hidden 6xl:block'>Kategori: </span>
                                                        {recipeTypes[recipe.category]}
                                                    </p>
                                                </div>
                                            }
                                            {recipe.duration > 1 &&
                                                <div className='flex flex-row items-center gap-[0.2rem]'>
                                                    <Clock className='h-[1rem] w-auto'/>
                                                    <p className='flex flex-row gap-[0.2rem]'>
                                                        <span className='hidden 6xl:block'>Tid: </span> 
                                                        {Math.floor(recipe.duration/60) !== 0 ? Math.floor(recipe.duration/60)+'t' : ''} {recipe.duration%60 !== 0 ? recipe.duration%60+'min' : ''}
                                                    </p>
                                                </div>
                                            }
                                        </CardDescription>
                                    </div>
                                </Card>
                            </div>
                        </Link>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className='left-[-2rem] xs:left-[-3rem]'/>
            <CarouselNext className='right-[-2rem] xs:right-[-3rem]'/>
        </Carousel>
    )
}