'use client'

import { useState, useEffect } from 'react'
import Image  from "next/image";
import { featchByTitle, Recipes } from '@/utils/fetch'

import {
    Card,
    CardTitle
} from "@/components/ui/card"
import Link from 'next/link';

export default function RecipesPage(){

    const [recipes, setRecipes] = useState<Recipes | null>(null)
    const [error, setError]   = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
        const fetchedRecipes = await featchByTitle('')
        
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
        <div className='w-full flex items-center justify-center flex-col'>
            <div className='grid grid-cols-1 grid-rows-8 gap-4 lg:grid-cols-4 lg:grid-rows-2 sm:grid-cols-2 sm:grid-rows-4'>
                {recipes.map((recipe) => (
                    <Link href={`../recipe/${recipe.id}`} key={recipe.id}>
                        <Card>
                                <Image
                                    src={`data:image/webp;base64,${recipe.image}`}
                                    alt="bilde"
                                    width={7952}
                                    height={5304}
                                    className="flex w-full h-48 object-cover items-center justify-center pt-4"
                                />
                                <CardTitle className='text-center text-lg capitalize p-6'>{recipe.title}</CardTitle>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}