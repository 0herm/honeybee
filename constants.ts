export const recipeTypes: Record<string, string> = {
    dinner: 'middag',
    baking: 'bakst',
    drink: 'drikke',
    dessert: 'dessert'
}

export const recipeDifficulty: Record<string, string> = {
    'easy'   : 'lett',
    'medium' : 'middels',
    'hard'   : 'vanskelig'
}

const config = {
    database: {
        HOST: process.env.POSTGRES_HOST                         || 'localhost',
        PORT: process.env.POSTGRES_PORT                         || '5432',
        USER: process.env.POSTGRES_USER                         || 'admin',
        PASSWORD: process.env.POSTGRES_PASSWORD,
        DB: process.env.POSTGRES_DB                             || 'honeybee',
    }
}

export default config
