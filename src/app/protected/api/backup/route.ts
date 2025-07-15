import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import path from 'path'
import fs from 'fs'
import config from '@config'
import dotenv from 'dotenv'

dotenv.config()

const DB_BACKUP_DIR = path.resolve(process.cwd(), 'db')
const { HOST, PORT, USER, DB } = config.database
const PASSWORD = process.env.POSTGRES_PASSWORD

if (!PASSWORD) {
    console.error('POSTGRES_PASSWORD is not set in the environment variables.')
}

export async function GET(): Promise<Response> {
    const outputFilePath = path.join(DB_BACKUP_DIR, 'backup.sql')
    const command = `PGPASSWORD=${PASSWORD} pg_dump -h ${HOST} -p ${PORT} -U ${USER} -d ${DB} -F p -f ${outputFilePath}`

    return new Promise((resolve) => {
        const child = exec(command, (error) => {
            if (error) {
                console.error('Error during pg_dump:', error)
                resolve(NextResponse.json({ error: 'Backup failed' }, { status: 500 }))
            } else {
                try {
                    const fileBuffer = fs.readFileSync(outputFilePath)
                    const fileArray = new Uint8Array(fileBuffer)
                    resolve(new Response(fileArray, {
                        headers: {
                            'Content-Type': 'application/octet-stream',
                            'Content-Disposition': 'attachment; filename="backup.sql"'
                        }
                    }))
                } catch (readError) {
                    console.error('Error reading backup file:', readError)
                    resolve(NextResponse.json({ error: 'Failed to read backup file' }, { status: 500 }))
                }
            }
        })

        child.stdout?.pipe(process.stdout)
        child.stderr?.pipe(process.stderr)
    })
}
