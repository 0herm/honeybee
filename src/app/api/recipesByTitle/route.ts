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
		const type = url.searchParams.get('type')?.replace(/[^a-zøæå]/gi, '').toLocaleLowerCase()

		if (typeof title !== 'string' || title.length > 30 || typeof type !== 'string' || type.length > 30) {
			return NextResponse.json(
			  	{ error: 'Invalid title parameter' },
			  	{ status: 400 }
			)
		}

		const queryTitle = `%${title}%`

		const conditions = ['title LIKE ?']
		const params = [queryTitle]

		if (type && type !== 'undefined') {
			conditions.push('type = ?')
			params.push(type)
		}

		const whereClause = conditions.join(' AND ')
		
		const recipe = await db.all(`
			SELECT id,title FROM recipes 
			WHERE ${whereClause}
			ORDER BY 
				CASE 
					WHEN type = 'dinner' THEN 1
					WHEN type = 'baking' THEN 2
					WHEN type = 'drink'  THEN 3
					ELSE 4
				END, 
				title
			LIMIT 8`
			, ...params 
		)

		return NextResponse.json(recipe)
	} catch (error) {
		return NextResponse.json({ error: `Database error: ${error}` }, { status: 500 })
	} finally {
		await db?.close()
	}
}
