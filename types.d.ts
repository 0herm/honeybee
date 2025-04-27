type Ingredient = {
    ingredient: string
    quantity: string
}
  
type RecipePart = {
    title: string
    ingredients: Ingredient[]
}

type RecipeProp = {
    id: number
    title: string
    date: string
    type: string
    quantity: string
    time: number
    ingredients: RecipePart[]
    instructions: string
}

type Recipes = RecipeProp[]

type Types = {
    type: string
    typeNO: string
}

type queryBodyProp = {
    title: string
    date: string
    type: string
    quantity: string
    time: number
    ingredients: string
    instructions: string
    id?: number
    image: File | null
} 

type RecipesByTitle = {
    recipes: RecipeProp[]
    totalItems: number
}

type RecipeTypes = {
    [key: string]: string
}