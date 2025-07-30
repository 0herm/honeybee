import Link from 'next/link'
import { Croissant, CupSoda, IceCreamBowl, Soup } from 'lucide-react'
import Image from 'next/image'
import CarouselComponent from '@/components/carousel/carousel'
import { recipeTypes } from '@parent/constants'
import { Button } from '@/components/ui/button'
import { getRecipes } from '@/utils/api'

export default function Home() {

    if(!recipeTypes){
        return ( <div className='w-full text-center'>Feil ved henting av kategorier</div>)
    }

    return (
        <div className='w-full flex flex-col items-center gap-[5rem]'>
            <div className='h-[calc(100vh-var(--h-navbar))] w-screen relative'>
                <div className='absolute inset-0 bg-gradient-to-b not-dark:from-green-400/60 dark:from-green-900 blur-3xl brightness-50'></div>
                <div className='w-full h-full relative flex md:flex-row flex-col gap-[3rem] md:gap-[5rem] lg:gap-[10rem] items-center pb-[10rem] pl-[2rem] md:pl-[4rem] lg:pl-[6rem] p-[2rem]'>
                    <div className='flex flex-col gap-[1rem] justify-center md:justify-normal'>
                        <h1 className='text-3xl md:text-5xl font-bold text-center md:text-left'>Plantebasert Oppskrifter</h1>
                        <p className='text-sm md:text-lg text-center md:text-left'>Oppdag deilige og enkle veganske oppskrifter</p>
                        <div className='flex flex-col xs:flex-row gap-[1rem]'>
                            <Link href={'/recipes/'} className='flex justify-center'>
                                <Button className='cursor-pointer bg-green-600 hover:bg-green-500'> Utforsk oppskrifter </Button>
                            </Link>
                            <Link href={'/'} className='flex justify-center'>
                                <Button className='cursor-pointer hover:text-green-600 text-green-600' variant={'outline'}>Favorittoppskrifter</Button>
                            </Link>
                        </div>
                    </div>
                    <div className='relative w-full h-full max-h-[30rem] max-w-[30rem]'>
                        <Image 
                            src={'/images/heroSection.webp'}
                            fill={true}
                            alt={''}
                            className='object-contain'
                        />
                    </div>
                </div>
            </div>


            <div className='flex flex-col gap-[10rem]'>
                <div className='flex flex-col items-center gap-10 px-0 sm:px-[5rem] w-full'>
                    <ContentType limit={6} />
                </div>
                
                <div className='flex flex-col items-center gap-10 w-full'>
                    <h1 className='capitalize text-center text-xl font-semibold'>Sorter på kategorier</h1>
                    <div className='grid grid-rows-2 grid-cols-2 sm:flex sm:flex-row gap-[4rem]'>
                        <Link href={'/recipes?category=dinner'}>
                            <div className='flex items-center justify-center mb-4 h-24 w-24 overflow-hidden rounded-full border-[0.4rem] border-primary-foreground shadow-md'>
                                <Soup className='h-full w-full p-[1rem] stroke-[#599459] stroke-[0.08rem]' />
                            </div>
                            <h1 className='text-center capitalize'>{recipeTypes['dinner']}</h1>
                        </Link>
                        <Link href={'/recipes?category=baking'}>
                            <div className='flex items-center justify-center mb-4 h-24 w-24 overflow-hidden rounded-full border-[0.4rem] border-primary-foreground shadow-  md'>
                                <Croissant className='h-full w-full p-[1rem] stroke-[#599459] stroke-[0.08rem]' />
                            </div>
                            <h1 className='text-center capitalize'>{recipeTypes['baking']}</h1>
                        </Link>
                        <Link href={'/recipes?category=dessert'}>
                            <div className='flex items-center justify-center mb-4 h-24 w-24 overflow-hidden rounded-full border-[0.4rem] border-primary-foreground shadow-md    '>
                                <IceCreamBowl className='h-full w-full p-[1rem] stroke-[#599459] stroke-[0.08rem]' />
                            </div>
                            <h1 className='text-center capitalize'>{recipeTypes['dessert']}</h1>
                        </Link>
                        <Link href={'/recipes?category=drink'}>
                            <div className='flex items-center justify-center mb-4 h-24 w-24 overflow-hidden rounded-full border-[0.4rem] border-primary-foreground shadow-md'>
                                <CupSoda className='h-full w-full p-[1rem] stroke-[#599459] stroke-[0.08rem]' />
                            </div>
                            <h1 className='text-center capitalize'>{recipeTypes['drink']}</h1>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

async function ContentType({limit}:{limit:number}){
    const recipes = await getRecipes(limit)

    if (typeof recipes === 'string') {
        return <div>Error: {recipes}</div>
    }

    return (
        <div className={`flex flex-col gap-4 w-[18rem] sm:w-[20rem] ${recipes.length>=2?'md:w-[40rem]':''} ${recipes.length>=3?'6xl:w-[65rem]':''}`}>
            <h1 className='capitalize text-center text-xl font-semibold'>Nyeste oppskrifter</h1>
            <CarouselComponent data={recipes}/>
            <Link href={'/recipes/'} className='flex flex-row justify-center items-center gap-1'>
                <Button variant='outline' className='cursor-pointer'>
                    Se alle oppskrifter
                </Button>
            </Link>
        </div>
    )
}