'use server'

import { queryBodyProp, RecipeProp, Recipes, Types } from "@parent/constants"

export async function fetchByTitle(title:string,type:string):Promise<Recipes | null> {
    try {
        const res = await fetch(`http://localhost:3000/api/recipesByTitle?title=${title}&type=${type}`,{
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
        const res = await fetch(`http://localhost:3000/api/recipeById?id=${q}`,{
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
        const res = await fetch(`http://localhost:3000/api/recipesByType?type=${q}`,{
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

export async function fetchTypes():Promise<Types[] | null> {
    try {
        const res = await fetch(`http://localhost:3000/api/recipeTypes`,{
            next: { revalidate: 3600 },
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
      
        if (!res.ok) {
            throw new Error('Failed to fetch recipe data')
        }
  
        const data: Types[] = await res.json()
      
        return data.length > 0 ? data : null

    } catch (error) {
        console.error('Error fetching recipe data:', error)
        return null
    }
}

export async function addRecipe({queryBody}:{queryBody:queryBodyProp}):Promise<string|null> {
    try {
        const res = await fetch(`http://localhost:3000/api/addRecipe`,{
            next: { revalidate: 3600 },
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.API_TOKEN}`
            },
            body: JSON.stringify(queryBody)
        })

        const data = await res.json()
      
        if (!res.ok) {
            throw new Error('Failed to add recipe')
        }
  
        return data 

    } catch (error) {
        console.error('Error adding recipe:', error)
        return null
    }
}

export async function editRecipe({queryBody}:{queryBody:queryBodyProp}):Promise<string|null> {
    try {
        const res = await fetch(`http://localhost:3000/api/editRecipe`,{
            next: { revalidate: 3600 },
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.API_TOKEN}`
            },
            body: JSON.stringify(queryBody)
        })

        const data = await res.json()
      
        if (!res.ok) {
            throw new Error('Failed to add recipe')
        }
  
        return data 

    } catch (error) {
        console.error('Error adding recipe:', error)
        return null
    }
}