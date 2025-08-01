type Theme = 'dark' | 'light';

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
    date_created: Date
    date_updated: Date
    category: string
    duration: number
    difficulty: string
    quantity: string
    ingredients: IngredientsProps[]
    instructions: string[]
    published: boolean
    image: Uint8Array | null
}

type FormStateImport = {
    error?: string
    success?: boolean | null
}