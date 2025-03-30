type RecipeTypes = {
    [key: string]: string;
}

export const recipeTypes: RecipeTypes = {
    'dinner'  : 'middag',
    'baking'  : 'bakst',
    'drink'   : 'drikke',
    'dessert' : 'dessert'
};



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
    date: string
    type: string
    quantity: string
    time: number
    ingredients: RecipePart[]
    instructions: string
}

export type Recipes = RecipeProp[]

export type Types = {
    type: string
    typeNO: string
}

export type queryBodyProp = {
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

export type RecipesByTitle = {
    recipes: RecipeProp[]
    totalItems: number
}