export type Ingredient = {
    ingredient: string
    quantity: string
}
  
export type RecipePart = {
    title: string
    ingredients: Ingredient[]
}
  
export type RecipeProp = {
    id: number
    title: string
    type: string
    quantity: string
    time: number
    ingredients: RecipePart[]
    instructions: string
}

export type Recipes = RecipeProp[]

export async function fetchByTitle(title:string,type:string):Promise<Recipes | null> {
    try {
        const res = await fetch(`/api/recipesByTitle?title=${title}&type=${type}`,{
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

export async function fetchById(q:string):Promise<RecipeProp | null> {
    try {
        const res = await fetch(`/api/recipeById?id=${q}`,{
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
      
        return data[0]

    } catch (error) {
        console.error('Error fetching recipe data:', error)
        return null
    }
}

export async function fetchByType(q:string):Promise<Recipes | null> {
    try {
        const res = await fetch(`/api/recipesByType?type=${q}`,{
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