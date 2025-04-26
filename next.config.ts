import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    env: {
        NEXT_PUBLIC_VERSION: process.env.npm_package_version,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8080',
                pathname: '/api/image/**',
            },
        ]
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: '',
                    },
                ],
            },
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        // eslint-disable-next-line @stylistic/js/quotes
                        value: "script-src 'self' https://herbivorene.com;",
                    },
                ],
            },
        ]
    },
    async redirects() {
        return [
            {
                source: '/login',
                destination: '/protected',
                permanent: true,
            },
        ]
    },
}

export default nextConfig