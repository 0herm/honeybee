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
		const id = Number(url.searchParams.get('id'))
		

		if (typeof id !== 'number') {
			return NextResponse.json(
			  { error: 'Invalid title parameter' },
			  { status: 400 }
			)
		  }
		
		const recipe = await db.all(`
			SELECT * FROM recipes 
			WHERE id = ?`
			, id
		)

		return NextResponse.json(recipe)
	} catch (error) {
		return NextResponse.json({ error: `Database error: ${error}` }, { status: 500 })
	} finally {
		await db?.close()
	}
}
