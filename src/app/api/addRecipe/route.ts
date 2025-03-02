import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite'

const API_TOKEN = process.env.API_TOKEN;

async function openDb() {
	return open({
		filename: './main.db',
		driver: sqlite3.Database,
	})
}

export async function POST(req: Request) {
    const token = req.headers.get('Authorization')?.split(' ')[1];

    if (token !== API_TOKEN) return NextResponse.json({ error: 'Forbidden: Invalid' }, { status: 403 })

        const { title, date, type, quantity, time, ingredients, instructions } = await req.json();
    
        if (!title || !date || !type || !quantity || !time || !ingredients || !instructions) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        let db

        try {
            db = await openDb()
    
            const result = await db.run(`
                INSERT INTO recipes (title, date, type, quantity, time, ingredients, instructions)
                VALUES (?, ?, ?, ?, ?, ?, ?);
              `, title, date, type, quantity, time, ingredients, instructions);
    
            return NextResponse.json({ id: result.lastID, message: 'Successfully added Recipe' }, { status: 200 });
        } catch (error) {
            console.error('Database error:', error); 
            return NextResponse.json({ error: `Database error: ${error}` }, { status: 500 })
        } finally {
            await db?.close()
        }
}