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
        HOST: process.env.NODE_ENV === 'production' ? process.env.POSTGRES_HOST_PROD 
            : process.env.POSTGRES_HOST_DEV         || 'honeybee_postgres',
        PORT: process.env.POSTGRES_PORT             || '5432',
        USER: process.env.POSTGRES_USER             || 'admin',
        DB: process.env.POSTGRES_DB                 || 'honeybee',
        PASSWORD: process.env.POSTGRES_PASSWORD
    }
}

export default config
