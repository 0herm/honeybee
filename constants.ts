import { types as text } from '@text'

export const recipeTypes: Record<string, string> = {
    dinner: text.categories.dinner,
    baking: text.categories.baking,
    drink: text.categories.drink,
    dessert: text.categories.dessert
}

export const recipeCategorieswithIcons: {name:string, icon:string}[] = [
    { name: recipeTypes.dinner, icon: '🍛' },
    { name: recipeTypes.baking, icon: '🍞' },
    { name: recipeTypes.drink, icon: '🍪' },
    { name: recipeTypes.dessert, icon: '🥤' }
]

export const recipeDifficulty: Record<string, string> = {
    'easy'   : text.difficulty.easy,
    'medium' : text.difficulty.medium,
    'hard'   : text.difficulty.hard
}

const config = {
    database: {
        HOST: process.env.NODE_ENV === 'production' ? process.env.POSTGRES_HOST_PROD 
            : process.env.POSTGRES_HOST_DEV         || 'honeybee_postgres',
        PORT: process.env.POSTGRES_PORT             || '5432',
        USER: process.env.POSTGRES_USER             || 'admin',
        DB: process.env.POSTGRES_DB                 || 'honeybee',
        PASSWORD: process.env.POSTGRES_PASSWORD
    },
    auth: {
        AUTH_URL: process.env.AUTH_URL || 'http://localhost:8080',
        AUTH_SECRET: process.env.AUTH_SECRET,
        AUTH_TELEMETRY: process.env.AUTH_TELEMETRY === 'true'
    }
}

export default config
