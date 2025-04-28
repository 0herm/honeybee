import type { MetadataRoute } from 'next'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
    return {
        name: 'herbivorene',
        short_name: 'herbivorene',
        description: 'A vegan recipe website',
        start_url: '/',
        display: 'standalone',
        background_color: 'black-translucent',
        theme_color: 'black-translucent',
        icons: [
            {
                src: 'images/logo/logo_192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: 'images/logo/logo_512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}