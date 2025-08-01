import type { MetadataRoute } from 'next'
import { siteName, siteNameShort, siteDescription } from '@text'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
    return {
        name: siteName,
        short_name: siteNameShort,
        theme_color: '#0A0A0A',
        description: siteDescription,
        start_url: '/',
        display: 'standalone',
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