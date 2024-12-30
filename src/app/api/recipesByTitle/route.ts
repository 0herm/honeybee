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
		
		const queryTitle = `%${title}%`

		if (typeof title !== 'string' || title.length > 30) {
			return NextResponse.json(
			  { error: 'Invalid title parameter' },
			  { status: 400 }
			);
		  }
		
		const recipe = await db.all(`SELECT * FROM recipes WHERE title LIKE ? LIMIT 8`, queryTitle)

		return NextResponse.json(recipe)
	} catch (error) {
		return NextResponse.json({ error: `Database error: ${error}` }, { status: 500 })
	} finally {
		db?.close()
	}
}
