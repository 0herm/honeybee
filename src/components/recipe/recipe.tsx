'use client'

import { useEffect, useState } from "react"
import LoadImage from "@/components/img/img"
import { fetchById } from "@/utils/fetch"
import { RecipeProp } from "@parent/constants"

export default function Recipe({ id }: { id: string }) {
    const [recipe, setRecipe] = useState<RecipeProp | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedRecipe = await fetchById(id)
                if (!fetchedRecipe) {
                    setError('No recipe data found')
                } else {
                    if (typeof fetchedRecipe.ingredients === "string") {
                        fetchedRecipe.ingredients = JSON.parse(fetchedRecipe.ingredients);
                    }
                    setRecipe(fetchedRecipe)
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
        <div className="w-full max-w-[40rem]">
            <h1 className="capitalize text-2xl font-semibold">{recipe.title}</h1>
            <div className="relative flex items-start w-[300px] h-[15rem]">
                <LoadImage id={recipe.id} style="print:hidden" />
            </div>
            {recipe.ingredients.map((section, index) => (
                <div key={index} className="mt-4">
                    <h1 className="capitalize font-semibold">{section.title ?`${section.title}:`:''}</h1>
                    <ul>
                        {section.ingredients.map((item, idx) => (
                            <li key={idx}>
                                {item.quantity} {item.ingredient}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <p className="pt-4">{recipe.instructions}</p>
        </div>
    )
}
