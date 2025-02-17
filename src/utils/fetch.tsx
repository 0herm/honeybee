'use server'

import { queryBodyProp, RecipeProp, Recipes } from "@parent/constants"

export async function fetchByTitle(title:string,type:string):Promise<Recipes | null> {
    try {
        const res = await fetch(`http://localhost:8080/api/recipesByTitle?title=${title}&type=${type}`,{
            next: { revalidate: 3600 },
            cache: 'no-store',
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
        const res = await fetch(`http://localhost:8080/api/recipeById?id=${q}`,{
            next: { revalidate: 3600 },
            cache: 'no-store',
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
        const res = await fetch(`http://localhost:8080/api/recipesByType?type=${q}`,{
            next: { revalidate: 3600 },
            cache: 'no-store',
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

export async function addRecipe(queryBody:queryBodyProp):Promise<string|null> {
    try {
        const res = await fetch(`http://localhost:8080/api/addRecipe`,{
            next: { revalidate: 3600 },
            cache: 'no-store',
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

export async function editRecipe(queryBody:queryBodyProp):Promise<string|null> {
    try {
        const res = await fetch(`http://localhost:8080/api/editRecipe`,{
            next: { revalidate: 3600 },
            cache: 'no-store',
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