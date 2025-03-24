import RecipesInput from "@/components/recipes/recipes"
import { fetchByTitle } from "@/utils/fetch"
import Link from "next/link"
import {
    Card,
    CardTitle
} from "@/components/ui/card"
import LoadImage from "@/components/img/img"

export default async function Page({params, searchParams}: {params: Promise<{ slug: string }>, searchParams: Promise<{ [key: string]: string | undefined }>}) {

    const slug = (await params).slug || ''
    const search = (await searchParams).q || ''

    const recipes = await fetchByTitle(search,slug)

    if(typeof recipes === 'string'){
        return (
            <div className='w-full flex items-center flex-col'>
                <div className='p-5'>Feil: ingen oppskrifter lik {search}</div>
            </div>
        )
    }


    return (
        <div className='w-full flex items-center flex-col'>
        <RecipesInput/>
        <div className={`pt-6 grid grid-cols-1 grid-rows-${recipes.length<8?recipes.length:"8"} gap-4 lg:grid-cols-4 lg:grid-rows-2 sm:grid-cols-2 sm:grid-rows-${recipes.length<8?Math.ceil(recipes.length/2):"4"}`}>
                {recipes.map((recipe) => (
                    <Link href={`../recipe/${recipe.id}`} key={recipe.id} className='w-[12rem]'>
                        <Card className='relative w-full h-[15rem]'> 
                            <div className="relative w-full h-[10rem]">
                                <LoadImage id={recipe.id} style='flex pt-[1rem]' />
                            </div> 
                            <CardTitle className='text-center text-md capitalize p-6'>{recipe.title}</CardTitle>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )

}
