type IngredientProps = {
    ingredient: string
    quantity: string
}
  
type IngredientsProps = {
    title: string
    ingredients: IngredientProps[]
}

type RecipeProps = {
    id: number
    title: string
    dateCreated: Date
    dateUpdated: Date
    category: string
    duration: number
    difficulty: string
    quantity: string
    ingredients: IngredientsProps[]
    instructions: string[]
    image: Uint8Array | null
}