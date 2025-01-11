import { NextResponse } from 'next/server'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

async function openDb() {
	return open({
		filename: './main.db',
		driver: sqlite3.Database,
	})
}

export async function GET() {
  	let db
  	try {
    	db = await openDb()

        const recipe = await db.all(`
			SELECT type, typeNO FROM recipes 
			GROUP BY type 
			ORDER BY 
				CASE 
					WHEN type = 'dinner' THEN 1
					WHEN type = 'baking' THEN 2
					WHEN type = 'drink'  THEN 3
					ELSE 4 
				END
			`)

		return NextResponse.json(recipe)
	} catch (error) {
		return NextResponse.json({ error: `Database error: ${error}` }, { status: 500 })
	} finally {
		db?.close()
	}
}
