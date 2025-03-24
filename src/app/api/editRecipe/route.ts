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

        const formData = await req.formData();
    
        const title = formData.get('title');
        const date = formData.get('date');
        const type = formData.get('type');
        const quantity = formData.get('quantity');
        const time = formData.get('time');
        const ingredients = formData.get('ingredients');
        const instructions = formData.get('instructions');
        const id = formData.get('id');
        const image = formData.get('image') as File;

        if (!title || !date || !type || !quantity || !time || !ingredients || !instructions || !id) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const buffer = image ? Buffer.from(await image.arrayBuffer()) : null

        let db
        try {
            db = await openDb()
    
            await db.run(`
                UPDATE recipes
                SET title = ?, 
                    date = ?, 
                    type = ?, 
                    quantity = ?, 
                    time = ?, 
                    ingredients = ?, 
                    instructions = ?,
                    image = ?
                WHERE id = ?;
              `, title, date, type, quantity, time, ingredients, instructions, buffer, id);
    
            return NextResponse.json({ message: 'Successfully added Recipe' }, { status: 200 });
        } catch (error) {
            console.error('Database error:', error); 
            return NextResponse.json({ error: `Database error: ${error}` }, { status: 500 })
        } finally {
            await db?.close()
        }
}