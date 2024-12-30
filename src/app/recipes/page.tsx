'use client'

import { useState, useEffect } from 'react'
import Image  from "next/image";
import { featchByTitle, Recipes } from '@/utils/fetch'

import {
    Card,
    CardTitle
} from "@/components/ui/card"

export default function RecipesPage(){

    const [recipes, setRecipes] = useState<Recipes | null>(null)
    const [error, setError]   = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
        const fetchedRecipes = await featchByTitle('?')
        
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
        <div>
        <h1>Recipe Data</h1>
        {recipes.map((recipe) => (
            <Card key={recipe.id}>
                    <Image
                        src={`data:image/webp;base64,${recipe.image}`}
                        alt="Recipe image"
                        width={7952}
                        height={5304}
                        className="w-full h-48 object-cover"
                    />
                    <CardTitle className='text-center text-lg capitalize p-6'>{recipe.title}</CardTitle>
            </Card>
        ))}
        </div>
    )
}