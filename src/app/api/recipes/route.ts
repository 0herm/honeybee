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

// GET recipes sorted by date
export async function GET(req: Request) {
    let db
    try {
        db = await openDb()

        const url = new URL(req.url)
        const limit = Number(url.searchParams.get('l'))

        if (typeof limit !== 'number') {
            return NextResponse.json(
                { error: 'Invalid title parameter' },
                { status: 400 }
            )
        }
        
        const recipes = await db.all(`
            SELECT id,title,date,time,type FROM recipes 
            ORDER BY date DESC
            LIMIT ?`, limit
        )

        return NextResponse.json(recipes)
    } catch (error) {
        return NextResponse.json({ error: `Database error: ${error}` }, { status: 500 })
    } finally {
        await db?.close()
    }
}
