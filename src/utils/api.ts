'use server'

import run from './db'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function dbWrapper(query: string, params: any[] = []) {
    try {
        const result = await run(query, params)
        return result.rows
    // eslint-disable-next-line
    } catch (error: any) {
        console.error(JSON.stringify(error))
        return JSON.stringify(error.message) || 'Unknown error!'
    }
}

export async function exportData(tableName: string): Promise<string> {
    const query = `SELECT * FROM ${tableName}`
    const result = await dbWrapper(query)

    return typeof result === 'string' ? 'Error exporting data' : JSON.stringify(result)
}

export async function importData(tableName: string, data: Array<Record<string, string | number | null>>): Promise<string> {
    const keys = Object.keys(data[0])
    const columns = keys.join(', ')
    const values = data.map(row => `(${keys.map(key => `'${row[key]}'`).join(', ')})`).join(', ')
    const query = `INSERT INTO ${tableName} (${columns}) VALUES ${values}`

    const result = await dbWrapper(query)
    return typeof result === 'string' ? 'Error importing data' : 'Data imported successfully'
}


export async function getRecipeById(id: number): Promise<RecipeProps | string> {
    const query = 'SELECT * FROM recipes WHERE id = $1'
    const result = await dbWrapper(query, [id])
    return typeof result === 'string' ? 'Recipe not found' : result[0]
}

export async function getRecipes(limit: number = 10): Promise<RecipeProps[] | string> {
    const query = 'SELECT * FROM recipes ORDER BY date_created DESC LIMIT $1'
    const result = await dbWrapper(query, [limit])
    return typeof result === 'string' ? 'No recipes found' : result
}

export async function searchRecipes(
    keyword: string,
    limit: number = 8,
    offset: number = 0,
    filters: { category?: string; difficulty?: string; duration?: number }
): Promise<{ recipes: RecipeProps[]; totalItems: number } | string> {
    const filterKeys = Object.keys(filters).filter(key => filters[key as keyof typeof filters] !== undefined)
    const filterConditions = filterKeys.map((key, index) => {
        if (key === 'duration') {
            return ` AND ${key} <= $${index + 2}`
        }
        return ` AND ${key} = $${index + 2}`
    })
    const filtersQuery = filterConditions.join('')

    const params = [`%${keyword}%`, ...filterKeys.map(key => filters[key as keyof typeof filters]), limit, offset]

    const query = `SELECT * FROM recipes WHERE title LIKE $1${filtersQuery} ORDER BY date_created DESC LIMIT $${params.length - 1} OFFSET $${params.length}`
    const countQuery = `SELECT COUNT(*) FROM recipes WHERE title LIKE $1${filtersQuery}`

    const [result, countResult] = await Promise.all([
        dbWrapper(query, params),
        dbWrapper(countQuery, [`%${keyword}%`, ...filterKeys.map(key => filters[key as keyof typeof filters])])
    ])

    if (typeof result === 'string' || typeof countResult === 'string') {
        return 'No matching recipes found'
    }

    const totalItems = parseInt(countResult[0]?.count || '0')
    return { recipes: result, totalItems: totalItems }
}

export async function addRecipe(recipe: Omit<RecipeProps, 'dateCreated' | 'dateUpdated' | 'id'>): Promise<RecipeProps | string> {
    const query = `INSERT INTO recipes (title, date_created, date_updated, category, duration, difficulty, quantity, ingredients, instructions, image) 
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`

    const params = [
        recipe.title,
        new Date().toISOString(),
        new Date().toISOString(),
        recipe.category,
        recipe.duration,
        recipe.difficulty,
        recipe.quantity,
        JSON.stringify(recipe.ingredients),
        recipe.instructions,
        recipe.image
    ]
    const result = await dbWrapper(query, params)
    return typeof result === 'string' ? 'Failed to add recipe' : result[0]
}

export async function updateRecipe(id: number, recipe: Omit<RecipeProps, 'dateCreated' | 'dateUpdated' | 'id'>): Promise<RecipeProps | string> {
    const query = `UPDATE recipes SET title = $1, date_updated = $2, category = $3, duration = $4, difficulty = $5, quantity = $6, ingredients = $7, instructions = $8, image = $9 
                   WHERE id = $10 RETURNING *`
    const params = [
        recipe.title,
        new Date().toISOString(),
        recipe.category,
        recipe.duration,
        recipe.difficulty,
        recipe.quantity,
        JSON.stringify(recipe.ingredients),
        recipe.instructions,
        recipe.image,
        id
    ]
    const result = await dbWrapper(query, params)
    return typeof result === 'string' ? 'Failed to edit recipe' : result[0]

}

export async function deleteRecipe(id: number) {
    const query = 'DELETE FROM recipes WHERE id = $1 RETURNING *'
    return dbWrapper(query, [id])
}
