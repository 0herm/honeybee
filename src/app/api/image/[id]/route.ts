import run from '@utils/db'

export async function GET( req: Request, { params }: { params: Promise<{ id: string }> } ) {
    const { id } = await params
    if (!id) {
        return Response.json({ error: 'Missing id' }, { status: 400 })
    }
    try {
        const result = await run('SELECT image FROM recipes WHERE id = $1', [id])
        if (!result.rows.length || !result.rows[0].image) {
            return Response.json({ error: 'Image not found' }, { status: 404 })
        }
        const imageBuffer = result.rows[0].image
        return new Response(imageBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/webp',
            },
        })
    } catch {
        return Response.json({ error: 'Internal server error' }, { status: 500 })
    }
}