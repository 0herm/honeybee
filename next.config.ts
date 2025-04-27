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