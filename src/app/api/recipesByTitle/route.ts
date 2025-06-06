import { NextResponse } from 'next/server'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// Open database
async function openDb() {
    return open({
        filename: './main.db',
        driver: sqlite3.Database,
    })
}

// GET recipes by Title
export async function GET(req: Request) {
    let db
    try {
        db = await openDb()

        const url = new URL(req.url)
        const title = url.searchParams.get('title')?.replace(/[^a-zøæå]/gi, '').toLocaleLowerCase()
        const typeParam = url.searchParams.get('type')?.toLocaleLowerCase() || ''
        const timeParam = Number(url.searchParams.get('time')) || 0
        const offset = url.searchParams.get('offset') || '0'

        if (typeof Number(offset) !== 'number' || typeof title !== 'string' || typeof typeParam !== 'string') {
            return NextResponse.json(
                { error: 'Invalid params' },
                { status: 400 }
            )
        }

        const queryTitle = `%${title}%`

        const conditions = ['title LIKE ?']
        const params = [queryTitle]
        const totalCountParams = [queryTitle]

        if (typeParam && typeParam !== 'undefined') {
            const types = typeParam.split(',').map(t => t.replace(/[^a-zøæå]/gi, '').trim())
            
            if (types.length > 0) {
                const typeConditions = types.map(() => 'type = ?').join(' OR ')
                conditions.push(`(${typeConditions})`)
                params.push(...types)
                totalCountParams.push(...types)
            }
        }

        if (timeParam > 0) {
            conditions.push('time <= ?')
            params.push(timeParam.toString())
            totalCountParams.push(timeParam.toString())
        }

        params.push(offset)

        const whereClause = conditions.join(' AND ')
        
        const recipes = await db.all(`
            SELECT id,title,date,time,type FROM recipes 
            WHERE ${whereClause}
            ORDER BY 
                CASE 
                    WHEN type = 'dinner' THEN 1
                    WHEN type = 'baking' THEN 2
                    WHEN type = 'drink'  THEN 3
                    ELSE 4
                END, 
                title
            LIMIT 8
            OFFSET ?`
        , ...params 
        )

        const totalCount = await db.get(`
            SELECT COUNT(*) AS total
            FROM recipes
            WHERE ${whereClause}`
        , ...totalCountParams 
        )

        return NextResponse.json({recipes:recipes,totalItems:totalCount.total})
    } catch (error) {
        return NextResponse.json({ error: `Database error: ${error}` }, { status: 500 })
    } finally {
        await db?.close()
    }
}
