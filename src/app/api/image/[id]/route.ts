import { NextResponse, NextRequest } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite'

async function openDb() {
    return open({
        filename: './main.db',
        driver: sqlite3.Database,
    })
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id; 

        if (!/^\d+$/.test(id))
            return new NextResponse("Invalid ID format", { status: 400 })

        const db = await openDb()
    
        const image = await db.get("SELECT image FROM recipes WHERE id = ?", id)
    
        if (!image) {
            return new NextResponse("Image not found", { status: 404 })
        }

        let imageBuffer;
        if(image.image){
            imageBuffer = Buffer.isBuffer(image.image) ? image.image : Buffer.from(image.image)

            return new NextResponse(imageBuffer, {
                headers: {
                    "Content-Type": 'image/webp',
                    "Content-Disposition": "inline",
                    "Cache-Control": "public, max-age=86400, immutable",
                },
            })
        }
        else
            return new NextResponse("Internal Server Error", { status: 500 })

      } catch (error) {
        console.error("Error fetching image:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
