export type Ingredient = {
    ingredient: string
    quantity: string
}
  
export type RecipePart = {
    title: string
    ingredients: Ingredient[]
}
  
export type Recipe = {
    id: number
    title: string
    image: string
    type: string
    quantity: string
    time: number
    ingredients: RecipePart[]
    instructions: string
}

export type Recipes = Recipe[];

export async function featchByTitle(q:string):Promise<Recipes | null> {
    try {
        const res = await fetch(`/api/recipesByTitle?title=${q}`,{
            next: { revalidate: 3600 },
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
      
        if (!res.ok) {
            throw new Error('Failed to fetch recipe data')
        }
  
        const data: Recipes = await res.json()
      
        return data.length > 0 ? data : null

    } catch (error) {
        console.error('Error fetching recipe data:', error)
        return null
    }
}
  