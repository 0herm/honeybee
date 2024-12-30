'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { fetchById, RecipeProp } from "@/utils/fetch"

export default function Recipe({ id }: { id: string }) {
    const [recipe, setRecipe] = useState<RecipeProp | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedRecipe = await fetchById(id)
                if (!fetchedRecipe) {
                    setError('No recipe data found')
                } else {
                    setRecipe(fetchedRecipe as RecipeProp)
                }
            } catch (error) {
                setError(`Error fetching data: ${error}`)
            }
        }

        fetchData()
    }, [id])

    if (error) {
        return <div>Error: {error}</div>
    }

    if (!recipe) {
        return <div>Loading...</div>
    }

    return (
        <div className="w-[700px]">
            <h1 className="capitalize text-2xl">{recipe.title}</h1>
            <Image
                src={`data:image/jpeg;base64,${recipe.image}`}
                alt="bilde"
                width={7952}
                height={5304}
                className="flex w-[300px] object-cover items-center justify-center pt-4"
            />
            <p>{recipe.instructions}</p>
        </div>
    )
}
