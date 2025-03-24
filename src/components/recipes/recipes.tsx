'use client'

import Link from 'next/link'

import { useState, useEffect } from 'react'

import LoadImage from '@/components/img/img'
import { fetchByTitle } from '@/utils/fetch'

import {
    Card,
    CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Recipes } from '@parent/constants'

export default function RecipesPage({slug}:{slug:string}){

    const [input, setInput] = useState<string>('')
    const [search, setSearch] = useState<string>('')
    const [recipes, setRecipes] = useState<Recipes | null>(null)
    const [error, setError]   = useState<string | null>(null)

    useEffect(() => {
        async function fetchData() {
        const fetchedRecipes = await fetchByTitle(search,slug)
        
        if (!fetchedRecipes) {
            setError('No recipe data found')
        } else {
            setRecipes(fetchedRecipes)
            setError(null)
        }
        }

        fetchData()
    }, [search,slug])
 
    if (!recipes) {
        return 
    }

    return (
        <div className='w-full flex items-center flex-col'>
            <Input placeholder='Søk' value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=>{if(e.key=='Enter')setSearch(input)}} className='w-80' />
            {/* REMOVE ON LATE POINT WHEN RECIPES.LENGTH >= 8*/}
            {error && <div className='p-5'>Feil: ingen oppskrifter lik {`'${search}'`}</div> }
            { !error &&
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
            }
        </div>
    )
}