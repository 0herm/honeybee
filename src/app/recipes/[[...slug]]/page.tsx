'use server'

import { fetchByTitle } from '@/utils/fetch'
import Link from 'next/link'

import {
    Card,
    CardTitle
} from '@/components/ui/card'

import LoadImage from '@/components/img/img'
import PageOverview from '@/components/pagination/pagination'
import Form from 'next/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

export default async function Page({params, searchParams}: {params: Promise<{ slug?: string[] }>, searchParams: Promise<{ [key: string]: string | undefined }>}) {

    const paramsSearch = await searchParams
    const slug = await params

    const type   = typeof slug === 'object' && slug.slug?.[0] ? slug.slug[0] : ''
    const search = typeof paramsSearch.q === 'string' ? paramsSearch.q : ''
    const offset = typeof paramsSearch.p === 'string' ? Number(paramsSearch.p) : 1

    const data = await fetchByTitle(search,type,offset)

    if(typeof data === 'string'){
        return (
            <div className='w-full flex items-center flex-col'>
                <RecipesInput search={search} type={type} />
                <div className='p-5'>Feil: ingen oppskrifter lik '{search}'</div>
            </div>
        )
    }

    return (
        <div className='w-full flex items-center flex-col'>
            <RecipesInput search={search} type={type} />
            <div className={`pt-6 grid grid-cols-1 grid-rows-${data.recipes.length<8?data.recipes.length:'8'} gap-4 lg:grid-cols-4 lg:grid-rows-2 sm:grid-cols-2 sm:grid-rows-${data.recipes.length<8?Math.ceil(data.recipes.length/2):'4'}`}>
                {data.recipes.map((recipe) => (
                    <Link href={`../recipe/${recipe.id}`} key={recipe.id} className='w-[12rem]'>
                        <Card className='relative w-full h-[15rem]'> 
                            <div className='relative w-full h-[10rem]'>
                                <LoadImage id={recipe.id} style='flex pt-[1rem]' />
                            </div> 
                            <CardTitle className='text-center text-md capitalize p-6'>{recipe.title}</CardTitle>
                        </Card>
                    </Link>
                ))}
            </div>
            <PageOverview current={offset} pages={Math.ceil(data.totalItems/8)} />
        </div>
    )

}

function RecipesInput({search, type}:{search: string, type: string}){
    return (
        <Form 
            action={`/recipes${type !== '' ? `/${type}` : ''}`}
        >
            <div className='relative w-full md:max-w-[300px]'>
                <Input 
                    type='search'
                    name='q' 
                    placeholder='Søk'
                    defaultValue={search}
                    className='pr-10'
                />
                <div className='absolute inset-y-0 right-0 flex items-center cursor-pointer'>
                    <Button variant='ghost' type='submit'>
                        <Search/>
                    </Button>
                </div>
            </div>
        </Form>
    )
}