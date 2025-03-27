'use server'

import { queryBodyProp, RecipeProp, Recipes, RecipesByTitle } from "@parent/constants"

const url  = `http://localhost:8080`

export async function fetchByTitle(title: string, type: string, offset: number): Promise<RecipesByTitle | string> {
    try {
        const res = await fetch(`${url}/api/recipesByTitle?title=${title}&type=${type}&offset=${(offset-1)*8}`,{
            // next: { revalidate: 3600 },
            cache: 'no-store',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
      
        if (!res.ok) {
            console.error('Error fetching recipe data:')
            return 'error'
        }
  
        const data: RecipesByTitle = await res.json()
      
        return typeof data == 'object' ? data.totalItems > 0 ? data : 'no recipes' : 'error'

    } catch (error) {
        console.error('Error fetching recipe data:', error)
        return 'error'
    }
}

export async function fetchById(q:string):Promise<RecipeProp | string> {
    try {
        const res = await fetch(`${url}/api/recipeById?id=${q}`,{
            // next: { revalidate: 3600 },
            cache: 'no-store',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
      
        if (!res.ok) {
            console.error('Error fetching recipe data:')
            return 'error'
        }
  
        const data: Recipes = await res.json()
      
        return data[0]

    } catch (error) {
        console.error('Error fetching recipe data:', error)
        return 'error'
    }
}

export async function fetchByType(q:string):Promise<Recipes | string> {
    try {
        const res = await fetch(`${url}/api/recipesByType?type=${q}`,{
            // next: { revalidate: 3600 },
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
      
        return data.length > 0 ? data : 'Error no data'

    } catch (error) {
        console.error('Error fetching recipe data:', error)
        return 'Error while fetching'
    }
}

export async function addRecipe(queryBody:queryBodyProp):Promise<string|null> {
    try {

        const formData = new FormData()

        formData.append('title', queryBody.title)
        formData.append('date', queryBody.date)
        formData.append('type', queryBody.type)
        formData.append('quantity', queryBody.quantity.toString())
        formData.append('time', queryBody.time.toString())
        formData.append('ingredients', queryBody.ingredients)
        formData.append('instructions', queryBody.instructions)
        if (queryBody.image)
            formData.append('image', queryBody.image)

        const res = await fetch(`${url}/api/addRecipe`,{
            // next: { revalidate: 3600 },
            cache: 'no-store',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.API_TOKEN}`
            },
            body: formData
        })

        const data = await res.json()
      
        if (!res.ok) {
            throw new Error('Failed to add recipe')
        }
  
        return data.id 

    } catch (error) {
        console.error('Error adding recipe:', error)
        return null
    }
}

export async function editRecipe(queryBody:queryBodyProp):Promise<string|null> {
    try {

        const formData = new FormData()

        formData.append('title', queryBody.title)
        formData.append('date', queryBody.date)
        formData.append('type', queryBody.type)
        formData.append('quantity', queryBody.quantity.toString())
        formData.append('time', queryBody.time.toString())
        formData.append('ingredients', queryBody.ingredients)
        formData.append('instructions', queryBody.instructions)
        if (queryBody.id !== undefined)
            formData.append('id', queryBody.id.toString())
        if (queryBody.image)
            formData.append('image', queryBody.image)

        const res = await fetch(`${url}/api/editRecipe`,{
            // next: { revalidate: 3600 },
            cache: 'no-store',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.API_TOKEN}`
            },
            body: formData
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

export async function addImage(file: File, id: string) {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("id", id)

    try {
        const response = await fetch(`${url}/api/addImage`, {
            method: "POST",
            body: formData,
        })

        if (!response.ok) {
            throw new Error("Failed to upload image")
        }

        const result = await response.json()
        return result
    } catch (error) {
        console.error("Error uploading image:", error)
        return null
    }
}